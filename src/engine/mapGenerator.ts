import { MapNode, NodeType, CardByteMap } from '../types/cardbyte';
import { createPRNG, randomInt } from './random';

/**
 * Weighted distribution helper based on depth
 */
function getRandomNodeType(prng: () => number, depth: number): NodeType {
  if (depth === 0) return 'COMBAT';
  if (depth === 6) return 'REST';
  if (depth === 7) return 'BOSS';

  // Depths 1 to 5: 60% COMBAT, 20% ELITE, 10% REST, 10% TREASURE
  const roll = prng();
  if (roll < 0.60) return 'COMBAT';
  if (roll < 0.80) return 'ELITE';
  if (roll < 0.90) return 'REST';
  return 'TREASURE';
}

/**
 * Generates an 8-layer DAG map adhering to:
 * - Exactly 8 layers (Depth 0 to 7)
 * - 2-3 nodes per layer (Depths 0-6), Depth 7 has exactly 1 BOSS node
 * - Strictly no orphaned nodes (every node in D connects to >=1 in D+1; every node in D+1 has >=1 incoming edge)
 * - Planar clean connections: |indexA - indexB| <= 1
 * - Crypto-fog of war: Depths 0, 1, and 7 start revealed; Depths 2-6 start unrevealed.
 */
export function generateMatrixMap(seed: number): CardByteMap {
  const prng = createPRNG(seed);
  const nodes: Record<string, MapNode> = {};
  const layers: MapNode[][] = [];

  const MAX_DEPTH = 8; // Depths 0 through 7

  // 1. Create nodes per layer
  for (let depth = 0; depth < MAX_DEPTH; depth++) {
    const layerNodes: MapNode[] = [];
    const width = depth === 7 ? 1 : randomInt(prng, 2, 3);

    for (let index = 0; index < width; index++) {
      const id = `node_${depth}_${index}`;
      const type = getRandomNodeType(prng, depth);
      
      // Decryption visibility: Depths 0, 1, and 7 are visible at the start
      const revealed = depth === 0 || depth === 1 || depth === 7;

      const node: MapNode = {
        id,
        depth,
        index,
        type,
        nextIds: [],
        completed: false,
        revealed,
      };

      nodes[id] = node;
      layerNodes.push(node);
    }
    layers.push(layerNodes);
  }

  // 2. Establish connections layer by layer (Depth K -> Depth K+1)
  for (let depth = 0; depth < MAX_DEPTH - 1; depth++) {
    const currentLayer = layers[depth];
    const nextLayer = layers[depth + 1];

    // Track which next-layer nodes have incoming connections
    const connectedNextIndices = new Set<number>();

    // Step A: For each node in currentLayer, connect to valid adjacent nodes in nextLayer
    for (const currNode of currentLayer) {
      // If nextLayer has only 1 node (e.g. Boss at Depth 7), all nodes must connect to it
      if (nextLayer.length === 1) {
        currNode.nextIds.push(nextLayer[0].id);
        connectedNextIndices.add(nextLayer[0].index);
        continue;
      }

      // Valid candidates are adjacent: |currNode.index - nextNode.index| <= 1
      const validCandidates = nextLayer.filter(
        (next) => Math.abs(currNode.index - next.index) <= 1
      );

      // If valid candidates exist, connect to 1 or 2
      if (validCandidates.length > 0) {
        const primary = validCandidates[Math.floor(prng() * validCandidates.length)];
        currNode.nextIds.push(primary.id);
        connectedNextIndices.add(primary.index);

        if (validCandidates.length > 1 && prng() > 0.5) {
          const secondary = validCandidates.find((c) => c.id !== primary.id);
          if (secondary) {
            currNode.nextIds.push(secondary.id);
            connectedNextIndices.add(secondary.index);
          }
        }
      } else {
        // Fallback: connect to nearest nextLayer node to prevent orphaned outgoing
        const nearest = nextLayer.reduce((prev, curr) => 
          Math.abs(curr.index - currNode.index) < Math.abs(prev.index - currNode.index) ? curr : prev
        );
        currNode.nextIds.push(nearest.id);
        connectedNextIndices.add(nearest.index);
      }
    }

    // Step B: Ensure NO ORPHANED NODES in nextLayer (every next node must have >= 1 incoming edge)
    for (const nextNode of nextLayer) {
      if (!connectedNextIndices.has(nextNode.index)) {
        // Find best candidate in currentLayer with |curr.index - nextNode.index| <= 1
        const validParents = currentLayer.filter(
          (curr) => Math.abs(curr.index - nextNode.index) <= 1
        );

        if (validParents.length > 0) {
          const parent = validParents[Math.floor(prng() * validParents.length)];
          if (!parent.nextIds.includes(nextNode.id)) {
            parent.nextIds.push(nextNode.id);
          }
          connectedNextIndices.add(nextNode.index);
        } else {
          // Fallback to nearest parent if exact adjacency is tight
          const nearestParent = currentLayer.reduce((prev, curr) => 
            Math.abs(curr.index - nextNode.index) < Math.abs(prev.index - nextNode.index) ? curr : prev
          );
          if (!nearestParent.nextIds.includes(nextNode.id)) {
            nearestParent.nextIds.push(nextNode.id);
          }
        }
      }
    }

    // Sort nextIds by index for visual consistency
    for (const currNode of currentLayer) {
      currNode.nextIds.sort((a, b) => {
        const nodeA = nodes[a];
        const nodeB = nodes[b];
        return nodeA.index - nodeB.index;
      });
    }
  }

  return {
    seed,
    nodes,
    currentNodeId: null,
    maxDepth: MAX_DEPTH,
  };
}

/**
 * Progressively decrypts the map when the player completes a node.
 * Unlocks nodes at depth + 1 and depth + 2 along accessible pathways.
 */
export function decryptMapProgress(map: CardByteMap, completedNodeId: string): CardByteMap {
  const completedNode = map.nodes[completedNodeId];
  if (!completedNode) return map;

  const updatedNodes = { ...map.nodes };
  updatedNodes[completedNodeId] = {
    ...completedNode,
    completed: true,
  };

  // Reveal next layer and next+1 layer nodes
  const revealQueue: string[] = [...completedNode.nextIds];
  const nextPlusOneQueue: string[] = [];

  for (const nextId of revealQueue) {
    if (updatedNodes[nextId]) {
      updatedNodes[nextId] = { ...updatedNodes[nextId], revealed: true };
      nextPlusOneQueue.push(...updatedNodes[nextId].nextIds);
    }
  }

  for (const nextNextId of nextPlusOneQueue) {
    if (updatedNodes[nextNextId]) {
      updatedNodes[nextNextId] = { ...updatedNodes[nextNextId], revealed: true };
    }
  }

  return {
    ...map,
    nodes: updatedNodes,
    currentNodeId: completedNodeId,
  };
}
