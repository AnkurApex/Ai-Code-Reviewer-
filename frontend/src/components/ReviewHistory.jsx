// ReviewHistory.jsx — Past reviews localStorage mein save hote hain
// Click karo → woh review wapas load ho jaaye

const MAX_HISTORY = 5; // Sirf last 5 reviews

// History mein naya review save karo
export const saveToHistory = (prUrl, score, summary) => {
  try {
    const existing = JSON.parse(localStorage.getItem('reviewHistory') || '[]');

    const newEntry = {
      id: Date.now(),
      prUrl,
      score,
      summary: summary?.slice(0, 80) + '...', // Short preview
      reviewedAt: new Date().toLocaleString(),
    };

    // Duplicate URL check — same PR dobara add mat karo
    const filtered = existing.filter(e => e.prUrl !== prUrl);

    // Latest pehle, max 5 rakhna
    const updated = [newEntry, ...filtered].slice(0, MAX_HISTORY);
    localStorage.setItem('reviewHistory', JSON.stringify(updated));
  } catch (err) {
    console.error('History save failed:', err);
  }
};

const getScoreColor = (score) => {
  if (score >= 80) return '#00d4aa';
  if (score >= 60) return '#ffd166';
  return '#e94560';
};

const ReviewHistory = ({ onSelectPR }) => {
  const history = JSON.parse(localStorage.getItem('reviewHistory') || '[]');

  // History empty ho toh kuch mat dikhao
  if (history.length === 0) return null;

  const clearHistory = () => {
    localStorage.removeItem('reviewHistory');
    window.location.reload();
  };

  return (
    <div style={{
      background: '#16213e',
      border: '1px solid #0f3460',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '30px'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '14px'
      }}>
        <h3 style={{ color: '#a8b2d8', margin: 0, fontSize: '1rem' }}>
          🕐 Recent Reviews
        </h3>
        <button
          onClick={clearHistory}
          style={{
            background: 'transparent',
            border: '1px solid #555',
            color: '#555',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      </div>

      {/* History List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {history.map((entry) => (
          <div
            key={entry.id}
            onClick={() => onSelectPR(entry.prUrl)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              background: '#0f3460',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1a3a6e'}
            onMouseLeave={e => e.currentTarget.style.background = '#0f3460'}
          >
            {/* Score Badge */}
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#16213e',
              border: `2px solid ${getScoreColor(entry.score)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '0.8rem',
              fontWeight: 'bold',
              color: getScoreColor(entry.score)
            }}>
              {entry.score}
            </div>

            {/* PR Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                color: '#ffffff',
                fontSize: '0.82rem',
                fontFamily: 'monospace',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginBottom: '3px'
              }}>
                {entry.prUrl.replace('https://github.com/', '')}
              </div>
              <div style={{ color: '#555', fontSize: '0.75rem' }}>
                {entry.reviewedAt}
              </div>
            </div>

            {/* Re-review arrow */}
            <span style={{ color: '#a8b2d8', fontSize: '1rem', flexShrink: 0 }}>
              →
            </span>
          </div>
        ))}
      </div>

      <p style={{
        color: '#555',
        fontSize: '0.75rem',
        margin: '12px 0 0 0',
        textAlign: 'center'
      }}>
        💡 Click karo — woh PR dobara review ho jaayega
      </p>
    </div>
  );
};

export default ReviewHistory;
