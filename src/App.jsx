import './index.css';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Instagram, Facebook, Music, Heart, Calendar, BookOpen, Users, ChevronRight, Send } from 'lucide-react';

/* --- COLOR THEME & ASSETS ---
  Primary: Sky Blue & Blue (Sky-400/Blue-500)
  Accent: Light Yellow (Yellow-300/400)
  Text: Dark Blue (Blue-900/Blue-800)
  Background: White / Sky-50
*/

const LeadershipData = [
  { name: "Suryan Saravanan", role: "THE GOAAATTTTTTTT", img: "/IMG_3684 (2) 2.jpg" },
  { name: "Charvi Vohra", role: "Founder", img: "/Charvi.jpeg" },
  { name: "Sahithi Vemula", role: "Co-Founder", img: "/Sahiti.JPG" },
  { name: "Nakshatra Vusthipalli", role: "Event Facilitator", img: "/Naksh.jpeg" },
  { name: "Vyshnavi Devarakonda", role: "Secretary", img: "/Vaish.jpeg" },
  { name: "Alivia Shang", role: "Co-fundraising, Event, and Client Data Manager", img: "/Alivia.jpeg" },
  { name: "Cecilio Hayashi", role: "Co-fundraising, Outreach, and Volunteer Manager", img: "/Cecilio.jpeg" },
  { name: "Gauri Parab", role: "Social Media Manager", img: "/Gauri.jpeg" },
  { name: "Kay Rudolph", role: "Expansion and Social Media Coordinator", img: null },
  
];

const EventData = [
  { 
    title: "Farmer’s Market", 
    date: "Upcoming this Saturday", 
    location: "Coppell Farmer's Market Pavilion",
    description: "Join us for a morning of live music and community engagement! We'll be sharing information about our tutoring programs." 
  }
];

// --- COMPONENTS ---

// 1. Floating Notes Animation Canvas
const MusicalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const notes = ['♪', '♫', '♬', '♭', '♮', '♯'];
    const particles = [];

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: notes[Math.floor(Math.random() * notes.length)],
        size: Math.random() * 20 + 20,
        speedY: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.font = `${p.size}px serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fillText(p.text, p.x, p.y);
        
        p.y -= p.speedY; // Move up
        
        // Reset if goes off top
        if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// 2. Scroll Animation Wrapper
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// 3. Navigation Bar
const Navbar = ({ activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', id: 'about' },
    { name: 'Leadership', id: 'leadership' },
    { name: 'Events', id: 'events' },
    { name: 'Lessons', id: 'lessons' },
    { name: 'Contact', id: 'contact' },
    { name: 'Donate', id: 'donate', isButton: true },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 shadow-lg backdrop-blur-sm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img 
              src="/logo.png" 
              alt="The Melody Project Logo" 
              className="w-10 h-10 mr-3 object-contain rounded-full" 
            />
            <span className={`font-bold text-xl tracking-tight ${scrolled ? 'text-blue-900' : 'text-white'}`}>
              The Melody Project
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className={`${
                  link.isButton
                    ? 'bg-yellow-300 hover:bg-yellow-400 text-blue-900 px-5 py-2 rounded-full font-bold shadow-md transition-all transform hover:scale-105'
                    : `text-sm font-medium hover:text-yellow-300 transition-colors ${scrolled ? 'text-blue-800' : 'text-sky-50'}`
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-blue-900' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white absolute w-full shadow-xl border-t border-sky-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  scrollToSection(link.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${
                  link.isButton 
                    ? 'text-blue-900 bg-yellow-300 font-bold' 
                    : 'text-blue-800 hover:text-sky-600 hover:bg-sky-50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  // Simple scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 font-sans text-blue-900 overflow-x-hidden">
      
      <Navbar scrollToSection={scrollToSection} />

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-400 to-blue-500 text-white overflow-hidden">
        <MusicalBackground />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <FadeInSection>
            <div className="w-24 h-24 mx-auto mb-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 shadow-2xl">
               <img 
                src="/logo.png" 
                alt="The Melody Project Logo" 
                className="w-full h-full object-contain rounded-full" 
              />
               <Music size={48} className="text-yellow-200" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-md">
              The Melody Project
            </h1>
            <p className="text-xl md:text-2xl text-sky-100 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              Harmonizing Community through Education & Mentorship
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('events')}
                className="px-8 py-4 bg-yellow-300 hover:bg-yellow-400 text-blue-900 rounded-full font-bold text-lg shadow-lg shadow-yellow-500/20 transition-all transform hover:scale-105"
              >
                View Events
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-bold text-lg transition-all"
              >
                Our Mission
              </button>
            </div>
          </FadeInSection>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
           <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
             <div className="w-1 h-3 bg-white rounded-full"></div>
           </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-100 rounded-full opacity-70 z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sky-100 rounded-full opacity-70 z-0"></div>
                <div className="relative z-10 bg-gradient-to-br from-sky-400 to-blue-500 p-1 rounded-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                   {/*placeholder for photo of students/mentors*/}
                   <div className="bg-blue-900 h-96 rounded-xl flex flex-col items-center justify-center text-white/50 p-8 text-center">
                      <Users size={64} className="mb-4 text-white/30" />
                      <img src="/IMG_0766.jpg" alt="Students and Mentors" className="w-full h-full object-cover rounded-lg" />
                   </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <span className="h-px w-12 bg-sky-500 mr-4"></span>
                  <span className="text-sky-600 font-bold uppercase tracking-wider text-sm">About Us</span>
                </div>
                <h2 className="text-4xl font-bold text-blue-900 mb-6">Empowering Young Musicians</h2>
                <p className="text-lg text-blue-800 leading-relaxed mb-6">
                  <span className="font-semibold text-sky-600">"The Melody Project"</span> is a nonprofit initiative dedicated to providing low-cost tutoring and mentorship to middle school students who play musical instruments.
                </p>
                <p className="text-lg text-blue-800 leading-relaxed mb-8">
                  The program connects experienced musicians and volunteers with young students to help them develop their musical skills, build confidence, and foster a lifelong appreciation for the arts. In alignment with its community-focused mission, <span className="font-medium text-blue-900">all proceeds generated through The Melody Project will be donated to the Coppell Special Education Foundation</span>, supporting the educational programs and initiatives within Coppell ISD.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-sky-50 rounded-lg border-l-4 border-sky-400">
                    <h4 className="font-bold text-xl text-blue-900 mb-1">Mentorship</h4>
                    <p className="text-sm text-blue-700">Connecting generations</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <h4 className="font-bold text-xl text-blue-900 mb-1">Community</h4>
                    <p className="text-sm text-blue-700">Supporting Coppell ISD</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section id="leadership" className="py-24 px-4 bg-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeInSection>
              <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Leadership</h2>
              <p className="text-lg text-blue-800">Meet the passionate team driving our mission forward.</p>
            </FadeInSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {LeadershipData.map((leader, index) => (
              <FadeInSection key={index} delay={index * 100}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-sky-100">
                  <div className="h-64 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                    {/* Placeholder for Headshots */}
                    {leader.img ? (
                      <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-blue-300 flex flex-col items-center">
                         <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mb-2">
                            <span className="text-3xl font-bold text-sky-400">{leader.name.charAt(0)}</span>
                         </div>
                         <span className="text-sm font-medium">Photo Coming Soon</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-sky-900/0 group-hover:bg-sky-900/20 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-1 group-hover:text-sky-600 transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-sky-600 font-medium text-sm mb-3">{leader.role}</p>
                    
                    {/* Social icons placeholder */}
                    <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="text-blue-400 hover:text-sky-600"><Instagram size={18} /></button>
                      <button className="text-blue-400 hover:text-blue-700"><Facebook size={18} /></button>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS & LESSONS SPLIT */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          
          {/* Events Column */}
          <div id="events" className="relative">
             <FadeInSection>
              <div className="bg-sky-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden h-full">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <Calendar className="w-8 h-8 text-yellow-300 mr-3" />
                    <h2 className="text-3xl font-bold">Upcoming Events</h2>
                  </div>

                  <div className="space-y-6">
                    {EventData.map((event, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white">{event.title}</h3>
                          <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Next Up</span>
                        </div>
                        <p className="text-sky-100 text-sm mb-3 flex items-center">
                          <span className="mr-3">{event.date}</span> • <span className="ml-3">{event.location}</span>
                        </p>
                        <p className="text-white text-sm mb-4">{event.description}</p>
                        <button className="w-full py-2 bg-white text-sky-700 rounded-lg font-bold text-sm hover:bg-sky-50 transition-colors">
                          Register / Interest Form
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Lessons Column */}
          <div id="lessons" className="flex flex-col justify-center">
            <FadeInSection delay={200}>
              <div className="mb-6 inline-flex items-center justify-center p-3 bg-yellow-100 rounded-xl text-yellow-700">
                <BookOpen size={24} />
              </div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Private Lessons & Programs</h2>
              <p className="text-lg text-blue-800 mb-6">
                Looking to sharpen your skills? We accept private lesson students year-round! Our mentors are dedicated to helping you achieve your musical goals at an affordable rate.
              </p>
              
              <ul className="space-y-4 mb-8">
                {['One-on-one Mentorship', 'Instrument Specific Training', 'Flexible Scheduling', 'Performance Opportunities'].map((item, i) => (
                  <li key={i} className="flex items-center text-blue-800">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-xs">✓</div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="p-6 bg-sky-50 rounded-xl border border-sky-100 mb-8">
                <h4 className="font-bold text-blue-900 mb-2">Interested in learning?</h4>
                <p className="text-sm text-blue-700 mb-4">Contact us anytime to get matched with a mentor.</p>
                <button onClick={() => scrollToSection('contact')} className="flex items-center font-bold text-sky-600 hover:text-sky-700">
                  Get in touch <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </FadeInSection>
          </div>

        </div>
      </section>

      {/* DONATE SECTION */}
      <section id="donate" className="py-20 px-4 bg-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeInSection>
            <Heart className="w-16 h-16 text-red-400 mx-auto mb-6 fill-current animate-pulse" />
            <h2 className="text-4xl font-bold mb-6">Support Our Mission</h2>
            <p className="text-xl text-sky-100 mb-8">
              Your donations directly support the Coppell Special Education Foundation and help us keep our programs accessible.
            </p>
            <div className="bg-white/5 backdrop-blur-sm border border-dashed border-sky-400/30 rounded-xl p-8 max-w-lg mx-auto">
               <p className="text-yellow-300 font-bold mb-2">Donation System Coming Soon</p>
               <p className="text-sm text-sky-200">We are currently setting up our secure payment portal. In the meantime, please contact us if you wish to contribute!</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-4 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-5 border border-sky-100">
              
              {/* Contact Info Side */}
              <div className="md:col-span-2 bg-gradient-to-br from-sky-500 to-blue-600 p-10 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                  <p className="text-sky-100 mb-8">Have questions about lessons, events, or volunteering? We'd love to hear from you.</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="w-6 h-6 text-yellow-300 mr-4 mt-1" />
                      <div>
                        <p className="text-xs text-sky-200 uppercase font-bold tracking-wider mb-1">Email</p>
                        <p className="font-medium">themelodyproject.np@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-sm text-sky-200 mb-4">Follow us</p>
                  <div className="flex space-x-4">
                    <a href="https://www.instagram.com/themelodyproject.nonprofit/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Instagram size={20} />
                    </a>
                    <a href="https://www.facebook.com/share/1M9JD9c83d/?mibextid=wwXIfr" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Facebook size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="md:col-span-3 p-10">
                <form 
  action="mailto:themelodyproject.np@gmail.com" 
  method="POST" 
  enctype="text/plain" 
  className="space-y-6"
>
  {/* ... your input fields stay the same ... */}
  
  <button type="submit" className="w-full py-4 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center justify-center shadow-lg">
    Send Message <Send size={18} className="ml-2" />
  </button>
</form>
              </div>

            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-sky-200 py-12 border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex items-center">
             <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white mr-3">
               <Music size={14} />
             </div>
             <span className="text-white font-bold">The Melody Project</span>
          </div>
          <div className="text-sm text-center md:text-right">
            <p className="mb-2">&copy; {new Date().getFullYear()} The Melody Project. All rights reserved.</p>
            <p>Designed with <Heart size={12} className="inline text-red-400 mx-1" /> for the community.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}