import { useState } from 'react'

export default function DesktopOS() {
  const [activeWindow, setActiveWindow] = useState(null)
  const [time, setTime] = useState('18:30 IST')

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundImage: 'url("/wallpaper.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#ffffff',
      overflow: 'hidden'
    }}>

      {/* Desktop Workspace / Icons Area */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
        
        {/* Papers / Folder Icon */}
        <div 
          onClick={() => setActiveWindow('papers')}
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            cursor: 'pointer', width: '64px', textAlign: 'center',
            padding: '6px', borderRadius: '6px', transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>📁</div>
          <span style={{ fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontWeight: '500' }}>Papers</span>
        </div>

        {/* Photos Icon */}
        <div 
          onClick={() => setActiveWindow('photos')}
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            cursor: 'pointer', width: '64px', textAlign: 'center',
            padding: '6px', borderRadius: '6px', transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>🖼️</div>
          <span style={{ fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontWeight: '500' }}>Photos</span>
        </div>

      </div>

      {/* Simple Active Window Modal (if opened) */}
      {activeWindow && (
        <div style={{
          position: 'absolute', top: '40px', left: '100px', width: '320px', height: '220px',
          background: 'rgba(20, 20, 25, 0.85)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', zIndex: 10
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)'
          }}>
            <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'capitalize' }}>{activeWindow} Explorer</span>
            <button 
              onClick={() => setActiveWindow(null)}
              style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
            >
              ✕
            </button>
          </div>
          <div style={{ padding: '16px', fontSize: '13px', color: '#b3b3b3' }}>
            Contents of {activeWindow} will appear here...
          </div>
        </div>
      )}

      {/* Bottom Taskbar */}
      <div style={{
        height: '36px',
        background: 'rgba(10, 10, 15, 0.75)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600' }}>
          <span style={{ fontSize: '14px' }}>❖</span> Start
        </div>
        <div style={{ color: '#b3b3b3', fontFamily: 'monospace' }}>
          {time}
        </div>
      </div>

    </div>
  )
}