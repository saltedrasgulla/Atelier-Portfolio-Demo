import Switchboard from './Switchboard'
import { useElectricalStore } from '../store/useElectricalStore'
import Monitor from './Monitor'

export default function DeskWall() {
  const { taskLightOn } = useElectricalStore()

  const deskWood = '#cbb89d'
  //const darkWood = '#8c765c'
  const pinboardGrey = '#6e7075'

  // Dimensions based on your AutoCAD drawings
  const deskDepth = 0.60         // 600mm table depth
  const deskWidth = 0.90         // 900mm table width
  const deskHeight = 0.75        // 750mm floor to tabletop height
  const topThickness = 0.035     // 35mm tabletop thickness
  const legHeight = deskHeight - topThickness // 715mm leg height
  const legThickness = 0.025     // Side panel thickness
  const deskCenterZ = 1.16 + deskWidth / 2

  // Middle span dimensions (760mm total height above desk surface)
  const middleSpanH = 0.76       
  const switchBoxPanelH = 0.21   // 210mm switch box panel at the bottom
  const lightBoxH = 0.10         // 100mm cuboidal light box at the top
  const pinboardH = 0.45         // 450mm grey pinboard in between (760 - 210 - 100 = 450mm)
  const lightBoxDepth = 0.15     // 150mm light box depth in sideview
  const backPlyT = 0.015         // 15mm continuous backing ply

  // Overhead cupboard dimensions (300mm height x 300mm depth)
  const cupboardGap = 0.04       // 40mm gap between light box and cupboard
  const cupboardH = 0.30         // 300mm cupboard height
  const cupboardDepth = 0.30     // 300mm cupboard depth in sideview
  const cupboardPly = 0.02       // 20mm ply thickness
  const cupboardBottomY = deskHeight + middleSpanH + cupboardGap

  return (
    <group position={[0, 0, 0]}>
      {/* STUDY & STORAGE UNIT */}
      <group position={[deskDepth / 2, 0, deskCenterZ]}>
        
        {/* ========================================================
            1. LOWER DESK STRUCTURE (750mm total height)
            ======================================================== */}
        {/* Tabletop Surface (35mm thick) */}
        <mesh position={[0, deskHeight - topThickness / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[deskDepth, topThickness, deskWidth]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Left Side Panel */}
        <mesh position={[0, legHeight / 2, deskWidth / 2 - legThickness / 2]}>
          <boxGeometry args={[deskDepth, legHeight, legThickness]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Right Side Panel */}
        <mesh position={[0, legHeight / 2, -(deskWidth / 2 - legThickness / 2)]}>
          <boxGeometry args={[deskDepth, legHeight, legThickness]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Lower Footrest Plank */}
        <mesh position={[0.08, 0.1, 0]}>
          <boxGeometry args={[0.42, 0.03, deskWidth - 0.07]} />
          <meshStandardMaterial color={deskWood} roughness={0.7} />
        </mesh>

        {/* Modesty / Back Panel */}
        <mesh position={[-(deskDepth / 2 - 0.015), legHeight / 2, 0]}>
          <boxGeometry args={[backPlyT, legHeight, deskWidth - legThickness * 2]} />
          <meshStandardMaterial color={deskWood} roughness={0.7} />
        </mesh>


        {/* ========================================================
            2. MIDDLE ELEVATION (760mm span above desk)
            ======================================================== */}
        {/* Continuous Backing Ply supporting switchbox and pinboard */}
        <mesh position={[-(deskDepth / 2 - backPlyT / 2), deskHeight + middleSpanH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[backPlyT, middleSpanH, deskWidth]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Functional Interactive Switchboard */}
        <Switchboard
          position={[-(deskDepth / 2 - backPlyT - 0.005), deskHeight + switchBoxPanelH / 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />

        {/* Grey Pinboard (450mm tall, zero sticky notes) */}
        <mesh position={[-(deskDepth / 2 - backPlyT - 0.006), deskHeight + switchBoxPanelH + pinboardH / 2, 0]}>
          <boxGeometry args={[0.012, pinboardH, deskWidth - 0.02]} />
          <meshStandardMaterial color={pinboardGrey} roughness={0.9} />
        </mesh>

     {/* ========================================================
            2.5 HOLLOW CUBOIDAL LIGHT BOX (Impenetrable Top + Downward Cone)
            ======================================================== */}
        {/* Solid Top Plank (Flush with the top edge of the cuboidal holder) */}
        <mesh position={[-(deskDepth / 2 - lightBoxDepth / 2), deskHeight + middleSpanH - 0.015, 0]} castShadow receiveShadow>
          <boxGeometry args={[lightBoxDepth, 0.03, deskWidth]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Internal Blackout Shield (Sits directly under the top plank) */}
        <mesh position={[-(deskDepth / 2 - lightBoxDepth / 2), deskHeight + middleSpanH - 0.032, 0]} castShadow>
          <boxGeometry args={[lightBoxDepth - 0.01, 0.004, deskWidth - 0.01]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Front Baffle/Panel */}
        <mesh position={[-(deskDepth / 2 - lightBoxDepth + 0.01), deskHeight + middleSpanH - lightBoxH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.02, lightBoxH, deskWidth]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Left Side Baffle */}
        <mesh position={[-(deskDepth / 2 - lightBoxDepth / 2), deskHeight + middleSpanH - lightBoxH / 2, deskWidth / 2 - 0.01]} castShadow receiveShadow>
          <boxGeometry args={[lightBoxDepth, lightBoxH, 0.02]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Right Side Baffle */}
        <mesh position={[-(deskDepth / 2 - lightBoxDepth / 2), deskHeight + middleSpanH - lightBoxH / 2, -(deskWidth / 2 - 0.01)]} castShadow receiveShadow>
          <boxGeometry args={[lightBoxDepth, lightBoxH, 0.02]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

    {/* Wided Downward Cones spanning the full width of the fixture */}
        {taskLightOn && [-0.26, -0.14,0, 0.14, 0.26].map((zOffset, i) => (
          <spotLight
            key={i}
            position={[-(deskDepth / 2 - lightBoxDepth / 2), deskHeight + middleSpanH - 0.04, zOffset]}
            angle={1.5}
            penumbra={1}
            intensity={0.7}
            distance={2.5}
            decay={1.2}
            color="#ffd599"
            onUpdate={(self) => {
              self.target.position.set(0.22, deskHeight, deskCenterZ + zOffset)
              self.target.updateMatrixWorld()
            }}
          />
        ))}

        {/* The LED Tube */}
        <mesh position={[-(deskDepth / 2 - lightBoxDepth / 2), deskHeight + middleSpanH - 0.038, 0]}>
          <boxGeometry args={[0.025, 0.008, deskWidth * 0.7]} />
          <meshStandardMaterial
            color={taskLightOn ? '#fff1cc' : '#4a463f'}
            emissive={taskLightOn ? '#ffd599' : '#000000'}
            emissiveIntensity={taskLightOn ? 0.8 : 0}
          />
        </mesh>
        {/* ========================================================
            3. OVERHEAD HOLLOW BOOKSHELF (300mm high x 300mm deep)[cite: 16]
            Completely open front, split into two compartments[cite: 16, 18]
            ======================================================== */}
        {/* Back Panel */}
        <mesh position={[-(deskDepth / 2 - 0.008), cupboardBottomY + cupboardH / 2, 0]}>
          <boxGeometry args={[0.016, cupboardH, deskWidth]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Top Plank (300mm deep) */}
        <mesh position={[-(deskDepth / 2 - cupboardDepth / 2), cupboardBottomY + cupboardH - cupboardPly / 2, 0]}>
          <boxGeometry args={[cupboardDepth, cupboardPly, deskWidth]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Bottom Plank (300mm deep) */}
        <mesh position={[-(deskDepth / 2 - cupboardDepth / 2), cupboardBottomY + cupboardPly / 2, 0]}>
          <boxGeometry args={[cupboardDepth, cupboardPly, deskWidth]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Left Side Plank */}
        <mesh position={[-(deskDepth / 2 - cupboardDepth / 2), cupboardBottomY + cupboardH / 2, deskWidth / 2 - cupboardPly / 2]}>
          <boxGeometry args={[cupboardDepth, cupboardH - cupboardPly * 2, cupboardPly]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Right Side Plank */}
        <mesh position={[-(deskDepth / 2 - cupboardDepth / 2), cupboardBottomY + cupboardH / 2, -(deskWidth / 2 - cupboardPly / 2)]}>
          <boxGeometry args={[cupboardDepth, cupboardH - cupboardPly * 2, cupboardPly]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Center Vertical Divider (Splits into 2 empty cubbies)[cite: 16, 18] */}
        <mesh position={[-(deskDepth / 2 - cupboardDepth / 2), cupboardBottomY + cupboardH / 2, 0]}>
          <boxGeometry args={[cupboardDepth - 0.005, cupboardH - cupboardPly * 2, cupboardPly]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>


        {/* ========================================================
            4. UNTOUCHED DESKTOP ELEMENTS
            ======================================================== */}
        <Monitor 
          position={[-0.10, deskHeight + 0.02, 0.12]}
          rotation={[0, Math.PI / 6, 0]} // <-- Angles the monitor 60° relative to the side edge
         />

      </group>


      {/* SHOE RACK & CLOTHESLINE CORD (Kept commented out per your instructions) */}
      
      {/* <group position={[0.18, 0, 2.30]}>
        {[0.06, 0.22, 0.38, 0.54].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0]}>
            <boxGeometry args={[0.26, 0.02, 0.38]} />
            <meshStandardMaterial color="#b0b5b8" metalness={0.4} roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0.11, 0.3, 0.17]}>
          <boxGeometry args={[0.02, 0.6, 0.02]} />
          <meshStandardMaterial color="#33383b" roughness={0.4} />
        </mesh>
        <mesh position={[-0.11, 0.3, 0.17]}>
          <boxGeometry args={[0.02, 0.6, 0.02]} />
          <meshStandardMaterial color="#33383b" roughness={0.4} />
        </mesh>
        <mesh position={[0.11, 0.3, -0.17]}>
          <boxGeometry args={[0.02, 0.6, 0.02]} />
          <meshStandardMaterial color="#33383b" roughness={0.4} />
        </mesh>
        <mesh position={[-0.11, 0.3, -0.17]}>
          <boxGeometry args={[0.02, 0.6, 0.02]} />
          <meshStandardMaterial color="#33383b" roughness={0.4} />
        </mesh>
      </group> */}

      {/* <mesh position={[0.12, 2.15, 2.45]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[0.008, 0.008, 0.8]} />
        <meshStandardMaterial color="#e07a3f" roughness={0.6} />
      </mesh>
      <mesh position={[0.12, 1.95, 2.30]} rotation={[0, 0.08, 0]}>
        <boxGeometry args={[0.04, 0.35, 0.20]} />
        <meshStandardMaterial color="#1f1f22" roughness={0.8} />
      </mesh>
      <mesh position={[0.12, 1.85, 2.52]} rotation={[0, -0.05, 0]}>
        <boxGeometry args={[0.04, 0.55, 0.22]} />
        <meshStandardMaterial color="#5e2b4d" roughness={0.8} />
      </mesh> */}

    </group>
  )
}