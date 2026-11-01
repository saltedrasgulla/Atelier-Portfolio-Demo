export default function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.6)', // Dim background
      backdropFilter: 'blur(5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}
    onClick={onClose} // Clicking outside closes the modal
    >
      <div style={{
        position: 'relative',
        width: '650px',         // Enlarged to match your yellow target frame
        maxWidth: '85vw',
        minHeight: '320px',     // Spanned out vertically
        background: 'rgba(20, 20, 25, 0.85)', // Translucent dark box
        border: '1px solid rgba(255, 255, 255, 0.2)', // Thin white border
        borderRadius: '16px',
        padding: '48px 40px',
        color: '#ffffff', // White text
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      onClick={(e) => e.stopPropagation()} // Prevent inner clicks from closing
      >
        {/* Red Close Button on Top Right */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#ff4d4f', // Red color
            border: 'none',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(255, 77, 79, 0.4)'
          }}
        >
          ✕
        </button>

        {/* Heading styled with AMATIC SC font */}
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '16px',
          fontSize: '48px',        // Scaled up for Amatic SC visual balance
          fontWeight: '700', 
          fontFamily: '"Amatic SC", cursive, sans-serif',
          letterSpacing: '1px'
        }}>
          Project Atelier Info
        </h2>

        {/* Body text size kept clean and readable */}
        <p style={{ 
          lineHeight: '1.6', 
          color: 'rgba(255, 255, 255, 0.85)', 
          fontSize: '15px',
          margin: 0
        }}>
          An interactive 3D studio portfolio bridging spatial design with modern web engineering. Every corner, beam, and desk dimension is modeled to exact real-world CAD specs of my room. Explore the workspace to learn about my projects, skills, and process.
        </p>
      </div>
    </div>
  )
}