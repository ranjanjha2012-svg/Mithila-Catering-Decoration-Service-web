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
  Globe,
  MoreHorizontal,
  Image as ImageIcon,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIPlannerResponse } from './services/geminiService';
import { Message } from './types';

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(16, totalMiliseconds / end); // Minimum 16ms (approx 60fps)
    const step = Math.max(1, Math.ceil(end / (totalMiliseconds / 16)));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-amber-50/90 backdrop-blur-md border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer gap-3" onClick={handleLogoClick}>
            <img 
              src="https://i.ibb.co/gZJyvtVG/file-000000003bec71faa9b37e16b055cb49.png" 
              alt="Mithila Catering & Decoration Service Logo" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent leading-none">
                Mithila
              </span>
              <span className="text-[10px] text-amber-800 font-light uppercase tracking-widest mt-1 block">Catering & Decoration Service</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-amber-600' : 'text-amber-900 hover:text-amber-600'}`}>Home</button>
            <button onClick={() => {
              onNavigate('home');
              setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} className="text-sm font-medium text-amber-900 hover:text-amber-600 transition-colors">Services</button>
            <button onClick={() => {
              onNavigate('home');
              setTimeout(() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} className="text-sm font-medium text-amber-900 hover:text-amber-600 transition-colors">AI Planner</button>
            <button onClick={() => onNavigate('tiffin')} className={`text-sm font-medium transition-colors ${currentPage === 'tiffin' ? 'text-emerald-600' : 'text-amber-900 hover:text-amber-600'}`}>Tiffin Service</button>
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-amber-900 hover:text-amber-600 transition-colors">
                More <MoreHorizontal size={16} />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-amber-50 border border-amber-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="p-2">
                  <button 
                    onClick={() => {
                      onNavigate('gallery');
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-amber-900 hover:text-amber-600 hover:bg-amber-100 rounded-lg transition-all"
                  >
                    <ImageIcon size={16} /> Event Gallery
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                onNavigate('home');
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-amber-600/20"
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
            className="md:hidden bg-amber-50 border-b border-amber-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-amber-900 hover:text-amber-600">Home</button>
              <button onClick={() => { 
                onNavigate('gallery'); 
                setIsOpen(false);
              }} className="block w-full text-left px-3 py-2 text-base font-medium text-amber-900 hover:text-amber-600">Event Gallery</button>
              <button onClick={() => { onNavigate('tiffin'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-emerald-600">Tiffin Service</button>
              <button 
                onClick={() => {
                  onNavigate('home');
                  setIsOpen(false);
                  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="block w-full text-center px-3 py-3 bg-amber-600 text-white rounded-xl font-semibold"
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
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              backgroundColor: ["rgba(153, 27, 27, 0.1)", "rgba(153, 27, 27, 0.2)", "rgba(153, 27, 27, 0.1)"],
              borderColor: ["rgba(153, 27, 27, 0.2)", "rgba(153, 27, 27, 0.4)", "rgba(153, 27, 27, 0.2)"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center px-3 py-1 rounded-full border border-red-900/20 text-red-800 text-sm font-medium mb-6"
          >
            <Star size={14} className="mr-2 fill-red-800" /> Serving Excellence Since 2021
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold text-amber-950 leading-tight mb-6">
            Crafting <span className="text-amber-600">Unforgettable</span> Moments Across India
          </h1>
          <p className="text-lg text-amber-800/80 mb-8 max-w-lg">
            From grand weddings to intimate gatherings, Mithila Catering & Decoration Service brings professional event management to your doorstep with high-quality service and authentic flavors.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold transition-all flex items-center group shadow-lg shadow-amber-600/20"
            >
              Start AI Planning <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200 rounded-full font-bold transition-all"
            >
              Enquire Now
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-amber-800/60 text-sm">We are also available on:</span>
            <a 
              href="https://zomato.onelink.me/xqzv/2eh1vuyw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 border border-[#E23744]/20 rounded-full hover:bg-[#E23744]/20 transition-all group"
            >
              <img 
                src="https://i.ibb.co/84NZ3GSF/zomato-logo-zomato-icon-transparent-free-png.webp" 
                alt="Zomato" 
                className="h-4 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-[#E23744] text-xs font-bold uppercase tracking-widest">Order Now</span>
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-amber-200 pt-8">
            <div>
              <div className="text-3xl font-bold text-amber-950"><Counter value="600+" /></div>
              <div className="text-sm text-amber-800/60 uppercase tracking-wider">Events Done</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-950"><Counter value="4000+" /></div>
              <div className="text-sm text-amber-800/60 uppercase tracking-wider">Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-950">24/7</div>
              <div className="text-sm text-amber-800/60 uppercase tracking-wider">Support</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-amber-200 shadow-2xl shadow-amber-600/10">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" 
              alt="Event Decoration" 
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent"></div>
          </div>
          {/* Decorative floating cards */}
          <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-amber-200 z-20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-600 rounded-lg">
                <Utensils className="text-white" />
              </div>
              <div>
                <div className="text-amber-950 font-bold">Premium Catering</div>
                <div className="text-amber-800/70 text-sm">Authentic Mithila Flavors</div>
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
      icon: <PartyPopper className="text-amber-500" size={32} />,
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"
    },
    {
      title: "Catering Services",
      desc: "Exquisite multi-cuisine menus for Kitty Parties, Birthdays, Bhandara, and Bulk Orders.",
      icon: <Utensils className="text-amber-600" size={32} />,
      img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80"
    },
    {
      title: "Tent & Decoration",
      desc: "Premium tent services and breathtaking floral, lighting, and structural decor concepts.",
      icon: <Calendar className="text-amber-600" size={32} />,
      img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80"
    }
  ];

  const specialties = [
    "Kitty Parties", "Birthday Parties", "Get Together", "Weddings", 
    "Anniversaries", "Bhandara", "Bulk Orders", "Corporate Events"
  ];

  return (
    <section id="services" className="py-24 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-950 mb-4">Our Premium Services</h2>
          <p className="text-amber-800/70 max-w-2xl mx-auto">We offer a wide range of event management and tent services across India, ensuring every detail is handled with precision.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              onClick={scrollToContact}
              className="bg-white border border-amber-200 rounded-3xl overflow-hidden group cursor-pointer transition-all hover:border-amber-500/50 shadow-sm hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8">
                <div className="mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-amber-950 mb-3">{s.title}</h3>
                <p className="text-amber-800/70 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="flex items-center text-amber-600 text-sm font-bold group-hover:gap-2 transition-all">
                  Enquire Now <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-600/5 to-amber-900/5 rounded-[2.5rem] p-12 border border-amber-200">
          <h3 className="text-2xl font-bold text-amber-950 text-center mb-10">We Specialize In</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-amber-100 hover:bg-amber-50 transition-colors shadow-sm">
                <CheckCircle2 size={18} className="text-amber-600 shrink-0" />
                <span className="text-amber-900 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedGallery = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <section className="py-24 bg-amber-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">Our <span className="text-amber-600">Recent</span> Work</h2>
            <p className="text-amber-800/70 max-w-xl">Take a look at some of our most recent setups and decorations that have made events truly special.</p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => onNavigate('gallery')}
            className="px-8 py-4 bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-full font-bold transition-all flex items-center group shadow-sm"
          >
            View Full Gallery <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-[2.5rem] overflow-hidden aspect-[16/10] cursor-pointer"
            onClick={() => onNavigate('gallery')}
          >
            <img 
              src="https://i.ibb.co/67CKhp6R/Whats-App-Image-2026-03-15-at-15-56-19-1.jpg" 
              alt="Banner Setup" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">Catering & Setup</span>
              <h3 className="text-white text-2xl font-bold">Grand Event Banner</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative rounded-[2.5rem] overflow-hidden aspect-[16/10] cursor-pointer"
            onClick={() => onNavigate('gallery')}
          >
            <img 
              src="https://i.ibb.co/21hS44ky/56ryhg5r6.jpg" 
              alt="Tent Setup" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">Decoration</span>
              <h3 className="text-white text-2xl font-bold">Premium Tent Service</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const VideoHighlights = () => {
  const videos = [
    {
      title: "Grand Wedding Decor",
      url: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder video
      thumbnail: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"
    },
    {
      title: "Premium Catering Setup",
      url: "https://www.w3schools.com/html/movie.mp4", // Placeholder video
      thumbnail: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="py-24 bg-amber-50 border-t border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">Video <span className="text-amber-600">Highlights</span></h2>
          <p className="text-amber-800/70 max-w-2xl mx-auto">Experience the magic of our events through these short cinematic highlights.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {videos.map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative rounded-[2.5rem] overflow-hidden bg-amber-950 border border-amber-200 shadow-2xl"
            >
              <video 
                className="w-full aspect-video object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                controls
                poster={video.thumbnail}
              >
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-6 left-6 pointer-events-none">
                <div className="bg-amber-600/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
                  <Play size={14} className="fill-white text-white" />
                  <span className="text-white text-xs font-bold uppercase tracking-widest">{video.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-amber-800/50 text-sm italic">
            Note: For the best performance, we recommend hosting long videos on YouTube and sharing the links with us.
          </p>
        </div>
      </div>
    </section>
  );
};

const EventGallery = ({ onBack }: { onBack: () => void }) => {
  const categories = ['All', 'Weddings', 'Corporate', 'Decorations', 'Catering', 'Videos'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<{ url: string, title: string, category: string, type?: 'image' | 'video' } | null>(null);

  const mediaItems = [
    { url: 'https://i.ibb.co/67CKhp6R/Whats-App-Image-2026-03-15-at-15-56-19-1.jpg', category: 'Catering', title: 'Banner', type: 'image' },
    { url: 'https://i.ibb.co/DN845bT/Whats-App-Image-2026-03-15-at-15-56-2734r5.jpg', category: 'Catering', title: 'Breakfast', type: 'image' },
    { url: 'https://i.ibb.co/q3fkc003/Whats-App-Image-2026-03-15-at-15-56-19.jpg', category: 'Decorations', title: 'Setup', type: 'image' },
    { url: 'https://i.ibb.co/h1KNWqCH/34r5t3.jpg', category: 'Decorations', title: 'Tent Service', type: 'image' },
    { url: 'https://i.ibb.co/21hS44ky/56ryhg5r6.jpg', category: 'Decorations', title: 'Tent', type: 'image' },
    { url: 'https://i.ibb.co/5tX9mvW/khbikuuk.jpg', category: 'Catering', title: 'Buffet', type: 'image' },
    { url: 'https://i.ibb.co/HLQ10nBQ/Whats-App-Image-2026-03-15-at-15-56-25.jpg', category: 'Decorations', title: 'Event Setup', type: 'image' },
    { url: 'https://i.ibb.co/MDjbSgFg/4e5rft3r.jpg', category: 'Catering', title: 'Our Thali', type: 'image' },
    { url: 'https://i.ibb.co/jvsP6JHH/Whats-App-Image-2026-03-15-at-16-00-25.jpg', category: 'Weddings', title: 'Haldi/Mehndi Decoration', type: 'image' },
    { url: 'https://i.ibb.co/BSfKSxp/Whats-App-Image-2026-03-15-at-16-00-2534rfd34.jpg', category: 'Weddings', title: 'Haldi/Mehndi Decoration', type: 'image' },
    { url: 'https://i.ibb.co/k6rC3ZFf/Whats-App-Image-2026-03-15-at-15-56-26-1-iug.jpg', category: 'Corporate', title: 'Proper Team', type: 'image' },
    { url: 'https://i.ibb.co/tPCR9XpY/Whats-App-Image-2026-03-15-at-15-56-27.jpg', category: 'Catering', title: 'Catering Setup', type: 'image' },
    { url: 'https://www.w3schools.com/html/mov_bbb.mp4', category: 'Videos', title: 'Recent Event Highlight', type: 'video' },
  ];

  const filteredMedia = activeCategory === 'All' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="pt-32 pb-24 bg-amber-50 min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-amber-800/60 hover:text-amber-950 transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to Home
        </motion.button>

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-amber-950 mb-6">Event <span className="text-amber-500">Gallery</span></h2>
            <p className="text-amber-800/70 max-w-2xl mx-auto text-lg">
              Explore our portfolio of stunning events, exquisite decorations, and mouth-watering catering setups across India.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' 
                    : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.url}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex flex-col gap-4"
              >
                <div 
                  onClick={() => setSelectedMedia(item)}
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-amber-200 bg-amber-100/20"
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full relative">
                      <video 
                        src={item.url} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-amber-600 p-4 rounded-full shadow-xl transform group-hover:scale-110 transition-transform">
                          <Play size={24} className="text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 bg-amber-950/10 group-hover:bg-amber-950/0 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
                      {item.type === 'video' ? <Play className="text-white" size={24} /> : <ImageIcon className="text-white" size={24} />}
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <span className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">{item.category}</span>
                  <h4 className="text-amber-950 font-bold text-xl tracking-tight group-hover:text-amber-600 transition-colors">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Screen HD View Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setSelectedMedia(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedMedia(null)}
            >
              <X size={40} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                {selectedMedia.type === 'video' ? (
                  <video 
                    src={selectedMedia.url} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img 
                    src={selectedMedia.url} 
                    alt={selectedMedia.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              <div className="text-center">
                <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.3em] mb-2 block">{selectedMedia.category}</span>
                <h3 className="text-white text-3xl font-bold">{selectedMedia.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const AIPlanner = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm your Mithila AI Event Planner. Tell me about the event you're dreaming of, and I'll help you plan the catering, decoration, and management!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
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

    // Incorporate event details into the prompt if provided
    let contextPrompt = userMsg;
    const details = [];
    if (eventDate) details.push(`Date: ${eventDate}`);
    if (eventTime) details.push(`Time: ${eventTime}`);
    if (eventLocation) details.push(`Location: ${eventLocation}`);
    
    if (details.length > 0) {
      contextPrompt = `[Context - Event Details: ${details.join(', ')}] ${userMsg}`;
    }

    const response = await getAIPlannerResponse(contextPrompt, history);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <section id="planner" className="py-24 bg-amber-50 relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-amber-600/30 via-amber-900/20 to-amber-600/30 rounded-[2.5rem] p-1 border border-amber-200 shadow-[0_0_50px_rgba(217,119,6,0.1)]">
          <div className="bg-white rounded-[2.4rem] overflow-hidden flex flex-col h-[700px] border border-amber-100">
            {/* Header */}
            <div className="p-6 border-b border-amber-100 flex flex-col gap-6 bg-amber-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center shadow-lg shadow-amber-600/20">
                    <Bot className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-amber-950 font-bold">Mithila AI Planner</h3>
                    <div className="flex items-center text-emerald-600 text-xs font-medium">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2 animate-pulse"></span>
                      Online & Ready to Plan
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details Quick Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-800/50" size={14} />
                  <input 
                    type="date" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-xl py-2 pl-9 pr-3 text-xs text-amber-950 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                    placeholder="Event Date"
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-800/50" size={14} />
                  <input 
                    type="time" 
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-xl py-2 pl-9 pr-3 text-xs text-amber-950 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                    placeholder="Event Time"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-800/50" size={14} />
                  <input 
                    type="text" 
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-xl py-2 pl-9 pr-3 text-xs text-amber-950 placeholder-amber-800/40 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                    placeholder="Event Location"
                  />
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-white">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    m.role === 'user' 
                      ? 'bg-amber-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-amber-50 text-amber-900 rounded-tl-none border border-amber-100'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-amber-50 p-4 rounded-2xl rounded-tl-none border border-amber-100 flex gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-amber-100 bg-amber-50/30">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe your event needs..."
                  className="w-full bg-white border border-amber-200 rounded-2xl py-4 pl-6 pr-16 text-amber-950 placeholder-amber-800/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-3 p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-center text-[10px] text-amber-800/50 mt-4 uppercase tracking-widest">Powered by Gemini AI</p>
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
    <section id="contact" className="py-24 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-amber-950 mb-6">Get in Touch</h2>
            <p className="text-amber-800/70 mb-12">Have questions about your upcoming event? Fill out the form and our team will respond within 24 hours.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-amber-600/10 rounded-2xl border border-amber-600/20">
                  <Users className="text-amber-600" />
                </div>
                <div>
                  <div className="text-amber-800/50 text-sm uppercase tracking-wider mb-1">Owner</div>
                  <div className="text-amber-950 font-bold text-lg">Ranjan Kumar Jha</div>
                  <div className="text-amber-600 text-xs font-medium uppercase tracking-widest">Founder & Managing Director</div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-amber-600/10 rounded-2xl border border-amber-600/20">
                  <Phone className="text-amber-600" />
                </div>
                <div>
                  <div className="text-amber-800/50 text-sm uppercase tracking-wider mb-1">Call Us</div>
                  <div className="text-amber-950 font-bold text-lg">+91 9650254164</div>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="p-4 bg-amber-600/10 rounded-2xl border border-amber-600/20">
                  <Mail className="text-amber-600" />
                </div>
                <div>
                  <div className="text-amber-800/50 text-sm uppercase tracking-wider mb-1">Email Us</div>
                  <div className="text-amber-950 font-bold text-lg">ranjanjha2012@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-emerald-600/10 rounded-2xl border border-emerald-600/20">
                  <MapPin className="text-emerald-600" />
                </div>
                <div>
                  <div className="text-amber-800/50 text-sm uppercase tracking-wider mb-1">Location</div>
                  <div className="text-amber-950 font-bold text-lg">Serving All Over India</div>
                  <div className="text-amber-800/70 text-sm">Head Office: Delhi NCR</div>
                </div>
              </div>
            <div className="mt-12 pt-12 border-t border-amber-200">
              <h3 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-2">
                <Globe className="text-amber-600" size={20} /> Service Coverage
              </h3>
              <div className="rounded-2xl overflow-hidden border border-amber-200 h-64 relative group shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5619676302455!2d77.2273210755001!3d28.61393907567491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b7187947bd0!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1710435000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1)' }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 bg-amber-600/5 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-amber-200 shadow-lg">
                  <div className="text-xs font-bold text-amber-950 uppercase tracking-widest mb-1">Primary Hub</div>
                  <div className="text-sm text-amber-900">Delhi NCR, Faridabad, Noida & Pan-India Service</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Delhi', 'Noida', 'Faridabad', 'Gurugram', 'Patna', 'Darbhanga', 'Mumbai', 'Bangalore'].map(city => (
                  <span key={city} className="px-3 py-1 bg-white border border-amber-100 rounded-full text-[10px] text-amber-800 font-medium shadow-sm">
                    {city}
                  </span>
                ))}
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] text-amber-600 font-bold">
                  + Pan India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-amber-200 shadow-xl">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-emerald-500" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-amber-950 mb-2">Enquiry Sent!</h3>
                <p className="text-amber-800/70">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-amber-800/60 ml-1">Full Name</label>
                    <input required name="name" type="text" className="w-full bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-amber-800/60 ml-1">Phone Number</label>
                    <input required name="phone" type="tel" className="w-full bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-amber-800/60 ml-1">Email Address</label>
                    <input required name="email" type="email" className="w-full bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-amber-800/60 ml-1">Approximate Guests</label>
                    <input required name="guests" type="number" placeholder="e.g. 200" className="w-full bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-amber-800/60 ml-1">Event Type</label>
                  <select name="event_type" className="w-full bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                    <option className="bg-white">Wedding</option>
                    <option className="bg-white">Birthday</option>
                    <option className="bg-white">Corporate Event</option>
                    <option className="bg-white">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-amber-800/60 ml-1">Delivery Address</label>
                  <textarea required name="address" rows={3} placeholder="Enter your full address..." className="w-full bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/50"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-amber-800/60 ml-1">Your Message</label>
                  <textarea required name="message" rows={4} className="w-full bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/50"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-600/20">
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
  const [selectedLocation, setSelectedLocation] = useState<string>('Delhi');
  const upiId = "9650254164@kotak";

  const locations = ['Delhi', 'Noida', 'Faridabad'];
  
  const isNonVeg = planType === 'Non-Veg';
  const isEgg = planType === 'Egg';
  const themeColor = isNonVeg ? 'red' : isEgg ? 'yellow' : 'emerald';
  const themeHex = isNonVeg ? '#ef4444' : isEgg ? '#eab308' : '#10b981';

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
  const upiLink = `upi://pay?pa=${upiId}&pn=Mithila%20Catering%20And%20Decoration%20Service&am=${total}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] overflow-y-auto bg-amber-950/40 backdrop-blur-md">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-amber-50 border border-amber-200 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden"
            >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-amber-800 hover:text-amber-950 transition-colors"
            >
              <X size={24} />
            </button>

            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600`}></div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-amber-950 mb-1">Customize Your Plan</h3>
            <p className={`text-amber-600 text-sm font-medium mb-4 sm:mb-6`}>{planType} Service</p>
            
            <div className="space-y-3 mb-6">
              <div className="text-xs text-amber-800/60 mb-1 font-medium uppercase tracking-wider">Select Delivery Location (Mandatory)</div>
              <div className="grid grid-cols-3 gap-2">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`py-2 px-1 rounded-xl border text-[10px] font-bold transition-all ${
                      selectedLocation === loc
                        ? `bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-600/20`
                        : 'bg-white border-amber-200 text-amber-800 hover:border-amber-400'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <div className="text-xs text-amber-800/60 mb-1 font-medium uppercase tracking-wider">Select Meals (Add to Cart)</div>
              {meals.map((meal) => (
                <button
                  key={meal.id}
                  onClick={() => toggleMeal(meal.id)}
                  className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${
                    selectedMeals.includes(meal.id)
                      ? `bg-amber-100 border-amber-500 text-amber-950`
                      : 'bg-white border-amber-200 text-amber-800 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${selectedMeals.includes(meal.id) ? `text-amber-600` : 'text-amber-400'}`}>
                      {meal.icon}
                    </div>
                    <span className="font-bold">{meal.label}</span>
                  </div>
                  {selectedMeals.includes(meal.id) ? (
                    <div className={`bg-amber-600 rounded-full p-1`}>
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-amber-200"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-amber-100/50 rounded-2xl p-4 mb-8 space-y-2">
              <div className="flex justify-between text-sm text-amber-800">
                <span>Subtotal ({selectedMeals.length} meals)</span>
                <span>₹{basePrice * selectedMeals.length}</span>
              </div>
              <div className={`flex justify-between text-sm text-amber-600`}>
                <span>Discount ({getDiscount()}%)</span>
                <span>-₹{Math.round((basePrice * selectedMeals.length * getDiscount()) / 100)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-amber-950 pt-2 border-t border-amber-200">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-3xl mb-4 sm:mb-6 inline-block shadow-xl shadow-amber-500/10">
              <img 
                src={qrCodeUrl} 
                alt="UPI QR Code" 
                className="w-40 h-40 sm:w-56 sm:h-56"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 mb-6 sm:mb-8">
              <div className="bg-white border border-amber-200 rounded-2xl p-4">
                <div className="text-xs text-amber-800/60 uppercase tracking-widest mb-1">UPI ID</div>
                <div className="text-amber-950 font-mono font-bold text-lg">{upiId}</div>
              </div>
            </div>

            <div className={`bg-amber-100 border border-amber-200 rounded-2xl p-4 mb-6 sm:mb-8`}>
              <p className={`text-amber-800 text-xs font-medium`}>
                ⚠️ After payment of ₹{total}, please share the screenshot and your delivery address in <span className="text-amber-950 font-bold underline">{selectedLocation}</span> on WhatsApp to activate your service.
              </p>
            </div>

            <div className="bg-white border border-amber-200 rounded-2xl p-4 mb-6 sm:mb-8 text-left">
              <h4 className="text-amber-950 text-xs font-bold uppercase tracking-widest mb-3">Delivery Timings</h4>
              <ul className="space-y-2 text-xs text-amber-800">
                <li className="flex justify-between"><span>Breakfast:</span> <span className="text-amber-950">07:00 AM - 10:00 AM</span></li>
                <li className="flex justify-between"><span>Lunch:</span> <span className="text-amber-950">12:00 PM - 03:00 PM</span></li>
                <li className="flex justify-between"><span>Dinner:</span> <span className="text-amber-950">05:30 PM - 10:00 PM</span></li>
              </ul>
              <p className="mt-3 text-[10px] text-amber-600/70 italic">
                * Note: Breakfast may be delivered slightly late; Dinner is delivered early.
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-4 bg-white hover:bg-amber-50 text-amber-950 rounded-xl font-bold transition-all border border-amber-200"
              >
                Back
              </button>
              <a
                href="https://wa.link/a8re98"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[2] py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20"
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

const DietaryMark = ({ type }: { type: 'veg' | 'non-veg' | 'egg' }) => {
  const colors = {
    veg: 'border-emerald-500',
    'non-veg': 'border-amber-500',
    egg: 'border-yellow-500'
  };
  const dotColors = {
    veg: 'bg-emerald-500',
    'non-veg': 'bg-amber-500',
    egg: 'bg-yellow-500'
  };

  return (
    <div className={`w-5 h-5 border-2 ${colors[type]} flex items-center justify-center rounded-sm p-[2px] bg-white/5`}>
      <div className={`w-full h-full rounded-full ${dotColors[type]}`} />
    </div>
  );
};

const TiffinPage = ({ onBack }: { onBack: () => void }) => {
  const [subscriptionConfig, setSubscriptionConfig] = useState<{ type: string, basePrice: number } | null>(null);
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg' | 'egg'>('all');

  const plans = [
    {
      id: 'veg',
      type: 'Vegetarian',
      category: 'veg',
      mark: 'veg' as const,
      price: 2700,
      popular: false,
      features: [
        '4 Roti + Rice + Dal + Sabji',
        'Fresh Salad Included',
        'Sweet/Raita (Weekdays)',
        'Daily Menu Change (Dal & Sabji)',
        'Guaranteed On-time Delivery'
      ],
      color: 'bg-white border-amber-200',
      btnColor: 'bg-amber-600 text-white hover:bg-amber-700'
    },
    {
      id: 'egg',
      type: 'Egg',
      category: 'egg',
      mark: 'egg' as const,
      price: 2999,
      popular: false,
      features: [
        '4 Roti + Rice + Dal + Egg Curry/Sabji',
        'Fresh Salad Included',
        'Sweet/Raita (Weekdays)',
        'Daily Menu Change',
        'Guaranteed On-time Delivery'
      ],
      color: 'bg-amber-50 border-amber-300',
      btnColor: 'bg-amber-600 text-white hover:bg-amber-700'
    },
    {
      id: 'non-veg',
      type: 'Non-Veg',
      category: 'non-veg',
      mark: 'non-veg' as const,
      price: 3199,
      popular: true,
      features: [
        '4 Roti + Rice + Dal + Non-Veg Sabji',
        'Fresh Salad Included',
        'Sweet/Raita (Weekdays)',
        'Daily Menu Change',
        'Guaranteed On-time Delivery'
      ],
      color: 'bg-amber-100 border-amber-400',
      btnColor: 'bg-amber-600 text-white hover:bg-amber-700'
    }
  ];

  const filteredPlans = filter === 'all' ? plans : plans.filter(p => p.category === filter);

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="min-h-screen bg-amber-50 pt-32 pb-24">
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
          className="flex items-center gap-2 text-amber-600 hover:text-amber-950 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-600 text-sm font-medium mb-6">
            <Truck size={14} className="mr-2" /> Exclusive Service
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-amber-950 mb-6">Monthly Tiffin Service</h1>
          <p className="text-amber-800/70 max-w-2xl mx-auto text-lg mb-6">
            Healthy, hygienic, and home-style meals delivered on time. 
            Available exclusively in <span className="text-amber-950 font-bold">Delhi, Faridabad, and Noida</span>.
          </p>

          <div className="flex flex-col items-center gap-4 mb-10">
            <p className="text-amber-600/80 text-sm font-medium uppercase tracking-widest">We are also available on</p>
            <a 
              href="https://zomato.onelink.me/xqzv/2eh1vuyw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-amber-200 rounded-full hover:bg-amber-50 transition-all group shadow-sm"
            >
              <img 
                src="https://i.ibb.co/84NZ3GSF/zomato-logo-zomato-icon-transparent-free-png.webp" 
                alt="Zomato" 
                className="h-6 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-amber-950 font-bold">Order via Zomato</span>
            </a>
          </div>

          {/* Filters */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {[
              { id: 'all', label: 'All Plans' },
              { id: 'veg', label: 'Vegetarian' },
              { id: 'egg', label: 'Egg' },
              { id: 'non-veg', label: 'Non-Veg' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                  filter === f.id 
                    ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-600/20'
                    : 'bg-white border-amber-200 text-amber-800 hover:border-amber-400'
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
                className={`${plan.color} border rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden flex flex-col shadow-xl`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Utensils size={120} className="text-amber-950" />
                </div>
                <div className="relative z-10 flex-1">
                  {plan.popular && (
                    <div className="inline-block px-3 py-1 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Popular Choice</div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-amber-950">{plan.type} Plan</h3>
                    <DietaryMark type={plan.mark} />
                  </div>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-bold text-amber-950">₹{plan.price}</span>
                    <span className="text-amber-800/60">/ month</span>
                  </div>
                  
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-amber-900 text-sm">
                        <CheckCircle2 size={18} className="text-amber-600 mr-3 shrink-0" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10">
                  <button 
                    onClick={() => setSubscriptionConfig({ type: plan.type, basePrice: plan.price })}
                    className={`w-full py-4 ${plan.btnColor} rounded-2xl font-bold transition-colors shadow-lg shadow-amber-600/20`}
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-amber-200 text-center shadow-lg">
          <h4 className="text-amber-950 font-bold mb-6">Delivery Information</h4>
          <div className="grid sm:grid-cols-3 gap-6 text-amber-800/70 text-sm mb-8">
            <div className="flex flex-col items-center gap-2">
              <Clock size={16} className="text-amber-600" />
              <div className="font-bold text-amber-950">Breakfast</div>
              <div>07:00 AM - 10:00 AM</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock size={16} className="text-amber-600" />
              <div className="font-bold text-amber-950">Lunch</div>
              <div>12:00 PM - 03:00 PM</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock size={16} className="text-amber-600" />
              <div className="font-bold text-amber-950">Dinner</div>
              <div>05:30 PM - 10:00 PM</div>
            </div>
          </div>
          <p className="text-xs text-amber-600/70 italic mb-6">
            * Note: Breakfast delivery may be slightly late; Dinner is delivered early.
          </p>
          <div className="flex items-center justify-center gap-4 text-amber-800/60 text-sm pt-6 border-t border-amber-100">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> Delhi | Noida | Faridabad
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-950 mb-4">What Our Customers Say</h2>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={20} className="text-amber-500 fill-amber-500" />
              ))}
            </div>
            <p className="text-amber-600 text-sm mt-2 font-medium">4.9/5 Average Rating</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Rahul Sharma",
                location: "Delhi",
                text: "The food is truly home-like. No extra oil or spices, just perfect for daily consumption. Highly recommended!",
                rating: 5
              },
              {
                name: "Priya Singh",
                location: "Noida",
                text: "Best tiffin service in Noida. Their non-veg plan is a must-try! The flavors are authentic and fresh.",
                rating: 5
              },
              {
                name: "Amit Verma",
                location: "Faridabad",
                text: "Very punctual with delivery. The packaging is hygienic and the menu changes every day. Never gets boring.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-amber-200 p-6 rounded-3xl relative group hover:border-amber-500/30 transition-all shadow-md"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-amber-900/80 text-sm leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-amber-950 font-bold text-sm">{testimonial.name}</div>
                    <div className="text-amber-600/60 text-[10px] uppercase tracking-widest">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <footer className="bg-amber-950 border-t border-amber-900/20 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="https://i.ibb.co/gZJyvtVG/file-000000003bec71faa9b37e16b055cb49.png" 
              alt="Mithila Catering & Decoration Service Logo" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Mithila Catering & Decoration Service
            </div>
          </div>
          <p className="text-amber-200/60 max-w-sm mb-8">
            Professional event management and catering services since 2021. We bring high-quality service and authentic flavors to every event across India.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center text-amber-400 hover:bg-amber-600 hover:text-white transition-all">
              <Users size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center text-amber-400 hover:bg-amber-600 hover:text-white transition-all">
              <Phone size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center text-amber-400 hover:bg-amber-600 hover:text-white transition-all">
              <Mail size={18} />
            </a>
            <a href="https://zomato.onelink.me/xqzv/2eh1vuyw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center hover:bg-[#E23744] transition-all overflow-hidden p-2 group">
              <img 
                src="https://i.ibb.co/84NZ3GSF/zomato-logo-zomato-icon-transparent-free-png.webp" 
                alt="Zomato" 
                className="w-full h-full object-contain transition-all"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-amber-200/60 text-sm">
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('gallery'); }} className="hover:text-white transition-colors">Event Gallery</a></li>
            <li><a href="#planner" onClick={(e) => { e.preventDefault(); onNavigate('home'); setTimeout(() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white transition-colors">AI Planner</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-amber-200/60 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-amber-500" /> +91 9650254164
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-amber-500" /> ranjanjha2012@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-amber-500" /> Delhi NCR, India
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-amber-900/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-amber-200/40 text-xs uppercase tracking-widest">
          © 2026 Mithila Catering & Decoration Service. All Rights Reserved.
        </p>
        <p className="text-amber-200/40 text-xs uppercase tracking-widest">
          Designed by Walt Designs & Studio
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-amber-50 border border-amber-200 p-8 rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 border border-amber-200">
                <MapPin className="text-amber-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-amber-950 mb-2">Welcome to Mithila</h3>
              <p className="text-amber-800/70 mb-8">Please tell us your event location so we can serve you better.</p>
              
              <div className="w-full space-y-4">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your city/place..."
                  className="w-full bg-white border border-amber-200 rounded-xl py-4 px-6 text-amber-950 placeholder:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-600/20"
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
    className="fixed bottom-8 right-8 z-[90] bg-[#25D366] text-white p-3 rounded-full shadow-2xl flex items-center justify-center group border-2 border-white/20"
  >
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
      alt="WhatsApp" 
      className="w-8 h-8"
      referrerPolicy="no-referrer"
    />
    <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold whitespace-nowrap text-sm">
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
    <div className="min-h-screen bg-amber-50 font-sans selection:bg-amber-500/30">
      <WhatsAppButton />
      <LocationPopup />
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <Services />
            <VideoHighlights />
            <FeaturedGallery onNavigate={setCurrentPage} />
            <AIPlanner />
            <Contact />
          </>
        ) : currentPage === 'tiffin' ? (
          <TiffinPage onBack={() => setCurrentPage('home')} />
        ) : (
          <EventGallery onBack={() => setCurrentPage('home')} />
        )}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
