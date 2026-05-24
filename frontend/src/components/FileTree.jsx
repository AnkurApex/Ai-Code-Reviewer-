// FileTree.jsx — PR mein changed files ka tree view
// Click karo → us file ki review pe jump karo

const statusConfig = {
  added:    { color: '#00d4aa', icon: '+', label: 'Added'    },
  modified: { color: '#ffd166', icon: '~', label: 'Modified' },
  deleted:  { color: '#e94560', icon: '-', label: 'Deleted'  },
  renamed:  { color: '#a8b2d8', icon: '→', label: 'Renamed'  },
};

const FileTree = ({ files }) => {

  if (!files || files.length === 0) return null;

  // File name pe click → us id pe scroll karo
  const handleFileClick = (filename) => {
    // Filename se safe id banao
    const safeId = `file-${filename.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const element = document.getElementById(safeId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight flash effect
      element.style.outline = '2px solid #e94560';
      setTimeout(() => { element.style.outline = 'none'; }, 2000);
    }
  };

  return (
    <div style={{
      background: '#16213e',
      border: '1px solid #0f3460',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <h3 style={{ color: '#a8b2d8', margin: 0, fontSize: '1rem' }}>
          📁 Changed Files
        </h3>
        <span style={{
          background: '#0f3460',
          color: '#a8b2d8',
          borderRadius: '12px',
          padding: '2px 10px',
          fontSize: '0.8rem'
        }}>
          {files.length} files
        </span>
      </div>

      {/* Files List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {files.map((file, index) => {
          const config = statusConfig[file.status] || statusConfig.modified;

          return (
            <div
              key={index}
              onClick={() => handleFileClick(file.filename)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: '#0f3460',
                borderRadius: '6px',
                cursor: 'pointer',
                borderLeft: `3px solid ${config.color}`,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1a3a6e'}
              onMouseLeave={e => e.currentTarget.style.background = '#0f3460'}
            >
              {/* File name */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flex: 1,
                minWidth: 0
              }}>
                <span style={{
                  color: config.color,
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>
                  {config.icon}
                </span>
                <span style={{
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontFamily: 'monospace',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {file.filename}
                </span>
              </div>

              {/* Additions / Deletions */}
              <div style={{
                display: 'flex',
                gap: '8px',
                flexShrink: 0,
                marginLeft: '8px'
              }}>
                {file.additions > 0 && (
                  <span style={{ color: '#00d4aa', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    +{file.additions}
                  </span>
                )}
                {file.deletions > 0 && (
                  <span style={{ color: '#e94560', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    -{file.deletions}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p style={{
        color: '#555',
        fontSize: '0.75rem',
        margin: '12px 0 0 0',
        textAlign: 'center'
      }}>
        💡 File pe click karo — directly us review pe jump karo
      </p>
    </div>
  );
};

export default FileTree;
