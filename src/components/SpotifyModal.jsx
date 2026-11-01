import { useState, useRef, useEffect } from 'react'

export default function SpotifyModal({ isOpen, onClose }) {
  // Default to the first track (index 0) selected, but paused
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const playlist = [
    { 
      title: "Daydream", 
      artist: "Johnny Orlando", 
      defaultDuration: "2:51",
      src: "/music/daydream.mp3", 
      cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&auto=format&fit=crop&q=80" 
    },
    { 
      title: "Sunroof", 
      artist: "Nicky Youre, dazy", 
      defaultDuration: "2:43",
      src: "/music/sunroof.mp3", 
      cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80" 
    },
    { 
      title: "Teenage Dream", 
      artist: "Stephen Dawes", 
      defaultDuration: "2:58",
      src: "/music/teenagedream.mp3", 
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80" 
    },
    { 
      title: "No Sleep (feat. Bonn)", 
      artist: "Martin Garrix, Bonn", 
      defaultDuration: "3:27",
      src: "/music/nosleep.mp3", 
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80" 
    }
  ]

  const currentSong = playlist[currentIndex]

  // Initialize audio object and event listeners
  useEffect(() => {
    const audio = new Audio(playlist[0].src)
    audio.volume = 0.6
    audioRef.current = audio

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration || 0)
    const handleEnded = () => {
      setCurrentIndex((prev) => {
        const nextIdx = (prev + 1) % playlist.length
        audio.src = playlist[nextIdx].src
        audio.play().catch(() => {})
        return nextIdx
      })
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  // Format seconds into M:SS
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Click on a song row in the left list
  const handleSelectSong = (index) => {
    if (!audioRef.current) return

    if (index === currentIndex) {
      togglePlayPause()
    } else {
      setCurrentIndex(index)
      audioRef.current.src = playlist[index].src
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  // Toggle Play/Pause on the right panel
  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      if (!audioRef.current.src.endsWith(currentSong.src)) {
        audioRef.current.src = currentSong.src
      }
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  // Move to previous song in the 4 tracks
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
    setCurrentIndex(prevIndex)
    if (audioRef.current) {
      audioRef.current.src = playlist[prevIndex].src
      if (isPlaying) audioRef.current.play().catch(() => {})
    }
  }

  // Move to next song in the 4 tracks
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentIndex(nextIndex)
    if (audioRef.current) {
      audioRef.current.src = playlist[nextIndex].src
      if (isPlaying) audioRef.current.play().catch(() => {})
    }
  }

  // Scrub progress bar
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }} onClick={onClose}>
      
      <div style={{
        position: 'relative', width: '820px', maxWidth: '92vw', minHeight: '480px',
        background: '#121212', border: '1px solid rgba(255, 255, 255, 0.12)', 
        borderRadius: '16px', padding: '36px 40px', color: '#ffffff', 
        boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }} onClick={(e) => e.stopPropagation()}>

        {/* Red Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '18px', right: '18px', width: '32px', height: '32px',
          borderRadius: '50%', background: '#ff4d4f', border: 'none', color: '#fff', 
          cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(255,77,79,0.4)'
        }}>✕</button>

        {/* Top Heading */}
        <h2 style={{ 
          marginTop: 0, marginBottom: '20px', fontSize: '44px', fontWeight: '700', 
          fontFamily: '"Amatic SC", cursive, sans-serif', letterSpacing: '2px', color: '#1db954'
        }}>
          Playlist: Late Night Coding
        </h2>
        
        {/* Main 2-Column Content Area */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'stretch', flexGrow: 1 }}>
          
          {/* LEFT COLUMN: 4 Song Tracks + Profile Button */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            {/* 4 Track Rectangles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {playlist.map((song, idx) => {
                const isSelected = currentIndex === idx
                return (
                  <div 
                    key={idx} 
                    onClick={() => handleSelectSong(idx)}
                    style={{ 
                      display: 'flex', alignItems: 'center', padding: '10px 14px', 
                      borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s',
                      background: isSelected ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1px solid rgba(29, 185, 84, 0.4)' : '1px solid transparent'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                    onMouseOut={(e) => e.currentTarget.style.background = isSelected ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)'}
                  >
                    {/* Track Number */}
                    <div style={{ width: '24px', color: isSelected ? '#1db954' : '#b3b3b3', fontSize: '15px', fontWeight: '500' }}>
                      {idx + 1}
                    </div>

                    {/* Very Small Circular Cover */}
                    <img 
                      src={song.cover} 
                      alt={song.title} 
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', marginRight: '14px', flexShrink: 0 }} 
                    />

                    {/* Song Title & Artist Centered */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, textAlign: 'center', paddingRight: '20px' }}>
                      <span style={{ color: isSelected ? '#1db954' : '#ffffff', fontWeight: '600', fontSize: '15px', marginBottom: '2px' }}>
                        {song.title}
                      </span>
                      <span style={{ color: '#b3b3b3', fontSize: '13px' }}>
                        {song.artist}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom-Left Spotify Profile Button */}
            <a 
              href="https://open.spotify.com/user/31zwripg27kw3bsdm5gsrjcm435e?si=fca3ae31e5414099" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                alignSelf: 'flex-start',
                background: '#1db954', color: '#000', padding: '12px 24px', borderRadius: '28px',
                textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', marginTop: '20px',
                boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)'
              }}
            >
              Open Spotify Profile ↗
            </a>
          </div>

          {/* RIGHT COLUMN: Zoomed Square Cover, Amatic SC Title, & Player Controls */}
          <div style={{ 
            width: '320px', display: 'flex', flexDirection: 'column', 
            justifyContent: 'space-between', alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.35)', padding: '20px', borderRadius: '12px'
          }}>
            
            {/* Square Album Cover */}
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              style={{ 
                width: '210px', height: '210px', objectFit: 'cover', 
                borderRadius: '6px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' 
              }} 
            />

            {/* Song Name in Amatic SC & Artist in Normal Font */}
            <div style={{ width: '100%', textAlign: 'left', marginTop: '14px', marginBottom: '10px', paddingLeft: '8px' }}>
              <div style={{ 
                fontFamily: '"Amatic SC", cursive, sans-serif', 
                fontSize: '34px', fontWeight: '700', color: '#ffffff', 
                letterSpacing: '1px', lineHeight: '1.1' 
              }}>
                {currentSong.title}
              </div>
              <div style={{ fontSize: '14px', color: '#b3b3b3', marginTop: '4px', fontWeight: '500' }}>
                {currentSong.artist}
              </div>
            </div>

            {/* Bottom Player Control Bar */}
            <div style={{ width: '100%', background: '#070709', padding: '12px 14px', borderRadius: '8px' }}>
              
              {/* Prev / Play-Pause / Next Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '22px', marginBottom: '10px' }}>
                <button 
                  onClick={handlePrev}
                  title="Previous Track"
                  style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer', fontSize: '18px', padding: 0 }}
                >
                  ⏮
                </button>

                <button 
                  onClick={togglePlayPause}
                  title={isPlaying ? "Pause" : "Play"}
                  style={{ 
                    width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', 
                    border: 'none', color: '#000000', cursor: 'pointer', fontSize: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                  }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>

                <button 
                  onClick={handleNext}
                  title="Next Track"
                  style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer', fontSize: '18px', padding: 0 }}
                >
                  ⏭
                </button>
              </div>

              {/* Scrubber / Progress Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#b3b3b3', fontFamily: 'monospace' }}>
                <span>{formatTime(currentTime)}</span>
                <input 
                  type="range" 
                  min="0" 
                  max={duration || 100} 
                  value={currentTime} 
                  onChange={handleSeek}
                  style={{ flexGrow: 1, height: '4px', cursor: 'pointer', accentColor: '#ffffff' }}
                />
                <span>{duration ? formatTime(duration) : currentSong.defaultDuration}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}