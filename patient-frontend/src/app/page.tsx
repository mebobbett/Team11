"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { from: "doctor", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "patient", text: input }]);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ece5dd]">
      {/* Header */}
      <div className="bg-[#075e54] text-white px-4 py-3 flex items-center shadow-md w-full max-w-lg rounded-t-xl">
        <div className="rounded-full bg-white w-8 h-8 mr-3" />
        <span className="font-semibold text-lg">Dr. Smith</span>
      </div>
      {/* Input Box in Center */}
      <form
        onSubmit={sendMessage}
        className="w-full max-w-lg flex flex-col items-center bg-[#f7f7f7] px-6 py-8 rounded-b-xl shadow-md border-t-0 border border-gray-200"
      >
        <input
          type="text"
          className="w-full h-20 rounded-2xl px-6 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#075e54] text-gray-800 placeholder-gray-400 text-xl shadow-sm mb-6"
          placeholder="what question do you have for your doctor?"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#075e54] text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-[#128c7e] transition text-lg"
        >
          Send
        </button>
      </form>
      {/* Chat Area Below Input */}
      <div className="w-full max-w-lg flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-[#ece5dd] mt-8 rounded-xl shadow-inner min-h-[300px]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === "patient" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-xl px-4 py-2 max-w-xs sm:max-w-md text-base shadow-md whitespace-pre-line ${
                msg.from === "patient"
                  ? "bg-[#dcf8c6] text-right"
                  : "bg-white text-left"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
