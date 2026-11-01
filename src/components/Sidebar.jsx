import { useState } from 'react'

// 1. Premium Dark Mode Button Styles
const btnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#ffffff', // Crisp white text
  padding: '16px 0',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.5px',
  transition: 'all 0.2s ease',
  width: '100%',
  position: 'relative'
}

const NavButton = ({ icon, label, onClick, active }) => (
  <button 
    style={{
      ...btnStyle,
      // Dim inactive buttons to a 50% opacity white
      color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)', 
    }}
    onClick={onClick}
    onPointerOver={(e) => {
      e.currentTarget.style.color = '#ffffff'
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)' // Subtle white highlight
    }}
    onPointerOut={(e) => {
      e.currentTarget.style.color = active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'
      e.currentTarget.style.background = 'transparent'
    }}
  >
    <span style={{ 
      fontSize: '20px', 
      filter: active ? 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' : 'none'
    }}>
      {icon}
    </span>
    {label}
  </button>
)

// ... (keep btnStyle and NavButton exactly as they are)

export default function Sidebar({ onOpenInfo, onOpenSpotify }) {
  const [mode, setMode] = useState('Explore')
  const [musicOn, setMusicOn] = useState(false)

  return (
    <div style={{
      position: 'absolute',
      top: '0',       // Anchor to top edge
      bottom: '0',    // Anchor to bottom edge
      right: '0',     // Anchor to right edge
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Centers the buttons vertically
      width: '72px', 
      
      // Premium Greyish Translucent Glass
      background: 'rgba(15, 20, 30, 0.45)', 
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      
      // Only the left border is needed since it touches all other edges
      borderLeft: '1px solid rgba(255, 255, 255, 0.25)',
      
      boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.4)', 
      zIndex: 100, 
      userSelect: 'none'
    }}>
      
      {/* Main Navigation Tools */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Hooked up to open the modal */}
        <NavButton 
          icon="ℹ️" 
          label="Info" 
          active={false}
          onClick={onOpenInfo} 
        />

        <NavButton 
          icon={mode === 'Explore' ? '🧭' : '🎬'} 
          label={mode} 
          active={true}
          onClick={() => setMode(mode === 'Explore' ? 'Tour' : 'Explore')} 
        />
        
        <NavButton 
          icon={musicOn ? '🔊' : '🔈'} 
          label="Music" 
          active={musicOn}
          onClick={onOpenSpotify} 
        />

        <NavButton 
          icon="📖" 
          label="Guide" 
          active={false}
          onClick={() => console.log("Guide Opened")} 
        />
      </div>

    </div>
  )
}   