import { useState } from 'react';

const SEVERITY_MAP = {
  'Bugs Found':          { dot: '#f43f5e', bg: 'rgba(244,63,94,0.08)',   border: 'rgba(244,63,94,0.2)',   glow: 'rgba(244,63,94,0.15)',  tag: '#f43f5e' },
  'Security Issues':     { dot: '#f97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.2)',  glow: 'rgba(249,115,22,0.12)', tag: '#f97316' },
  'Performance Issues':  { dot: '#eab308', bg: 'rgba(234,179,8,0.08)',   border: 'rgba(234,179,8,0.2)',   glow: 'rgba(234,179,8,0.12)',  tag: '#eab308' },
  'Suggestions':         { dot: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  glow: 'rgba(16,185,129,0.12)', tag: '#10b981' },
};

const IssueItem = ({ item, color, index }) => {
  const [expanded, setExpanded] = useState(true);
  const safeId = item.file ? `file-${item.file.replace(/[^a-zA-Z0-9]/g, '-')}` : undefined;

  return (
    <div
      id={safeId}
      className="animate-fadeinup"
      style={{
        animationDelay: `${index * 60}ms`,
        background: 'rgba(0,0,0,0.25)',
        border: `1px solid rgba(255,255,255,0.05)`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 'var(--radius-md)',
        marginBottom: '10px',
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `rgba(255,255,255,0.1)`;
        e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `rgba(255,255,255,0.05)`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Header row */}
      <div
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(x => !x)}
      >
        {/* Index badge */}
        <div style={{
          width: 22,
          height: 22,
          borderRadius: '6px',
          background: `${color}20`,
          border: `1px solid ${color}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: color,
          flexShrink: 0,
        }}>
          {index + 1}
        </div>

        {/* File + line */}
        {item.file && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-secondary)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '5px',
            padding: '2px 8px',
            flexShrink: 0,
          }}>
            <span style={{ color: 'var(--text-muted)' }}>📄</span>
            {item.file}
            {item.line && (
              <span style={{ color: color, fontWeight: 600 }}>:{item.line}</span>
            )}
          </div>
        )}

        {/* Issue preview */}
        <span style={{
          flex: 1,
          fontSize: '0.82rem',
          color: 'var(--text-primary)',
          fontWeight: 500,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: expanded ? 'normal' : 'nowrap',
        }}>
          {item.issue}
        </span>

        {/* Chevron */}
        <div style={{
          color: 'var(--text-muted)',
          fontSize: '0.65rem',
          transition: 'transform 0.2s',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
          flexShrink: 0,
        }}>▶</div>
      </div>

      {/* Expanded body */}
      {expanded && item.fix && (
        <div style={{
          padding: '0 16px 14px 16px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          paddingTop: '12px',
          marginTop: 0,
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '6px',
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              flexShrink: 0,
            }}>
              💡
            </div>
            <div>
              <div style={{
                fontSize: '0.68rem',
                color: '#10b981',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                Suggested Fix
              </div>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
                lineHeight: 1.65,
              }}>
                {item.fix}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ReviewCard = ({ title, icon, color, items }) => {
  const [collapsed, setCollapsed] = useState(false);
  const meta = SEVERITY_MAP[title] || { dot: color, bg: `${color}10`, border: `${color}30`, glow: `${color}15`, tag: color };
  const isEmpty = !items || items.length === 0;

  return (
    <div className="animate-fadeinup" style={{
      background: 'var(--bg-card)',
      border: `1px solid ${meta.border}`,
      borderRadius: 'var(--radius-xl)',
      marginBottom: '16px',
      overflow: 'hidden',
      boxShadow: `0 0 30px ${meta.glow}, var(--shadow-card)`,
    }}>
      {/* Card header */}
      <div
        style={{
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          background: `${meta.bg}`,
          borderBottom: isEmpty || collapsed ? 'none' : `1px solid ${meta.border}`,
          transition: 'background 0.2s',
        }}
        onClick={() => !isEmpty && setCollapsed(c => !c)}
        onMouseEnter={e => e.currentTarget.style.background = `${meta.bg.replace('0.08', '0.12')}`}
        onMouseLeave={e => e.currentTarget.style.background = meta.bg}
      >
        {/* Icon */}
        <div style={{
          width: 38,
          height: 38,
          borderRadius: '10px',
          background: `${meta.tag}18`,
          border: `1px solid ${meta.tag}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          flexShrink: 0,
        }}>
          {icon}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{
            color: meta.tag,
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            marginBottom: '1px',
          }}>
            {title}
          </h3>
          {isEmpty ? (
            <span style={{ fontSize: '0.72rem', color: '#10b981' }}>No issues found</span>
          ) : (
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {items.length} {items.length === 1 ? 'issue' : 'issues'} detected
            </span>
          )}
        </div>

        {/* Badge */}
        <div style={{
          padding: '3px 12px',
          borderRadius: '99px',
          background: isEmpty ? 'rgba(16,185,129,0.12)' : `${meta.tag}18`,
          border: `1px solid ${isEmpty ? 'rgba(16,185,129,0.3)' : `${meta.tag}40`}`,
          fontSize: '0.8rem',
          fontWeight: 700,
          color: isEmpty ? '#10b981' : meta.tag,
          minWidth: 32,
          textAlign: 'center',
        }}>
          {isEmpty ? '✓' : items.length}
        </div>

        {/* Collapse chevron */}
        {!isEmpty && (
          <div style={{
            color: 'var(--text-muted)',
            fontSize: '0.65rem',
            transition: 'transform 0.25s',
            transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)',
          }}>▶</div>
        )}
      </div>

      {/* Body */}
      {!collapsed && (
        <div style={{ padding: isEmpty ? 0 : '16px' }}>
          {isEmpty ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 20px',
            }}>
              <span style={{ fontSize: '1.1rem' }}>✅</span>
              <span style={{ color: '#10b981', fontSize: '0.85rem' }}>
                No {title.toLowerCase()} found — this section looks clean!
              </span>
            </div>
          ) : (
            items.map((item, i) => (
              <IssueItem key={i} item={item} color={meta.tag} index={i} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
