import React, { useEffect, useState } from 'react';
import './App.css';
import GithubProjects from './components/GithubProjects/GithubProjects';

const githubOwner = 'BryanDGuy'

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function getRepos() {
      try {
        const response = await fetch(`https://api.github.com/users/${githubOwner}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        setRepos(repos);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    }

    getRepos();
  }, []);

  // Smooth scrolling for navigation links
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Bryan Dougherty</span>
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}></span>
          </button>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#projects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Bryan</span>
            </h1>
            <h2 className="hero-subtitle">Engineering & Technology Leader</h2>
            <p className="hero-description">
              I architect robust backend systems, lead engineering teams, and drive technical excellence.
              Passionate about scalable infrastructure, system design, and building high-performance teams.
            </p>
            <div className="hero-skills">
              <div className="skills-grid">
                <span className="skill-tag">Team Leadership</span>
                <span className="skill-tag">System Architecture</span>
                <span className="skill-tag">High Performance</span>
                <span className="skill-tag">Database Design</span>
                <span className="skill-tag">API Development</span>
                <span className="skill-tag">Continuous Learning</span>
              </div>
            </div>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-avatar">
              <div className="avatar-placeholder">
                <span className="avatar-text">BD</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a seasoned engineering leader with deep expertise in backend systems, 
                distributed architecture, and team building. I specialize in designing 
                scalable solutions that power mission-critical applications and lead 
                engineering teams to deliver exceptional results.
              </p>
              <p>
                With nearly a decade of experience in software engineering, I've built and led 
                teams that have delivered complex systems serving millions of users. My approach 
                combines technical depth with collaboration to drive both innovation and 
                operational excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Public Repositories</h2>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading projects...</p>
            </div>
          ) : (
            <GithubProjects repos={repos}/>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Let's Work Together</h2>
          <div className="contact-content">
            <p className="contact-description">
              Looking to build scalable systems or help scale out new teams? Let's discuss how I can help drive your engineering success.
            </p>
            <div className="contact-links">
              <a href="https://github.com/BryanDGuy" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">📱</span>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/bryan-dougherty-2b5782141/" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">💼</span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Bryan Dougherty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
