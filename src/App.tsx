import React, { useState, useEffect, useRef } from 'react';
import { 
  Utensils, 
  PartyPopper, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ChevronRight, 
  Star, 
  Users, 
  Clock,
  Menu,
  X,
  Bot,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Truck,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAIPlannerResponse } from './services/geminiService';
import { Message } from './types';

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');
  const nodeRef = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

// --- Components ---

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: string) => void, currentPage: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoClick = () => {
    if (currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('home');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a192f]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer gap-3" onClick={handleLogoClick}>
            <img 
              src="https://i.ibb.co/gZJyvtVG/file-000000003bec71faa9b37e16b055cb49.png" 
              alt="Mithila Catering Logo" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent leading-none">
                Mithila
              </span>
              <span className="text-[10px] text-gray-400 font-light uppercase tracking-widest mt-1 hidden sm:block">Catering & Decoration</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}>Home</button>
            <button onClick={() => {
              onNavigate('home');
              setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Services</button>
            <button onClick={() => {
              onNavigate('home');
              setTimeout(() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">AI Planner</button>
            <button onClick={() => onNavigate('tiffin')} className={`text-sm font-medium transition-colors ${currentPage === 'tiffin' ? 'text-emerald-500' : 'text-gray-300 hover:text-white'}`}>Tiffin Service</button>
            <button 
              onClick={() => {
                onNavigate('home');
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-red-600/20"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a192f] border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Home</button>
              <button onClick={() => { onNavigate('tiffin'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-emerald-500">Tiffin Service</button>
              <button 
                onClick={() => {
                  onNavigate('home');
                  setIsOpen(false);
                  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="block w-full text-center px-3 py-3 bg-red-600 text-white rounded-xl font-semibold"
              >
                Enquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    {/* Background elements */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            animate={{ 
              backgroundColor: ["rgba(239, 68, 68, 0.1)", "rgba(239, 68, 68, 0.3)", "rgba(239, 68, 68, 0.1)"],
              borderColor: ["rgba(239, 68, 68, 0.2)", "rgba(239, 68, 68, 0.6)", "rgba(239, 68, 68, 0.2)"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center px-3 py-1 rounded-full border text-red-500 text-sm font-medium mb-6"
          >
            <Star size={14} className="mr-2" /> Serving Excellence Since 2021
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Crafting <span className="text-red-500">Unforgettable</span> Moments Across India
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-lg">
            From grand weddings to intimate gatherings, Mithila Catering & Decoration Service brings professional event management to your doorstep with high-quality service and authentic flavors.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all flex items-center group"
            >
              Start AI Planning <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold transition-all"
            >
              Enquire Now
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl font-bold text-white"><Counter value="600+" /></div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Events Done</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white"><Counter value="4000+" /></div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Support</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" 
              alt="Event Decoration" 
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent"></div>
          </div>
          {/* Decorative floating cards */}
          <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 z-20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500 rounded-lg">
                <Utensils className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold">Premium Catering</div>
                <div className="text-gray-400 text-sm">Authentic Mithila Flavors</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      title: "Wedding Management",
      desc: "Complete end-to-end wedding planning, from venue selection to the final send-off.",
      icon: <PartyPopper className="text-red-500" size={32} />,
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"
    },
    {
      title: "Catering Services",
      desc: "Exquisite multi-cuisine menus for Kitty Parties, Birthdays, Bhandara, and Bulk Orders.",
      icon: <Utensils className="text-blue-500" size={32} />,
      img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80"
    },
    {
      title: "Tent & Decoration",
      desc: "Premium tent services and breathtaking floral, lighting, and structural decor concepts.",
      icon: <Calendar className="text-emerald-500" size={32} />,
      img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80"
    }
  ];

  const specialties = [
    "Kitty Parties", "Birthday Parties", "Get Together", "Weddings", 
    "Anniversaries", "Bhandara", "Bulk Orders", "Corporate Events"
  ];

  return (
    <section id="services" className="py-24 bg-[#0a192f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Premium Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">We offer a wide range of event management and tent services across India, ensuring every detail is handled with precision.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              onClick={scrollToContact}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group cursor-pointer transition-all hover:border-red-500/50"
            >
              <div className="h-48 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8">
                <div className="mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="flex items-center text-red-500 text-sm font-bold group-hover:gap-2 transition-all">
                  Enquire Now <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-600/10 to-blue-600/10 rounded-[2.5rem] p-12 border border-white/5">
          <h3 className="text-2xl font-bold text-white text-center mb-10">We Specialize In</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <CheckCircle2 size={18} className="text-red-500 shrink-0" />
                <span className="text-gray-300 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AIPlanner = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm your Mithila AI Event Planner. Tell me about the event you're dreaming of, and I'll help you plan the catering, decoration, and management!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getAIPlannerResponse(userMsg, history);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <section id="planner" className="py-24 bg-[#0a192f] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-900/40 to-red-900/40 rounded-[2.5rem] p-1 border border-white/10 shadow-2xl">
          <div className="bg-[#0a192f] rounded-[2.4rem] overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                  <Bot className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold">Mithila AI Planner</h3>
                  <div className="flex items-center text-emerald-500 text-xs font-medium">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                    Online & Ready to Plan
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    m.role === 'user' 
                      ? 'bg-red-600 text-white rounded-tr-none' 
                      : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe your event needs..."
                  className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-3 p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">Powered by Gemini AI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mqeybnnv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a192f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-12">Have questions about your upcoming event? Fill out the form and our team will respond within 24 hours.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-600/20">
                  <Phone className="text-blue-500" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm uppercase tracking-wider mb-1">Call Us</div>
                  <div className="text-white font-bold text-lg">+91 9650254164</div>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="p-4 bg-red-600/10 rounded-2xl border border-red-600/20">
                  <Mail className="text-red-500" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm uppercase tracking-wider mb-1">Email Us</div>
                  <div className="text-white font-bold text-lg">ranjanjha2012@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-emerald-600/10 rounded-2xl border border-emerald-600/20">
                  <MapPin className="text-emerald-500" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm uppercase tracking-wider mb-1">Location</div>
                  <div className="text-white font-bold text-lg">Serving All Over India</div>
                  <div className="text-gray-400 text-sm">Head Office: Delhi NCR</div>
                </div>
              </div>
            <div className="mt-12 pt-12 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="text-blue-500" size={20} /> Service Coverage
              </h3>
              <div className="rounded-2xl overflow-hidden border border-white/10 h-64 relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5619676302455!2d77.2273210755001!3d28.61393907567491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b7187947bd0!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1710435000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-[#0a192f]/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="text-xs font-bold text-white uppercase tracking-widest mb-1">Primary Hub</div>
                  <div className="text-sm text-gray-300">Delhi NCR, Faridabad, Noida & Pan-India Service</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Delhi', 'Noida', 'Faridabad', 'Gurugram', 'Patna', 'Darbhanga', 'Mumbai', 'Bangalore'].map(city => (
                  <span key={city} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-medium">
                    {city}
                  </span>
                ))}
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] text-blue-400 font-bold">
                  + Pan India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-8 sm:p-12 rounded-[2.5rem] border border-white/10">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-emerald-500" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Enquiry Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Full Name</label>
                    <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Phone Number</label>
                    <input required name="phone" type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Email Address</label>
                    <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Approximate Guests</label>
                    <input required name="guests" type="number" placeholder="e.g. 200" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Event Type</label>
                  <select name="event_type" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50">
                    <option className="bg-[#0a192f]">Wedding</option>
                    <option className="bg-[#0a192f]">Birthday</option>
                    <option className="bg-[#0a192f]">Corporate Event</option>
                    <option className="bg-[#0a192f]">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Delivery Address</label>
                  <textarea required name="address" rows={3} placeholder="Enter your full address..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Your Message</label>
                  <textarea required name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-600/20">
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const TiffinSubscriptionModal = ({ isOpen, onClose, planType, basePrice }: { isOpen: boolean, onClose: () => void, planType: string, basePrice: number }) => {
  const [selectedMeals, setSelectedMeals] = useState<string[]>(['lunch']);
  const upiId = "9650254164@kotak";

  const meals = [
    { id: 'breakfast', label: 'Breakfast', icon: <Clock size={18} /> },
    { id: 'lunch', label: 'Lunch', icon: <Utensils size={18} /> },
    { id: 'dinner', label: 'Dinner', icon: <Clock size={18} /> },
  ];

  const toggleMeal = (id: string) => {
    if (selectedMeals.includes(id)) {
      if (selectedMeals.length > 1) {
        setSelectedMeals(selectedMeals.filter(m => m !== id));
      }
    } else {
      setSelectedMeals([...selectedMeals, id]);
    }
  };

  const getDiscount = () => {
    const count = selectedMeals.length;
    if (count === 3) return 14;
    if (count === 2) return 10;
    return 0;
  };

  const calculateTotal = () => {
    const subtotal = basePrice * selectedMeals.length;
    const discount = getDiscount();
    const discountAmount = (subtotal * discount) / 100;
    return Math.round(subtotal - discountAmount);
  };

  const total = calculateTotal();
  const upiLink = `upi://pay?pa=${upiId}&pn=Mithila%20Catering&am=${total}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] overflow-y-auto bg-black/90 backdrop-blur-md">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0a192f] border border-white/10 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden"
            >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Customize Your Plan</h3>
            <p className="text-emerald-400 text-sm font-medium mb-4 sm:mb-6">{planType} Service</p>
            
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">Select Meals (Add to Cart)</div>
              {meals.map((meal) => (
                <button
                  key={meal.id}
                  onClick={() => toggleMeal(meal.id)}
                  className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${
                    selectedMeals.includes(meal.id)
                      ? 'bg-emerald-500/20 border-emerald-500 text-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${selectedMeals.includes(meal.id) ? 'text-emerald-400' : 'text-gray-500'}`}>
                      {meal.icon}
                    </div>
                    <span className="font-bold">{meal.label}</span>
                  </div>
                  {selectedMeals.includes(meal.id) ? (
                    <div className="bg-emerald-500 rounded-full p-1">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-white/10"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-white/5 rounded-2xl p-4 mb-8 space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal ({selectedMeals.length} meals)</span>
                <span>₹{basePrice * selectedMeals.length}</span>
              </div>
              <div className="flex justify-between text-sm text-emerald-400">
                <span>Discount ({getDiscount()}%)</span>
                <span>-₹{Math.round((basePrice * selectedMeals.length * getDiscount()) / 100)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-3xl mb-4 sm:mb-6 inline-block shadow-xl shadow-emerald-500/10">
              <img 
                src={qrCodeUrl} 
                alt="UPI QR Code" 
                className="w-40 h-40 sm:w-56 sm:h-56"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 mb-6 sm:mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">UPI ID</div>
                <div className="text-white font-mono font-bold text-lg">{upiId}</div>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 mb-6 sm:mb-8">
              <p className="text-emerald-400 text-xs font-medium">
                ⚠️ After payment of ₹{total}, please share the screenshot and your delivery address on WhatsApp to activate your service.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 sm:mb-8 text-left">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3">Delivery Timings</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex justify-between"><span>Breakfast:</span> <span className="text-white">07:00 AM - 10:00 AM</span></li>
                <li className="flex justify-between"><span>Lunch:</span> <span className="text-white">12:00 PM - 03:00 PM</span></li>
                <li className="flex justify-between"><span>Dinner:</span> <span className="text-white">05:30 PM - 10:00 PM</span></li>
              </ul>
              <p className="mt-3 text-[10px] text-emerald-400/70 italic">
                * Note: Breakfast may be delivered slightly late; Dinner is delivered early.
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10"
              >
                Back
              </button>
              <a
                href="https://wa.link/a8re98"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[2] py-4 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                Share Screenshot
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    )}
  </AnimatePresence>
);
};

const TiffinPage = ({ onBack }: { onBack: () => void }) => {
  const [subscriptionConfig, setSubscriptionConfig] = useState<{ type: string, basePrice: number } | null>(null);
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  const plans = [
    {
      id: 'veg',
      type: 'Vegetarian',
      category: 'veg',
      price: 2700,
      popular: false,
      features: [
        '4 Roti + Rice + Dal + Sabji',
        'Fresh Salad Included',
        'Sweet/Raita (Weekdays)',
        'Daily Menu Change (Dal & Sabji)',
        'Guaranteed On-time Delivery'
      ],
      color: 'bg-white/10 border-white/20',
      btnColor: 'bg-white text-emerald-900 hover:bg-emerald-50'
    },
    {
      id: 'non-veg',
      type: 'Non-Veg',
      category: 'non-veg',
      price: 3199,
      popular: true,
      features: [
        '4 Roti + Rice + Dal + Non-Veg Sabji',
        'Fresh Salad Included',
        'Sweet/Raita (Weekdays)',
        'Daily Menu Change',
        'Guaranteed On-time Delivery'
      ],
      color: 'bg-emerald-900/50 border-emerald-400/30',
      btnColor: 'bg-emerald-500 text-white hover:bg-emerald-600'
    }
  ];

  const filteredPlans = filter === 'all' ? plans : plans.filter(p => p.category === filter);

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="min-h-screen bg-[#064e3b] pt-32 pb-24">
      <TiffinSubscriptionModal 
        isOpen={!!subscriptionConfig} 
        onClose={() => setSubscriptionConfig(null)} 
        planType={subscriptionConfig?.type || ''} 
        basePrice={subscriptionConfig?.basePrice || 0} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="flex items-center gap-2 text-emerald-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Truck size={14} className="mr-2" /> Exclusive Service
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Monthly Tiffin Service</h1>
          <p className="text-emerald-100/70 max-w-2xl mx-auto text-lg mb-10">
            Healthy, hygienic, and home-style meals delivered on time. 
            Available exclusively in <span className="text-white font-bold">Delhi, Faridabad, and Noida</span>.
          </p>

          {/* Filters */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              { id: 'all', label: 'All Plans' },
              { id: 'veg', label: 'Vegetarian' },
              { id: 'non-veg', label: 'Non-Veg' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                  filter === f.id 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-white/5 border-white/10 text-emerald-100/60 hover:border-white/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredPlans.map((plan) => (
              <motion.div 
                key={plan.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className={`${plan.color} backdrop-blur-md border rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden flex flex-col`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Utensils size={120} className="text-white" />
                </div>
                <div className="relative z-10 flex-1">
                  {plan.popular && (
                    <div className="inline-block px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Popular Choice</div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.type} Plan</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-bold text-white">₹{plan.price}</span>
                    <span className="text-emerald-200/60">/ month</span>
                  </div>
                  
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-emerald-50 text-sm">
                        <CheckCircle2 size={18} className="text-emerald-400 mr-3 shrink-0" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10">
                  <button 
                    onClick={() => setSubscriptionConfig({ type: plan.type, basePrice: plan.price })}
                    className={`w-full py-4 ${plan.btnColor} rounded-2xl font-bold transition-colors`}
                  >
                    Subscribe Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-white/5 rounded-3xl p-8 border border-white/10 text-center">
          <h4 className="text-white font-bold mb-6">Delivery Information</h4>
          <div className="grid sm:grid-cols-3 gap-6 text-emerald-100/60 text-sm mb-8">
            <div className="flex flex-col items-center gap-2">
              <Clock size={16} className="text-emerald-400" />
              <div className="font-bold text-white">Breakfast</div>
              <div>07:00 AM - 10:00 AM</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock size={16} className="text-emerald-400" />
              <div className="font-bold text-white">Lunch</div>
              <div>12:00 PM - 03:00 PM</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock size={16} className="text-emerald-400" />
              <div className="font-bold text-white">Dinner</div>
              <div>05:30 PM - 10:00 PM</div>
            </div>
          </div>
          <p className="text-xs text-emerald-400/60 italic mb-6">
            * Note: Breakfast delivery may be slightly late; Dinner is delivered early.
          </p>
          <div className="flex items-center justify-center gap-4 text-emerald-100/60 text-sm pt-6 border-t border-white/5">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> Delhi | Noida | Faridabad
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#050c18] border-t border-white/5 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent mb-6">
            Mithila Catering
          </div>
          <p className="text-gray-500 max-w-sm mb-8">
            Professional event management and catering services since 2021. We bring high-quality service and authentic flavors to every event across India.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
              <Users size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
              <Phone size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#planner" className="hover:text-white transition-colors">AI Planner</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-red-500" /> +91 9650254164
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-red-500" /> ranjanjha2012@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-red-500" /> Delhi NCR, India
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-xs uppercase tracking-widest">
          © 2026 Mithila Catering & Decoration Service. All Rights Reserved.
        </p>
        <p className="text-gray-600 text-xs uppercase tracking-widest">
          Designed by Ranjan Kumar Jha
        </p>
      </div>
    </div>
  </footer>
);

const LocationPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenLocationPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSave = () => {
    if (location.trim()) {
      sessionStorage.setItem('userLocation', location);
      sessionStorage.setItem('hasSeenLocationPopup', 'true');
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#0a192f] border border-white/10 p-8 rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-blue-500"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mb-6 border border-red-600/20">
                <MapPin className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to Mithila</h3>
              <p className="text-gray-400 mb-8">Please tell us your event location so we can serve you better.</p>
              
              <div className="w-full space-y-4">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your city/place..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-600/20"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.link/a8re98"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.001.332.005c.109.004.258-.041.404.314l.542 1.312c.058.141.096.305.004.49-.092.185-.138.301-.273.458-.135.157-.285.35-.406.469-.139.137-.285.287-.123.565.162.278.719 1.186 1.541 1.918.822.732 1.517.957 1.834 1.091.317.134.504.111.693-.102.188-.213.807-.942.993-1.266.187-.324.373-.271.629-.176l1.972.933c.254.122.423.18.481.278.058.098.058.569-.086.974z"/>
    </svg>
    <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold whitespace-nowrap">
      Chat on WhatsApp
    </span>
  </motion.a>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Force scroll to top immediately on page change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Secondary check to ensure it stays at top after render
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
    
    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#0a192f] font-sans selection:bg-red-500/30">
      <WhatsAppButton />
      <LocationPopup />
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <Services />
            <AIPlanner />
            <Contact />
          </>
        ) : (
          <TiffinPage onBack={() => setCurrentPage('home')} />
        )}
      </main>

      <Footer />
    </div>
  );
}
