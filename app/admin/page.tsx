'use client';

import { useState, useEffect } from 'react';

const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];

export default function AdminPage() {
  const [prefix, setPrefix] = useState(PREFIXES[0]);
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [isCopied, setIsCopied] = useState('');

  const generateLink = () => {
    if (!guestName) {
      alert('Please enter a guest name');
      return;
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const link = `${origin}/?p=${encodeURIComponent(prefix)}&n=${encodeURIComponent(guestName)}`;
    setGeneratedLink(link);
    setIsCopied('');
  };

  const messageTemplate = `Dear ${prefix} ${guestName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ SACHITH & HANSIKA`;

  const copyToClipboard = async (text: string, type: string) => {
    if (!generatedLink) {
      alert('Please generate the link first');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(type);
      setTimeout(() => setIsCopied(''), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-secondary/20 p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-primary mb-2">Invitation Generator</h1>
          <p className="text-sm text-primary/70 tracking-widest uppercase">Admin Portal</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-secondary/50" />
            <span className="text-primary">✦</span>
            <span className="h-px w-10 bg-secondary/50" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary/90 uppercase tracking-wider">
                Prefix
              </label>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-secondary/30 bg-background/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 text-primary"
              >
                {PREFIXES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-primary/90 uppercase tracking-wider">
                Guest Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-secondary/30 bg-background/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 text-primary placeholder:text-primary/40"
              />
            </div>
          </div>

          <button
            onClick={generateLink}
            className="w-full py-4 rounded-lg bg-secondary text-white font-medium uppercase tracking-widest hover:bg-secondary/90 transition-colors shadow-md shadow-secondary/20"
          >
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-8 pt-8 border-t border-secondary/20 space-y-6 animate-fade-in-up">
              <div className="bg-background/50 p-6 rounded-xl border border-secondary/15">
                <h3 className="text-xs font-semibold text-primary/60 uppercase tracking-widest mb-4">Generated Preview</h3>
                <div className="whitespace-pre-wrap text-sm text-primary/90 leading-relaxed font-serif italic">
                  {messageTemplate}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => copyToClipboard(generatedLink, 'link')}
                  className="w-full py-3 rounded-lg border-2 border-secondary text-secondary font-medium uppercase tracking-wider hover:bg-secondary/5 transition-colors"
                >
                  {isCopied === 'link' ? '✓ Link Copied!' : 'Copy Link Only'}
                </button>
                <button
                  onClick={() => copyToClipboard(messageTemplate, 'message')}
                  className="w-full py-3 rounded-lg bg-primary text-white font-medium uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                >
                  {isCopied === 'message' ? '✓ Message Copied!' : 'Copy Full Message'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
