import React, { useState, useEffect } from 'react';
import './App.css';
import pp from './pp.jpg';
import { cvData } from './data/cvData';
import ParticleNetwork from './components/ParticleNetwork';
import TelemetryWidget from './components/TelemetryWidget';
import ProjectModal from './components/ProjectModal';

function App() {
  const [lang, setLang] = useState('tr'); // 'tr' | 'en'
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = cvData[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(contactForm.subject || 'Hikmet Alanlı CV İletişim');
    const mailBody = encodeURIComponent(
      `Gönderen: ${contactForm.name} (${contactForm.email})\n\nMesaj:\n${contactForm.message}`
    );
    window.location.href = `mailto:halanli025@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const filteredProjects = activeCategory === 'all'
    ? t.projects.items
    : t.projects.items.filter(p => p.category === activeCategory);

  return (
    <div className="app-root">
      {/* Interactive Constellation / Particle Backdrop */}
      <ParticleNetwork />

      {/* Glassmorphic Navbar */}
      <header className={`site-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#hero" className="brand-logo">
            <span className="logo-bracket">[</span>
            <span className="logo-name">HIKMET.DEV</span>
            <span className="logo-bracket">]</span>
          </a>

          <nav className="nav-links">
            <a href="#about">{t.nav.about}</a>
            <a href="#telemetry">Simülatör</a>
            <a href="#experience">{t.nav.experience}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#skills">{t.nav.skills}</a>
            <a href="#education">{t.nav.education}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="nav-actions">
            {/* Language Switcher */}
            <div className="lang-toggle-group">
              <button
                type="button"
                className={`lang-btn ${lang === 'tr' ? 'active' : ''}`}
                onClick={() => setLang('tr')}
                title="Türkçe"
              >
                TR
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Direct CV Download Link */}
            <a
              href={`${process.env.PUBLIC_URL || ''}/cv.pdf`}
              download="Hikmet_Alanli_CV.pdf"
              className="btn-nav-cv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{t.hero.actions.downloadCv}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* HERO SECTION */}
        <section id="hero" className="hero-section">
          <div className="hero-grid">
            <div className="hero-text-col">
              <h1 className="hero-title">
                {t.hero.name}
              </h1>

              <div className="hero-role-badge">
                <span className="role-cyan">{t.hero.title}</span>
              </div>

              <p className="hero-subheading font-mono">
                {t.hero.subheading}
              </p>

              <p className="hero-bio">
                {t.hero.bio}
              </p>

              {/* Action Buttons */}
              <div className="hero-cta-row">
                <a href="#projects" className="btn-primary">
                  <span>{t.hero.actions.projects}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>

                <a href="#experience" className="btn-secondary">
                  <span>{t.hero.actions.experience}</span>
                </a>

                <a href="#contact" className="btn-outline">
                  <span>{t.hero.actions.contact}</span>
                </a>

                <a
                  href={`${process.env.PUBLIC_URL || ''}/cv.pdf`}
                  download="Hikmet_Alanli_CV.pdf"
                  className="btn-outline cv-btn-accent"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>{t.hero.actions.downloadCv}</span>
                </a>
              </div>
            </div>

            {/* Profile Picture with Cyber Radar Halo */}
            <div className="hero-avatar-col" id="about">
              <div className="avatar-frame-wrap">
                <div className="cyber-ring ring-outer"></div>
                <div className="cyber-ring ring-inner"></div>
                <div className="cyber-scanner-line"></div>
                <div className="avatar-img-container">
                  <img
                    src={pp}
                    alt="Hikmet Alanlı"
                    className="hero-avatar-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TELEMETRY & SITL SIMULATOR */}
        <section id="telemetry" className="section-block">
          <TelemetryWidget lang={lang} data={t} />
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="section-block">
          <div className="section-header">
            <span className="section-eyebrow font-mono">{"// TIMELINE"}</span>
            <h2 className="section-title">{t.experience.title}</h2>
            <p className="section-subtitle">{t.experience.subtitle}</p>
          </div>

          <div className="experience-timeline">
            {t.experience.items.map((item, index) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-line"></div>
                </div>

                <div className="timeline-card">
                  <div className="card-top-bar">
                    <div className="company-info">
                      <span className="badge-type">{item.type}</span>
                      <h3 className="company-name">{item.company}</h3>
                      <h4 className="role-title">{item.role}</h4>
                    </div>

                    <div className="period-location font-mono">
                      <span className="period-badge">📅 {item.period}</span>
                      <span className="loc-badge">📍 {item.location}</span>
                    </div>
                  </div>

                  <ul className="highlights-list">
                    {item.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="bullet-arrow">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="tech-chips-row">
                    {item.technologies.map(tech => (
                      <span key={tech} className="tech-chip font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section id="projects" className="section-block">
          <div className="section-header">
            <span className="section-eyebrow font-mono">{"// SHOWCASE"}</span>
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="section-subtitle">{t.projects.subtitle}</p>

            {/* Filter Pills */}
            <div className="filter-pills-row">
              {t.projects.categories.map(cat => (
                <button
                  key={cat.key}
                  type="button"
                  className={`filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid">
            {filteredProjects.map(proj => (
              <div
                key={proj.id}
                className="project-card"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="proj-card-glow"></div>
                <div className="proj-card-header">
                  <span className="proj-badge">{proj.badge}</span>
                  <span className="proj-cat font-mono">{proj.category}</span>
                </div>

                <h3 className="proj-title">{proj.title}</h3>
                <p className="proj-short-desc">{proj.shortDesc}</p>

                <div className="proj-tags-list">
                  {proj.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="tag-pill font-mono">{tag}</span>
                  ))}
                  {proj.tags.length > 4 && (
                    <span className="tag-pill font-mono">+{proj.tags.length - 4}</span>
                  )}
                </div>

                <div className="proj-card-footer">
                  <span className="btn-read-more">
                    {lang === 'tr' ? 'Detayları İncele' : 'View Architecture'}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="proj-arrow font-mono">↗</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS MATRIX */}
        <section id="skills" className="section-block">
          <div className="section-header">
            <span className="section-eyebrow font-mono">{"// CAPABILITIES"}</span>
            <h2 className="section-title">{t.skills.title}</h2>
            <p className="section-subtitle">{t.skills.subtitle}</p>
          </div>

          <div className="skills-category-grid">
            {t.skills.categories.map(cat => (
              <div key={cat.id} className="skill-category-card">
                <div className="category-header">
                  <h3 className="category-title">{cat.title}</h3>
                  <p className="category-desc">{cat.description}</p>
                </div>

                <div className="skill-bars-list">
                  {cat.skills.map(sk => (
                    <div key={sk.name} className="skill-bar-item">
                      <div className="skill-info-row">
                        <span className="skill-name">{sk.name}</span>
                        <span className="skill-tag-badge font-mono">{sk.tag}</span>
                      </div>
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: `${sk.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & REFERENCES */}
        <section id="education" className="section-block">
          <div className="section-header">
            <span className="section-eyebrow font-mono">{"// CREDENTIALS"}</span>
            <h2 className="section-title">{t.education.title}</h2>
            <p className="section-subtitle">{t.education.subtitle}</p>
          </div>

          <div className="credentials-grid">
            {/* University Card */}
            <div className="credential-card uni-card">
              <div className="cred-badge font-mono">AKADEMİK EĞİTİM</div>
              <h3 className="cred-title">{t.education.university.name}</h3>
              <h4 className="cred-sub">{t.education.university.degree}</h4>
              <div className="cred-meta font-mono">
                <span>📍 {t.education.university.location}</span>
                <span>📅 {t.education.university.period}</span>
                <span className="gpa-pill">{t.education.university.gpa}</span>
              </div>
              <p className="cred-note">
                ⚡ {t.education.university.note}
              </p>
            </div>

            {/* Official Reference Card */}
            <div className="credential-card ref-card">
              <div className="cred-badge font-mono badge-purple">{t.education.reference.title}</div>
              <h3 className="cred-title">{t.education.reference.name}</h3>
              <h4 className="cred-sub">{t.education.reference.role}</h4>
              <p className="ref-company font-mono">{t.education.reference.company}</p>

              <div className="ref-contact-links">
                <a href={`mailto:${t.education.reference.email}`} className="ref-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>{t.education.reference.email}</span>
                </a>
                <a href={`tel:${t.education.reference.phone.replace(/\s+/g, '')}`} className="ref-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{t.education.reference.phone}</span>
                </a>
              </div>
            </div>

            {/* Languages Card */}
            <div className="credential-card lang-card">
              <div className="cred-badge font-mono badge-emerald">DİL YETKİNLİKLERİ</div>
              <div className="languages-list">
                {t.education.languages.map((l, idx) => (
                  <div key={idx} className="lang-item">
                    <div className="lang-header">
                      <span className="lang-name">{l.name}</span>
                      <span className="lang-level font-mono">{l.level}</span>
                    </div>
                    <span className="lang-badge font-mono">{l.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section-block">
          <div className="section-header">
            <span className="section-eyebrow font-mono">{"// CONNECT"}</span>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-subtitle">{t.contact.subtitle}</p>
          </div>

          <div className="contact-grid">
            {/* Quick Details & Socials */}
            <div className="contact-info-col">
              <div className="contact-tile">
                <div className="tile-icon">📧</div>
                <div className="tile-content">
                  <span className="tile-label">{lang === 'tr' ? 'E-Posta Adresi' : 'Email Address'}</span>
                  <a href={`mailto:${t.contact.email}`} className="tile-link font-mono">{t.contact.email}</a>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyToClipboard(t.contact.email, 'email')}
                  title="Kopyala"
                >
                  {copiedField === 'email' ? '✓' : '❐'}
                </button>
              </div>

              <div className="contact-tile">
                <div className="tile-icon">📱</div>
                <div className="tile-content">
                  <span className="tile-label">{lang === 'tr' ? 'Telefon' : 'Phone'}</span>
                  <a href={`tel:${t.contact.phone.replace(/\s+/g, '')}`} className="tile-link font-mono">{t.contact.phone}</a>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyToClipboard(t.contact.phone, 'phone')}
                  title="Kopyala"
                >
                  {copiedField === 'phone' ? '✓' : '❐'}
                </button>
              </div>

              <div className="contact-tile">
                <div className="tile-icon">📍</div>
                <div className="tile-content">
                  <span className="tile-label">{lang === 'tr' ? 'Konum' : 'Location'}</span>
                  <span className="tile-text font-mono">{t.contact.location}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="social-links-grid">
                <a
                  href={t.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.68 5.41-5.24 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href={t.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn linkedin-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="contact-form-col">
              <form onSubmit={handleFormSubmit} className="contact-form">
                <h3 className="form-heading">{t.contact.formTitle}</h3>

                <div className="form-group">
                  <input
                    type="text"
                    required
                    placeholder={t.contact.formNamePlaceholder}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    required
                    placeholder={t.contact.formEmailPlaceholder}
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    required
                    placeholder={t.contact.formSubjectPlaceholder}
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    rows={4}
                    required
                    placeholder={t.contact.formMessagePlaceholder}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="form-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                  <span>{t.contact.formSubmit}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>

                {formSent && (
                  <div className="form-alert-success font-mono">
                    ✓ E-posta istemciniz açılıyor... Teşekkürler!
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-left">
            <span className="footer-logo font-mono">HIKMET ALANLI</span>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>
          <div className="footer-right font-mono">
            <span>{t.footer.rights}</span>
          </div>
        </div>
      </footer>

      {/* EXPANDED PROJECT MODAL */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          lang={lang}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;
