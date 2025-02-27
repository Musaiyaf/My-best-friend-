import React, { useEffect, useState } from 'react';
import { Menu, X, Github as GitHub, Linkedin, Mail, ArrowRight, User, Code, Briefcase, Award, ChevronDown } from 'lucide-react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Handle scroll events for progress bar and active section
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
    setActiveSection(sectionId);
  };

  const projects = [
    {
      title: "Modern Web Application",
      description: "A responsive web application built with React and Node.js",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured online store with payment integration",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Next.js", "Stripe", "Tailwind CSS"]
    },
    {
      title: "Mobile Application",
      description: "Cross-platform mobile app for productivity",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      tags: ["React Native", "Firebase", "Redux"]
    }
  ];

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "HTML/CSS", level: 95 },
    { name: "UI/UX Design", level: 75 },
    { name: "TypeScript", level: 70 }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-white z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <header className="fixed w-full top-0 bg-black/80 backdrop-blur-md z-40 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            className={`text-2xl font-bold tracking-tighter cursor-pointer transition-all duration-500 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            onClick={() => scrollToSection('home')}
          >
            HAMAD<span className="text-gray-400">.</span>
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
                <li 
                  key={item}
                  className={`cursor-pointer relative overflow-hidden group ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms`, transition: 'all 0.5s ease' }}
                >
                  <span 
                    className={`capitalize transition-all duration-300 ${activeSection === item ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => scrollToSection(item)}
                  >
                    {item}
                  </span>
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${activeSection === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <ul className="container mx-auto px-4 py-4 space-y-4">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <li 
                key={item}
                className="border-b border-gray-800 pb-2"
              >
                <span 
                  className={`block capitalize py-2 transition-all duration-300 ${activeSection === item ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => scrollToSection(item)}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section 
          id="home" 
          className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(50,50,50,0.3)_0,_rgba(0,0,0,0.8)_70%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 
                className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              >
                Hi, I'm <span className="text-white">Hamad</span>
              </h1>
              <p 
                className={`text-xl md:text-2xl text-gray-300 mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              >
                A passionate developer creating elegant digital experiences
              </p>
              <div 
                className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              >
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center justify-center group"
                >
                  View My Work
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-zinc-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center relative">
              About Me
              <span className="block w-20 h-1 bg-white mx-auto mt-4"></span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-white/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Hamad" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <User className="text-gray-400" size={24} />
                  <h3 className="text-2xl font-semibold">Who am I?</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  I'm a passionate web developer with a keen eye for design and a love for creating seamless user experiences. With a background in both front-end and back-end development, I bring a holistic approach to every project I undertake.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  My journey in web development began 5 years ago, and since then, I've been constantly learning and adapting to new technologies and methodologies. I believe in writing clean, maintainable code and creating intuitive interfaces that users love.
                </p>
                
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="border border-gray-700 p-4 rounded-lg hover:border-white transition-colors duration-300">
                    <h4 className="font-semibold mb-2">Education</h4>
                    <p className="text-gray-400">BSc in Computer Science</p>
                  </div>
                  <div className="border border-gray-700 p-4 rounded-lg hover:border-white transition-colors duration-300">
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <p className="text-gray-400">5+ Years in Web Development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center relative">
              My Skills
              <span className="block w-20 h-1 bg-white mx-auto mt-4"></span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Code className="text-gray-400" size={24} />
                  <h3 className="text-2xl font-semibold">Technical Expertise</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  I specialize in building modern web applications using the latest technologies and frameworks. My approach focuses on creating responsive, accessible, and performant websites that provide exceptional user experiences.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Beyond coding, I'm passionate about UI/UX design principles and ensuring that the applications I build are not only functional but also aesthetically pleasing and intuitive to use.
                </p>
              </div>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-white h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: isLoaded ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-zinc-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center relative">
              My Projects
              <span className="block w-20 h-1 bg-white mx-auto mt-4"></span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.title}
                  className="group relative bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-white transition-all duration-500"
                  style={{ 
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-20">
                    <button className="px-6 py-2 bg-white text-black font-medium rounded-full transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      View Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center relative">
              Get In Touch
              <span className="block w-20 h-1 bg-white mx-auto mt-4"></span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <Mail className="text-gray-400" size={24} />
                  <h3 className="text-2xl font-semibold">Contact Me</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Feel free to reach out to me using the form or through my social media profiles.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400">Email</h4>
                      <p className="font-medium">hamad@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400">Availability</h4>
                      <p className="font-medium">Open to opportunities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400">Experience</h4>
                      <p className="font-medium">5+ Years</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                    <GitHub size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors duration-300"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors duration-300"
                    placeholder="Subject"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors duration-300 resize-none"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center group"
                >
                  Send Message
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-zinc-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} Hamad. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;