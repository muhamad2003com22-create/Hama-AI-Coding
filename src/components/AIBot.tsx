import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, X, Minimize2, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AIBot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { 
      role: 'bot', 
      text: 'سڵاو! من یاریدەدەری زیرەکی حەمەم، چۆن دەتوانم یارمەتیدەرت بم؟\n\nHello! I am Hama\'s AI Assistant, how can I help you?\n\nأهلاً! أنا المساعد الذكي الخاص بـ حمه، كيف يمكنني مساعدتك؟' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const query = userMessage.toLowerCase();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Fake typing delay for local processing
    setTimeout(() => {
      let responseText = "";

      if (query.includes('سڵاو') || query.includes('چۆنی') || query.includes('hello') || query.includes('hi')) {
        responseText = "سڵاو! من یاریدەدەری زیرەکی حەمەم. بەخێربێیت بۆ فەزای کارەکەی من. چۆن دەتوانم یارمەتیت بدەم؟\n\nHello! I am Hama's AI assistant. Welcome to my workspace. How can I help you today?";
      } else if (query.includes('python') || query.includes('js') || query.includes('زمان') || query.includes('skills') || query.includes('پڕۆگرامینگ')) {
        responseText = "حەمه شارەزایی تەواوی هەیە لە زمانەکانی: Python, JavaScript, HTML, CSS. هەروەها کار بە فڕەیمۆرکەکانی React و Next.js دەکات.\n\nHama is proficient in Python, JavaScript, HTML, and CSS. He works extensively with React and Next.js frameworks.";
      } else if (query.includes('پڕۆژە') || query.includes('project') || query.includes('works') || query.includes('کارەکان')) {
        responseText = "دەتوانیت سەیری بەشی پڕۆژەکان بکەیت لە مێنیوەکە بۆ بینینی نوێترین کارەکانم کە لە ڕێگەی Firestore ـەوە بەڕێوەدەبرێن.\n\nYou can visit the Projects section in the navigation menu to see my latest work, which is dynamically managed via Firestore.";
      } else if (query.includes('پەیوەندی') || query.includes('contact') || query.includes('telegram') || query.includes('social')) {
        responseText = "دەتوانیت لە ڕێگەی تێلیگرام یان ئینستاگرام پەیوەندیم پێوە بکەیت، دوگمەکان لە بەشی خوارەوەی پەیجەکە بەردەستن.\n\nYou can reach me via Telegram or Instagram using the buttons at the bottom of the page.";
      } else {
        responseText = "ببوورە تێنەگەیشتم. دەتوانیت دەربارەی کارەکانم یان زمانەکانی پڕۆگرامینگ یان پەیوەندی پرسیار بکەیت.\n\nI'm sorry, I didn't quite catch that. You can ask about my projects, programming skills, or how to contact me.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="glass-card w-[calc(100vw-2rem)] md:w-96 h-[500px] max-h-[70vh] flex flex-col mb-6 glow-cyan overflow-hidden"
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex justify-between items-center group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Bot size={18} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wide uppercase">{t('chat.title')}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500 text-white rounded-br-none' 
                      : 'bg-white/10 text-slate-200 rounded-bl-none border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-bl-none border border-white/10 space-x-1 flex">
                    <div className="w-1 w-1 bg-cyan-400 rounded-full animate-bounce" />
                    <div className="w-1 w-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 w-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chat.placeholder')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, transition: { duration: 0 } }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_#22d3ee] transition-all p-0 select-none cursor-pointer"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
