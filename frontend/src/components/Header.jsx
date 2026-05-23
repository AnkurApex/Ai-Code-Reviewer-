const Header = () => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(8,11,20,0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 24px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          boxShadow: '0 0 16px rgba(99,102,241,0.4)',
        }}>
          🤖
        </div>
        <div>
          <h1 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#f1f5f9',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}>
            AI Code Reviewer
          </h1>

        </div>
      </div>

    </header>
  );
};

export default Header;
