'use client';

import { useState } from 'react';
import { Button } from '@ideasui/react';
import styles from './page.module.scss';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      className={theme === 'dark' ? 'dark' : ''}
      style={{ display: 'contents' }}
      data-ideasui-theme={theme}
    >
      {/* Navbar Header */}
      <header className="app-header">
        <div className="header-container">
          <div className="brand-logo-section">
            <div className="logo-box">💡</div>
            <div>
              <span className="brand-title">IdeasUI</span>
              <span className="brand-badge">Boilerplate</span>
            </div>
          </div>

          <div className="header-nav">
            <nav className="nav-links">
              <span className="active-link">Dashboard</span>
            </nav>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 4.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className={styles.mainContainer}>
        {/* Hero Banner */}
        <section className={styles.heroSection}>
          <h1 className={styles.gradientText}>Welcome to your IdeasUI App</h1>
          <p>
            A premium, high-performance starter template configured with standalone CSS, Tailwind
            design tokens, and CSS modules.
          </p>
        </section>

        {/* Dashboard Preview Section */}
        <section className={styles.dashboardSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.badge}>Quick Start</div>
              <h2>Getting Started Guide</h2>
            </div>

            <div className={styles.cardBody}>
              <p>
                {`This boilerplate is pre-configured with the full IdeasUI styling system. Here's how
                to begin building your app:`}
              </p>

              <ul className={styles.stepsList}>
                <li>
                  <span className={styles.stepNumber}>1</span>
                  <div>
                    <strong>Modify layout or content</strong>
                    <p>
                      Open and edit <code>app/page.tsx</code> to customize this landing page.
                    </p>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNumber}>2</span>
                  <div>
                    <strong>Define global styles</strong>
                    <p>
                      Customize typography and base components in <code>app/globals.scss</code>.
                    </p>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNumber}>3</span>
                  <div>
                    <strong>Use IdeasUI Components</strong>
                    <p>
                      Import components like <code>Button</code> directly from package workspace
                      dependencies.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.cardFooter}>
              <Button
                id="action-btn"
                variant="solid"
                color="primary"
                onClick={() => alert('Welcome to IdeasUI!')}
              >
                Explore Docs
              </Button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.badgeSuccess}>Features</div>
              <h2>Design System Tokens</h2>
            </div>

            <div className={styles.cardBody}>
              <p>
                Enjoy access to rich styling tokens natively integrated with CSS variables. Toggle
                light and dark modes to see colors and elevations adapt seamlessly.
              </p>

              <div className={styles.tokensDemoGrid}>
                <div className={styles.tokenItem}>
                  <span className={styles.tokenColorPrimary} />
                  <div>
                    <strong>Primary Color</strong>
                    <code>oklch(var(--ideasui-color-primary))</code>
                  </div>
                </div>
                <div className={styles.tokenItem}>
                  <span className={styles.tokenColorSecondary} />
                  <div>
                    <strong>Secondary Color</strong>
                    <code>oklch(var(--ideasui-color-secondary))</code>
                  </div>
                </div>
                <div className={styles.tokenItem}>
                  <span className={styles.tokenColorSuccess} />
                  <div>
                    <strong>Success Color</strong>
                    <code>oklch(var(--ideasui-color-success))</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <p>© 2026 IdeasUI. Built with React 19, Next.js 16, and SCSS.</p>
        </div>
      </footer>
    </div>
  );
}
