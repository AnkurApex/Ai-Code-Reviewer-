import { useState, useRef } from 'react';

const InputSection = ({ onSubmit, isLoading }) => {
  const [prUrl, setPrUrl] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const isValid = prUrl.trim().startsWith('https://github.com/') && prUrl.includes('/pull/');

  const handleSubmit = () => {
    if (prUrl.trim() && !isLoading) onSubmit(prUrl.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const examples = [
    'facebook/react/pull/31195',
    'vercel/next.js/pull/72000',
    'microsoft/vscode/pull/218000',
  ];

  const fillExample = (ex) => {
    setPrUrl(`https://github.com/${ex}`);
    inputRef.current?.focus();
  };

  return (
    <div className="animate-fadeinup" style={{ marginBottom: '32px' }}>
      {/* Hero text */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: '99px',
          padding: '5px 14px',
          marginBottom: '20px',
        }}>
          <span style={{ fontSize: '0.7rem', color: '#a5b4fc', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ✦ AI-Powered Analysis
          </span>
        </div>

        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          color: '#f1f5f9',
          marginBottom: '12px',
        }}>
          Review Your{' '}
          <span style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Pull Request
          </span>
          {' '}Instantly
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
          Paste any GitHub PR URL and get a comprehensive AI code review with bug detection, security analysis, and performance insights.
        </p>
      </div>

      {/* Input card */}
      <div style={{
        background: 'var(--bg-card)',
        border: `1px solid ${focused ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        boxShadow: focused ? '0 0 0 4px rgba(99,102,241,0.1), var(--shadow-card)' : 'var(--shadow-card)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}>
        {/* Input row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(0,0,0,0.3)',
          border: `1px solid ${focused ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '4px 4px 4px 16px',
          transition: 'border-color 0.2s',
        }}>
          {/* GitHub icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8" style={{ flexShrink: 0 }}>
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={prUrl}
            onChange={(e) => setPrUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="https://github.com/owner/repo/pull/123"
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f1f5f9',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-mono)',
              padding: '10px 0',
              minWidth: 0,
            }}
          />

          {/* Clear button */}
          {prUrl && !isLoading && (
            <button
              onClick={() => { setPrUrl(''); inputRef.current?.focus(); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '1rem',
                lineHeight: 1,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              ✕
            </button>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !prUrl.trim()}
            style={{
              padding: '10px 22px',
              background: isLoading || !prUrl.trim()
                ? 'rgba(99,102,241,0.3)'
                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: isLoading || !prUrl.trim() ? 'rgba(255,255,255,0.4)' : 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: isLoading || !prUrl.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              boxShadow: isLoading || !prUrl.trim() ? 'none' : '0 0 20px rgba(99,102,241,0.35)',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => {
              if (!isLoading && prUrl.trim()) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(99,102,241,0.5)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = isLoading || !prUrl.trim() ? 'none' : '0 0 20px rgba(99,102,241,0.35)';
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: 14, height: 14,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Analyzing…
              </>
            ) : (
              <>🔍 Review PR</>
            )}
          </button>
        </div>

        {/* Validation hint */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '12px',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
          }}>
            {prUrl && (
              isValid ? (
                <span style={{ color: '#10b981' }}>✓ Valid GitHub PR URL</span>
              ) : (
                <span style={{ color: '#f43f5e' }}>⚠ Must be github.com/.../pull/N</span>
              )
            )}
            {!prUrl && (
              <span style={{ color: 'var(--text-muted)' }}>Supports public GitHub repositories</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Try:</span>
            {examples.map(ex => (
              <button
                key={ex}
                onClick={() => fillExample(ex)}
                style={{
                  background: 'rgba(99,102,241,0.08)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  borderRadius: '6px',
                  padding: '2px 8px',
                  color: '#a5b4fc',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.18)';
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)';
                }}
              >
                {ex.split('/').slice(-3).join('/')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        marginTop: '24px',
        flexWrap: 'wrap',
      }}>
        {[
          { label: 'Bugs', icon: '🔴', desc: 'Detected' },
          { label: 'Security', icon: '🛡️', desc: 'Scanned' },
          { label: 'Performance', icon: '⚡', desc: 'Optimized' },
          { label: 'Score', icon: '📊', desc: '/ 100' },
        ].map(({ label, icon, desc }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', marginBottom: '2px' }}>{icon}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputSection;
