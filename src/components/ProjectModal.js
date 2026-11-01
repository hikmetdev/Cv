import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose, lang }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Kapat"
        >
          ✕
        </button>

        <div className="modal-badge-row">
          <span className="modal-pill">{project.badge}</span>
          <span className="modal-category font-mono">SYS_CAT // {project.category.toUpperCase()}</span>
        </div>

        <h3 className="modal-title">{project.title}</h3>

        <div className="modal-desc-section">
          <h4 className="modal-section-title">
            {lang === 'tr' ? 'Sistem Mimarisi & Proje Kapsamı' : 'System Architecture & Scope'}
          </h4>
          <p className="modal-body-text">{project.fullDesc}</p>
        </div>

        {project.keyFeatures && (
          <div className="modal-features-section">
            <h4 className="modal-section-title">
              {lang === 'tr' ? 'Öne Çıkan Mühendislik Kazanımları' : 'Key Engineering Highlights'}
            </h4>
            <ul className="modal-features-list">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx}>
                  <span className="feat-check">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="modal-tags-section">
          <h4 className="modal-section-title">
            {lang === 'tr' ? 'Kullanılan Teknolojiler & Araçlar' : 'Technologies & Stack'}
          </h4>
          <div className="modal-tags-grid">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.68 5.41-5.24 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
              </svg>
              <span>{lang === 'tr' ? 'GitHub Reposunu Görüntüle' : 'View on GitHub'}</span>
            </a>
          )}
          <button type="button" className="btn-modal-close" onClick={onClose}>
            {lang === 'tr' ? 'Kapat' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
