import React, { useState, useRef, useEffect } from "react";
import useChat from "../../hooks/useChat";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const { messages, loading, ask } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const question = input;
    setInput("");
    await ask(question);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-10 right-6 md:bottom-12 md:right-12 z-50 h-16 w-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
          open ? "bg-surface-container-high text-on-surface" : "bg-primary text-on-primary hover:shadow-xl"
        }`}
        aria-label="Toggle AI Assistant"
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {open ? "close" : "smart_toy"}
        </span>
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-28 right-6 z-50 flex h-[600px] max-h-[80vh] w-[400px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl animate-fade-in">
          
          {/* Header */}
          <div className="bg-primary p-4 text-on-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-on-primary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
            </div>
            <div>
              <h2 className="text-label-lg font-bold">AMR Guardian AI</h2>
              <p className="text-body-sm opacity-80">Antibiotic Awareness Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 whitespace-pre-wrap text-body-md shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-on-primary rounded-tr-none"
                      : "bg-surface-container border border-outline-variant text-on-surface rounded-tl-none"
                  }`}
                >
                  {msg.content}

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 border-t border-outline-variant/30 pt-2 flex flex-col gap-1">
                      <strong className="text-label-sm uppercase tracking-wider opacity-70">Sources</strong>
                      {msg.sources.map((source, i) => (
                        <div key={i} className="text-xs flex items-start gap-1 opacity-90">
                          <span className="material-symbols-outlined text-[14px] shrink-0 mt-0.5">description</span>
                          <span>{source.source.split("/").pop()} (Page {source.page})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl p-3 bg-surface-container border border-outline-variant text-on-surface rounded-tl-none flex items-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined animate-spin text-primary">sync</span>
                  <span className="text-body-sm opacity-70">Synthesizing response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-outline-variant bg-surface-container-lowest p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                className="flex-1 rounded-full border border-outline-variant px-4 py-2 text-on-surface bg-surface outline-none focus:border-primary transition-colors text-body-md"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="rounded-full w-10 h-10 flex items-center justify-center bg-primary text-on-primary hover:bg-primary/90 disabled:bg-surface-container-high disabled:text-on-surface-variant transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}