import { useEffect, useRef } from 'react';

const ScoreCard = ({ score }) => {
  const canvasRef = useRef(null);

  const getColor = (s) => {
    if (s >= 80) return '#10b981';
    if (s >= 60) return '#eab308';
    return '#f43f5e';
  };

  const getGlow = (s) => {
    if (s >= 80) return 'rgba(16,185,129,0.3)';
    if (s >= 60) return 'rgba(234,179,8,0.3)';
    return 'rgba(244,63,94,0.3)';
  };

  const getLabel = (s) => {
    if (s >= 90) return { text: 'Outstanding', emoji: '🏆' };
    if (s >= 80) return { text: 'Excellent', emoji: '🎉' };
    if (s >= 70) return { text: 'Good Quality', emoji: '👍' };
    if (s >= 60) return { text: 'Acceptable', emoji: '🤔' };
    if (s >= 40) return { text: 'Needs Work', emoji: '⚠️' };
    return { text: 'Critical Issues', emoji: '🚨' };
  };

  const color = getColor(score);
  const { text, emoji } = getLabel(score);

  // Draw arc on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const cx = size / 2, cy = size / 2;
    const r = (size / 2) - 10;
    const startAngle = -Math.PI * 0.75;
    const endAngle = Math.PI * 0.75;
    const progress = (score / 100) * (endAngle - startAngle) + startAngle;

    ctx.clearRect(0, 0, size, size);

    // Track
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Progress arc
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color + 'aa');
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, progress);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.shadowColor = color;
    ctx.shadowBlur = 16;
    ctx.stroke();
  }, [score, color]);

  const segments = [
    { range: '0–40', label: 'Critical', c: '#f43f5e' },
    { range: '40–60', label: 'Poor', c: '#f97316' },
    { range: '60–80', label: 'Good', c: '#eab308' },
    { range: '80–100', label: 'Excellent', c: '#10b981' },
  ];

  return (
    <div className="animate-fadeinup" style={{
      background: 'var(--bg-card)',
      border: `1px solid ${color}33`,
      borderRadius: 'var(--radius-xl)',
      padding: '28px 24px',
      marginBottom: '20px',
      boxShadow: `0 0 40px ${getGlow(score)}, var(--shadow-card)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG glow */}
      <div style={{
        position: 'absolute',
        top: -60,
        right: -60,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '28px',
        flexWrap: 'wrap',
      }}>
        {/* Arc gauge */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <canvas
            ref={canvasRef}
            width={140}
            height={140}
            style={{ display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '8px',
          }}>
            <div style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              color: color,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              textShadow: `0 0 20px ${color}`,
            }}>
              {score}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              / 100
            </div>
          </div>
        </div>

        {/* Right side */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: `${color}18`,
            border: `1px solid ${color}40`,
            borderRadius: '99px',
            padding: '5px 14px',
            marginBottom: '12px',
          }}>
            <span style={{ fontSize: '0.9rem' }}>{emoji}</span>
            <span style={{ color: color, fontWeight: 600, fontSize: '0.85rem' }}>{text}</span>
          </div>

          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#f1f5f9',
            marginBottom: '6px',
            letterSpacing: '-0.01em',
          }}>
            Code Quality Score
          </h3>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.82rem',
            lineHeight: 1.6,
            marginBottom: '16px',
          }}>
            Based on bug count, security vulnerabilities, performance patterns and code style.
          </p>

          {/* Segment legend */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {segments.map(seg => (
              <div
                key={seg.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                }}
              >
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '2px',
                  background: seg.c,
                }} />
                {seg.label} ({seg.range})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score bar */}
      <div style={{ marginTop: '20px' }}>
        <div style={{
          height: 6,
          borderRadius: '99px',
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${score}%`,
            borderRadius: '99px',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 12px ${color}`,
            transition: 'width 1s cubic-bezier(0.16,1,0.3,1)',
          }} />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
