import { useState } from 'react'

const FILES = {
  papers: [
    { name: 'Research_Paper_Draft.pdf', size: '240 KB' },
    { name: 'Institute_Collab_Spec.docx', size: '1.2 MB' },
    { name: 'ThreeJS_Digital_Twin.md', size: '48 KB' },
  ],
  photos: [
    { name: 'Hostel_Room_Day.png', tag: '3D Twin' },
    { name: 'Study_Setup_Night.png', tag: 'Workspace' },
  ]
}

export default function DesktopOS() {
  const [activeWindow, setActiveWindow] = useState(null)

  return (
    <div style={{
      width: '800px',
      height: '500px',
      background: 'radial-gradient(circle at 50% 30%, #1e2638 0%, #0d111a 100%)',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none',
      boxSizing: 'border-box'
    }}>
      {/* 1. Desktop Folders */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100px' }}>
        <div 
          onClick={() => setActiveWindow('papers')}
          style={{ cursor: 'pointer', textAlign: 'center' }}
        >
          <div style={{ fontSize: '36px' }}>📁</div>
          <span style={{ fontSize: '12px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Papers</span>
        </div>

        <div 
          onClick={() => setActiveWindow('photos')}
          style={{ cursor: 'pointer', textAlign: 'center' }}
        >
          <div style={{ fontSize: '36px' }}>🖼️</div>
          <span style={{ fontSize: '12px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Photos</span>
        </div>
      </div>

      {/* 2. Interactive Window Modal */}
      {activeWindow && (
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '140px',
          width: '500px',
          height: '320px',
          backgroundColor: '#181e2b',
          borderRadius: '6px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.8)',
          border: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10
        }}>
          {/* Titlebar */}
          <div style={{
            background: '#232b3d',
            padding: '8px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #334155',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {activeWindow === 'papers' ? 'Explorer — /Documents/Papers' : 'Gallery — /Media/Photos'}
            </span>
            <button 
              onClick={() => setActiveWindow(null)}
              style={{
                background: '#ef4444',
                border: 'none',
                color: '#fff',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '12px',
                lineHeight: '1',
                padding: 0
              }}
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
            {activeWindow === 'papers' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {FILES.papers.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#21293a', borderRadius: '4px', fontSize: '12px' }}>
                    <span>📄 {p.name}</span>
                    <span style={{ color: '#94a3b8' }}>{p.size}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {FILES.photos.map((ph, i) => (
                  <div key={i} style={{ padding: '8px', background: '#21293a', borderRadius: '4px', textAlign: 'center', fontSize: '11px' }}>
                    <div style={{ height: '80px', background: '#2e384d', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      📷 Preview
                    </div>
                    <p style={{ margin: '6px 0 0 0' }}>{ph.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Taskbar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '36px',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        borderTop: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <span style={{ fontSize: '14px' }}>❖</span>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Start</span>
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>18:30 IST</div>
      </div>
    </div>
  )
}