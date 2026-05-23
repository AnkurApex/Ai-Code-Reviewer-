const LoadingSpinner = () => {
  const steps = [
    { label: 'Connecting to GitHub API', done: true },
    { label: 'Fetching PR diff & metadata', done: true },
    { label: 'Running AI analysis', done: false, active: true },
    { label: 'Generating report', done: false },
  ];

  return (
    <div className="animate-fadein" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 20px',
      gap: '36px',
    }}>
      {/* Central spinner */}
      <div style={{ position: 'relative', width: 96, height: 96 }}>
        {/* Outer ring */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid rgba(99,102,241,0.15)',
        }} />
        {/* Spinning arc */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#6366f1',
          borderRightColor: '#8b5cf6',
          animation: 'spin 1s cubic-bezier(0.4,0,0.2,1) infinite',
        }} />
        {/* Inner ring */}
        <div style={{
          position: 'absolute',
          inset: 12,
          borderRadius: '50%',
          border: '2px solid rgba(99,102,241,0.1)',
        }} />
        {/* Inner spinning arc (reverse) */}
        <div style={{
          position: 'absolute',
          inset: 12,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: 'rgba(139,92,246,0.6)',
          animation: 'spin 0.7s linear infinite reverse',
        }} />
        {/* Center icon */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
        }}>
          🤖
        </div>
      </div>

      {/* Text */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#f1f5f9',
          marginBottom: '6px',
          letterSpacing: '-0.01em',
        }}>
          AI is analyzing your code…
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          This usually takes 10–30 seconds
        </p>
      </div>

      {/* Steps */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              ...(step.done ? {
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.4)',
                color: '#10b981',
              } : step.active ? {
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.4)',
              } : {
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }),
            }}>
              {step.done ? '✓' : step.active ? (
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  border: '1.5px solid transparent',
                  borderTopColor: '#6366f1',
                  animation: 'spin 0.7s linear infinite',
                }} />
              ) : ''}
            </div>
            <span style={{
              fontSize: '0.82rem',
              color: step.done ? '#10b981' : step.active ? '#a5b4fc' : 'var(--text-muted)',
              fontWeight: step.active ? 500 : 400,
              transition: 'color 0.3s',
            }}>
              {step.label}
            </span>
            {step.active && (
              <span style={{
                marginLeft: 'auto',
                fontSize: '0.68rem',
                color: '#6366f1',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                RUNNING
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
