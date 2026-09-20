import React, { useMemo, useEffect, useRef } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { NodeItem } from './NodeItem';
import { MapNode } from '../../types/cardbyte';
import { BookOpen } from 'lucide-react';
import { audioManager } from '../../audio/audioManager';

export const CardByteGraph: React.FC = () => {
  const { map, currentNode, selectNode, openModal, mobileViewMode } = useCardByteStore();
  const activeLayerRef = useRef<HTMLDivElement | null>(null);

  const handleSelectNode = (nodeId: string) => {
    audioManager.playSfx('UI_CLICK');
    selectNode(nodeId);
  };

  const layers = useMemo(() => {
    if (!map) return [];
    const grouped: MapNode[][] = [];
    for (let d = 0; d < 8; d++) {
      grouped.push([]);
    }
    Object.values(map.nodes).forEach((n) => {
      grouped[n.depth].push(n);
    });
    // Sort by index within layer
    grouped.forEach((g) => g.sort((a, b) => a.index - b.index));
    return grouped;
  }, [map]);

  // Determine accessible node IDs
  const accessibleIds = useMemo(() => {
    const ids = new Set<string>();
    if (!currentNode) {
      // Starting nodes at Depth 0
      layers[0]?.forEach((n) => ids.add(n.id));
    } else {
      currentNode.nextIds.forEach((id) => ids.add(id));
    }
    return ids;
  }, [currentNode, layers]);

  // In vertical mobile mode: layers ascend from Depth 0 (bottom) to Depth 7 (top)
  const currentDepth = currentNode ? currentNode.depth : 0;

  // Auto-scroll to active layer on mount or node selection in vertical mode
  useEffect(() => {
    if (mobileViewMode) {
      const scrollToActive = () => {
        if (activeLayerRef.current) {
          activeLayerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      };

      // Run immediately and also in timeout/RAF to guarantee scroll after DOM layout paint
      scrollToActive();
      const timer = setTimeout(scrollToActive, 100);
      return () => clearTimeout(timer);
    }
  }, [mobileViewMode, currentDepth]);

  if (!map) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-1.5 sm:p-4 relative overflow-hidden select-none">
      {/* Matrix Header */}
      <div className="w-full max-w-5xl flex items-center justify-between border-b border-[#1e2c38] pb-1.5 sm:pb-2 text-xs font-mono text-slate-400 shrink-0 px-2">
        <div className="flex items-center space-x-2">
          <span className="text-[#00e5ff] glow-cyan font-bold text-[11px] sm:text-xs">CYBERSPACE MAP</span>
          <span className="hidden sm:inline">//</span>
          <span className="hidden sm:inline text-[11px]">SELECT HIGHLIGHTED NODE</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 text-[11px]">
          <span className="hidden sm:inline">DESTINATION: <strong className="text-rose-400">CORE (DEPTH 7)</strong></span>
          {!mobileViewMode && (
            <button
              onClick={() => openModal('CODEX')}
              className="flex items-center space-x-1 px-2 py-0.5 bg-[#0c1218] border border-cyan-800/80 hover:border-cyan-400 text-cyan-300 rounded text-[11px] transition-colors"
              title="Operator Codex"
            >
              <BookOpen className="w-3 h-3 text-cyan-400" />
              <span>CODEX</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Flow: Conditional Horizontal vs Vertical Spire */}
      {mobileViewMode ? (
        /* Vertical Ascending Spire Layout */
        <div className="w-full flex-1 overflow-y-auto px-3 py-4 relative flex flex-col-reverse items-center justify-start min-h-0 space-y-reverse space-y-6">
          {layers.map((layerNodes, depth) => {
            const isCurrentLayer = depth === currentDepth;
            return (
              <div
                key={depth}
                ref={isCurrentLayer ? activeLayerRef : null}
                className={`w-full max-w-xs flex flex-col items-center p-2.5 rounded-xl border transition-all ${
                  isCurrentLayer 
                    ? 'bg-cyan-950/30 border-cyan-400/70 shadow-[0_0_25px_rgba(0,229,255,0.25)] ring-1 ring-cyan-400/40' 
                    : 'border-slate-800/40 bg-[#080d12]/50'
                }`}
              >
                <div className="w-full flex items-center justify-between border-b border-slate-800/60 pb-1 mb-2">
                  <span className="text-[10px] font-mono font-black tracking-wider text-cyan-400">
                    DEPTH {depth} {depth === 7 ? '// BOSS' : depth === 0 ? '// ENTRY' : ''}
                  </span>
                  {isCurrentLayer && (
                    <span className="text-[9px] font-mono uppercase bg-cyan-900/80 text-cyan-200 px-2 py-0.5 rounded font-bold animate-pulse">
                      ACTIVE LAYER
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center space-x-5 py-1">
                  {layerNodes.map((node) => (
                    <NodeItem
                      key={node.id}
                      node={node}
                      isAccessible={accessibleIds.has(node.id)}
                      isCurrent={currentNode?.id === node.id}
                      onSelect={handleSelectNode}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Standard 8-Layer Horizontal Flow for Desktop */
        <div className="w-full max-w-6xl flex-1 flex items-center justify-between px-6 relative">
          {/* Render SVG vector connection edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="edge-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00ff66" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {Object.values(map.nodes).map((node) => {
              return node.nextIds.map((nextId) => {
                const target = map.nodes[nextId];
                if (!target) return null;

                // Normalized coordinates based on depth (8 columns) and index (up to 3 rows)
                const x1 = ((node.depth + 0.5) / 8) * 100;
                const y1 = ((node.index + 1) / (layers[node.depth].length + 1)) * 100;
                const x2 = ((target.depth + 0.5) / 8) * 100;
                const y2 = ((target.index + 1) / (layers[target.depth].length + 1)) * 100;

                const isEdgeActive = currentNode?.id === node.id && accessibleIds.has(target.id);
                const strokeColor = isEdgeActive 
                  ? 'url(#edge-pulse)' 
                  : target.revealed 
                  ? 'rgba(0, 229, 255, 0.25)' 
                  : 'rgba(50, 70, 90, 0.2)';

                return (
                  <line
                    key={`${node.id}->${nextId}`}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={strokeColor}
                    strokeWidth={isEdgeActive ? 2.5 : 1.5}
                    strokeDasharray={target.revealed ? undefined : '3,3'}
                  />
                );
              });
            })}
          </svg>

          {/* Render Layer Columns */}
          {layers.map((layerNodes, depth) => (
            <div 
              key={depth} 
              className="flex flex-col items-center justify-around h-72 z-10"
            >
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest mb-1">
                D.{depth}
              </span>
              <div className="flex flex-col items-center justify-center flex-1 space-y-4">
                {layerNodes.map((node) => (
                  <NodeItem
                    key={node.id}
                    node={node}
                    isAccessible={accessibleIds.has(node.id)}
                    isCurrent={currentNode?.id === node.id}
                    onSelect={handleSelectNode}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Instructions */}
      <div className="w-full max-w-5xl text-center border-t border-[#1e2c38] pt-2 text-[10px] sm:text-[11px] font-mono text-slate-400 shrink-0">
        [ SYSTEM NOTICE: Nodes beyond immediate layer are encrypted under cryptographic fog-of-war. Clear layers to decode subroutines. ]
      </div>
    </div>
  );
};
