import { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import LoadingSpinner from './components/LoadingSpinner';
import ScoreCard from './components/ScoreCard';
import ReviewCard from './components/ReviewCard';
import SummaryBox from './components/SummaryBox';
import CopyButton from './components/CopyButton';
import FileTree from './components/FileTree';
import ReviewHistory, { saveToHistory } from './components/ReviewHistory';
import { getCodeReview } from './services/api';



// ── Decorative background grid ──────────────────────────────────────────────
const GridBg = () => (
  <div style={{
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  }}>
    {/* Dot grid */}
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(rgba(99,102,241,0.12) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
    }} />
    {/* Top-left glow */}
    <div style={{
      position: 'absolute',
      top: -200,
      left: -200,
      width: 600,
      height: 600,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
    }} />
    {/* Bottom-right glow */}
    <div style={{
      position: 'absolute',
      bottom: -200,
      right: -100,
      width: 500,
      height: 500,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
    }} />
  </div>
);

// ── Error Banner ──────────────────────────────────────────────────────────────
const ErrorBanner = ({ error, onDismiss }) => (
  <div className="animate-fadeinup" style={{
    background: 'rgba(244,63,94,0.08)',
    border: '1px solid rgba(244,63,94,0.3)',
    borderRadius: 'var(--radius-lg)',
    padding: '16px 20px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
  }}>
    <div style={{
      width: 36,
      height: 36,
      borderRadius: '10px',
      background: 'rgba(244,63,94,0.15)',
      border: '1px solid rgba(244,63,94,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      flexShrink: 0,
    }}>❌</div>
    <div style={{ flex: 1 }}>
      <p style={{ color: '#f43f5e', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px' }}>
        Analysis Failed
      </p>
      <p style={{ color: 'rgba(244,63,94,0.8)', fontSize: '0.82rem', lineHeight: 1.5 }}>
        {error}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '6px' }}>
        Make sure your backend is running on port 3000 and the PR URL is public.
      </p>
    </div>
    <button
      onClick={onDismiss}
      style={{
        background: 'none',
        border: 'none',
        color: 'rgba(244,63,94,0.6)',
        cursor: 'pointer',
        fontSize: '1rem',
        padding: '4px',
        borderRadius: '6px',
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = '#f43f5e'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,63,94,0.6)'}
    >✕</button>
  </div>
);


// ── Results Header ────────────────────────────────────────────────────────────
const ResultsHeader = ({ review, onReset }) => (
  <div className="animate-fadeinup" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px',
  }}>
    <div>
      <h2 style={{
        fontSize: '1.1rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        letterSpacing: '-0.01em',
      }}>
        Analysis Complete
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
        {[
          review.bugs?.length && `${review.bugs.length} bug${review.bugs.length !== 1 ? 's' : ''}`,
          review.security?.length && `${review.security.length} security`,
          review.performance?.length && `${review.performance.length} perf`,
          review.suggestions?.length && `${review.suggestions.length} suggestion${review.suggestions.length !== 1 ? 's' : ''}`,
        ].filter(Boolean).join(' · ') || 'No issues found'}
      </p>
    </div>
    <button
      onClick={onReset}
      style={{
        padding: '8px 18px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--text-secondary)',
        fontSize: '0.82rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.color = '#f1f5f9';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.color = 'var(--text-secondary)';
      }}
    >
      ← New Review
    </button>
  </div>
);

// ── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);
  const [currentPrUrl, setCurrentPrUrl] = useState('');
  const [files, setFiles] = useState([]);         // ← PR files list

  const handleReviewSubmit = async (prUrl) => {
    setIsLoading(true);
    setError(null);
    setReview(null);
    setFiles([]);
    setCurrentPrUrl(prUrl); // ← URL save karo

    try {
      const data = await getCodeReview(prUrl);
      setReview(data.review);
      setFiles(data.files || []); // ← files save karo

      // ← History mein save karo
      saveToHistory(prUrl, data.review.score, data.review.summary);

    } catch (err) {
      setError(err.message || 'Kuch toh gadbad hai!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReview(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', position: 'relative' }}>
      <GridBg />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />

        <main style={{
          maxWidth: '820px',
          margin: '0 auto',
          padding: '40px 20px 80px',
        }}>

          {/* Input section — always visible until results */}
          {!review && (
            <InputSection onSubmit={handleReviewSubmit} isLoading={isLoading} />
          )}

          {/* Review History — Input ke neeche, results ke upar */}
          <ReviewHistory onSelectPR={handleReviewSubmit} />

          {/* Loading */}
          {isLoading && <LoadingSpinner />}

          {/* Error */}
          {error && !isLoading && (
            <ErrorBanner error={error} onDismiss={() => setError(null)} />
          )}

          {/* Results */}
          {review && !isLoading && (
            <div>
              <ResultsHeader review={review} onReset={handleReset} />

              {/* COPY BUTTON — Review ke upar dikhega */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '16px'
              }}>
                <CopyButton review={review} prUrl={currentPrUrl} />
              </div>

              {/* File Tree — Sabse pehle */}
              <FileTree files={files} />

              <ScoreCard score={review.score} />
              <SummaryBox summary={review.summary} />
              <ReviewCard title="Bugs Found"         icon="🔴" color="#f43f5e" items={review.bugs} />
              <ReviewCard title="Security Issues"    icon="🛡️" color="#f97316" items={review.security} />
              <ReviewCard title="Performance Issues" icon="⚡" color="#eab308" items={review.performance} />
              <ReviewCard title="Suggestions"        icon="💡" color="#10b981" items={review.suggestions} />
            </div>
          )}


        </main>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: '20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          position: 'relative',
          zIndex: 1,
        }}>
          AI Code Reviewer · Built for Hackathon
        </footer>
      </div>
    </div>
  );
}

export default App;
