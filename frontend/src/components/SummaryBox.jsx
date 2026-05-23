const SummaryBox = ({ summary }) => {
  return (
    <div className="animate-fadeinup" style={{
      background: 'var(--bg-card)',
      border: '1px solid rgba(165,180,252,0.2)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 24px',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Accent left bar */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: 'linear-gradient(180deg, #6366f1, #8b5cf6)',
        borderRadius: '3px 0 0 3px',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          background: 'rgba(99,102,241,0.12)',
          border: '1px solid rgba(99,102,241,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          flexShrink: 0,
        }}>
          📋
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            color: '#a5b4fc',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            Review Summary
          </h3>
          <p style={{
            color: 'var(--text-primary)',
            lineHeight: 1.7,
            fontSize: '0.9rem',
          }}>
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryBox;
