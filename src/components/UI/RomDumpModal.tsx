import React, { useState, useEffect, useRef } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { localStorageAdapter } from '../../engine/storageAdapter';
import { HardDrive, Copy, Check, Download, Upload, AlertCircle, X } from 'lucide-react';
import { t } from '../../locales';

export const RomDumpModal: React.FC = () => {
  const { locale, activeModal, closeModal, resumeRun, loadProfileFromStorage } = useCardByteStore();
  const [copied, setCopied] = useState(false);
  const [importString, setImportString] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((tId) => clearTimeout(tId));
      timeoutsRef.current = [];
    };
  }, []);

  const addTimeout = (cb: () => void, delay: number) => {
    const id = setTimeout(() => {
      cb();
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== id);
    }, delay);
    timeoutsRef.current.push(id);
  };

  if (activeModal !== 'ROM_DUMP') return null;

  const handleCopyDump = async () => {
    const dump = await localStorageAdapter.exportDump();
    await navigator.clipboard.writeText(dump);
    setCopied(true);
    addTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDeckFile = async () => {
    const dump = await localStorageAdapter.exportDump();
    const blob = new Blob([dump], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jockey_dump_${Date.now()}.deck`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportString = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!importString.trim()) {
      setErrorMsg('Please input a valid Cyber-String.');
      return;
    }

    const ok = await localStorageAdapter.importDump(importString);
    if (!ok) {
      setErrorMsg('[ERR: CORRUPTED DATA PACKET - CHECKSUM MISMATCH]');
      return;
    }

    await loadProfileFromStorage();
    await resumeRun();
    setSuccessMsg('ROM CARTRIDGE FLASHED SUCCESSFULLY!');
    addTimeout(() => {
      closeModal();
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = await localStorageAdapter.importDump(content);
        if (ok) {
          await loadProfileFromStorage();
          await resumeRun();
          setSuccessMsg('CARTRIDGE MOUNTED: RUN RESTORED');
          addTimeout(() => closeModal(), 1200);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="max-w-lg w-full bg-[#0c1218] border-2 border-amber-600/80 rounded-xl p-6 relative font-mono text-slate-200 box-glow-amber">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-amber-400 font-bold mb-1">
          <HardDrive className="w-5 h-5" />
          <span>{t(locale, 'modals.romDump.title')}</span>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          {t(locale, 'modals.romDump.subtitle')}
        </p>

        {/* Section 1: Export */}
        <div className="bg-[#070b0e] border border-slate-800 rounded p-4 mb-4">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block mb-2">
            [ EXPORT // BACKUP DECK ]
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleCopyDump}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded text-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00ff66]" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? t(locale, 'modals.romDump.copied') : t(locale, 'modals.romDump.copyJson')}</span>
            </button>
            <button
              onClick={handleDownloadDeckFile}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>DUMP TO (.DECK)</span>
            </button>
          </div>
        </div>

        {/* Section 2: Import */}
        <div className="bg-[#070b0e] border border-slate-800 rounded p-4">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-2">
            [ IMPORT // FLASH ROM CARTRIDGE ]
          </span>
          <textarea
            value={importString}
            onChange={(e) => setImportString(e.target.value)}
            placeholder="Paste CB7:// Cyber-String here..."
            className="w-full h-16 bg-[#05080b] border border-slate-800 rounded p-2 text-[11px] text-slate-300 resize-none font-mono focus:border-amber-500 focus:outline-none mb-2"
          />

          <div className="flex space-x-2">
            <button
              onClick={handleImportString}
              className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded text-xs uppercase transition-colors"
            >
              FLASH TO MEMORY
            </button>

            <label className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded text-xs cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>LOAD .DECK FILE</span>
              <input
                type="file"
                accept=".deck,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="mt-3 flex items-center space-x-1.5 text-xs text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-800">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mt-3 flex items-center space-x-1.5 text-xs text-[#00ff66] bg-[#00ff66]/10 p-2 rounded border border-[#00ff66]/50">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};
