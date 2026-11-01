export default function WindowPanel() {
  // Shared materials to match your CAD aesthetics
  const frameColor = "#b8bcc2" // Light architectural grey
  const doorColor = "#ffffff"  // Pure white door
  
  return (
    <group position={[0, 0, 0]}>
      {/* 0. Ambient Outdoor Sky (Spanning behind both window and door) */}
      <mesh position={[1.33, 1.45, -0.05]}>
        <planeGeometry args={[2.6, 2.8]} />
        <meshBasicMaterial color="#e6f4ff" />
      </mesh>

      {/* ========================================================
          1. BALCONY DOOR UNIT 
          Left Gap: 97mm -> Starts at X: 0.097m
          Width: 800mm -> Center X: 0.097 + 0.40 = 0.497m
          ======================================================== */}
      <group position={[0, 0, 0.02]}>
        {/* Main Outer Frame (800mm wide, 2450mm tall) */}
        <mesh position={[0.497, 1.225, 0]}>
          <planeGeometry args={[0.80, 2.45]} />
          <meshStandardMaterial color={frameColor} roughness={0.7} />
        </mesh>

        {/* White Door Leaf (720mm wide, 1850mm tall) */}
        {/* Center Y = 1.85 / 2 = 0.925m */}
        <mesh position={[0.497, 0.925, 0.01]}>
          <planeGeometry args={[0.72, 1.85]} />
          <meshStandardMaterial color={doorColor} roughness={0.4} />
        </mesh>

        {/* Door Handle (Standard 1m height from floor) */}
        <mesh position={[0.80, 1.0, 0.03]}>
          <boxGeometry args={[0.03, 0.15, 0.02]} />
          <meshStandardMaterial color="#555555" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Top Transom Glass (660mm wide, taking remaining space above 1850mm leaf) */}
        {/* Center Y = 1.85 (door) + (2.45 - 1.85)/2 = 2.15m */}
        <mesh position={[0.497, 2.15, 0.01]}>
          <planeGeometry args={[0.66, 0.52]} />
          <meshPhysicalMaterial
            color="#aed2eb"
            transparent
            opacity={0.6}
            roughness={0.1}
            transmission={0.9}
            thickness={0.02}
          />
        </mesh>
      </group>


      {/* ========================================================
          2. WINDOW UNIT
          Mid Gap: 250mm -> Starts at X: 0.097 + 0.800 + 0.250 = 1.147m
          Width: 1350mm -> Center X: 1.147 + 0.675 = 1.822m
          Height: 1600mm -> Top aligned to 2450mm -> Center Y = 1.65m
          ======================================================== */}
      <group position={[0, 0, 0.02]}>
        {/* Main Outer Frame (1350mm x 1600mm) */}
        <mesh position={[1.822, 1.65, 0]}>
          <planeGeometry args={[1.35, 1.60]} />
          <meshStandardMaterial color={frameColor} roughness={0.7} />
        </mesh>

        {/* A. Top Horizontal Glass Pane (1230mm wide) */}
        <mesh position={[1.822, 2.18, 0.01]}>
          <planeGeometry args={[1.23, 0.42]} />
          <meshPhysicalMaterial
            color="#aed2eb"
            transparent
            opacity={0.6}
            roughness={0.1}
            transmission={0.9}
            thickness={0.02}
          />
        </mesh>

        {/* B. Lower Left Glass Pane (Height: 998mm) */}
        {/* Start X: 1.147 + 0.06 (frame) + 0.39 (half of 780mm pane) = 1.597m */}
        <mesh position={[1.597, 1.41, 0.01]}>
          <planeGeometry args={[0.78, 0.998]} />
          <meshPhysicalMaterial
            color="#aed2eb"
            transparent
            opacity={0.6}
            roughness={0.1}
            transmission={0.9}
            thickness={0.02}
          />
        </mesh>

        {/* C. Lower Right Glass Pane (Height: 998mm) */}
        {/* Center X: 1.597 + 0.39 (half L-pane) + 0.06 (mullion) + 0.195 (half R-pane) = 2.242m */}
        <mesh position={[2.242, 1.41, 0.01]}>
          <planeGeometry args={[0.39, 0.998]} />
          <meshPhysicalMaterial
            color="#aed2eb"
            transparent
            opacity={0.6}
            roughness={0.1}
            transmission={0.9}
            thickness={0.02}
          />
        </mesh>
      </group>
    </group>
  )
}