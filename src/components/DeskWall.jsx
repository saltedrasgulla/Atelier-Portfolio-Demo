import Switchboard from './Switchboard'
import { useElectricalStore } from '../store/useElectricalStore'
import Monitor from './Monitor'

export default function DeskWall() {
  const { taskLightOn } = useElectricalStore()

  const deskWood = '#cbb89d'
  const darkWood = '#8c765c'
  const pinboardGrey = '#6e7075'

  const deskDepth = 0.60
  const deskWidth = 0.91
  const deskHeight = 0.74
  const deskCenterZ = 1.16 + deskWidth / 2

  return (
    <group position={[0, 0, 0]}>
      {/* STUDY & STORAGE UNIT */}
      <group position={[deskDepth / 2, 0, deskCenterZ]}>
        {/* Tabletop Surface */}
        <mesh position={[0, deskHeight, 0]} receiveShadow castShadow>
          <boxGeometry args={[deskDepth, 0.035, deskWidth]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Left Side Panel */}
        <mesh position={[0, deskHeight / 2, deskWidth / 2 - 0.018]}>
          <boxGeometry args={[deskDepth, deskHeight, 0.035]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Right Side Panel */}
        <mesh position={[0, deskHeight / 2, -(deskWidth / 2 - 0.018)]}>
          <boxGeometry args={[deskDepth, deskHeight, 0.035]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Lower Footrest Plank */}
        <mesh position={[0.08, 0.1, 0]}>
          <boxGeometry args={[0.42, 0.03, deskWidth - 0.07]} />
          <meshStandardMaterial color={deskWood} roughness={0.7} />
        </mesh>

        {/* Modesty / Back Panel */}
        <mesh position={[-(deskDepth / 2 - 0.015), deskHeight * 0.55, 0]}>
          <boxGeometry args={[0.03, 0.55, deskWidth - 0.07]} />
          <meshStandardMaterial color={deskWood} roughness={0.7} />
        </mesh>

        {/* Functional Interactive Switchboard */}
        <Switchboard
          position={[-(deskDepth / 2 - 0.02), deskHeight + 0.09, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />

        {/* Grey Pinboard */}
        <mesh position={[-(deskDepth / 2 - 0.015), 1.30, 0]}>
          <boxGeometry args={[0.03, 0.56, deskWidth - 0.04]} />
          <meshStandardMaterial color={pinboardGrey} roughness={0.9} />
        </mesh>

        {/* Sticky Notes */}
        <mesh position={[-(deskDepth / 2 - 0.032), 1.44, -0.15]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshStandardMaterial color="#fff475" roughness={0.5} />
        </mesh>
        <mesh position={[-(deskDepth / 2 - 0.032), 1.44, 0.05]}>
          <planeGeometry args={[0.08, 0.10]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
        <mesh position={[-(deskDepth / 2 - 0.032), 1.44, 0.22]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshStandardMaterial color="#fff475" roughness={0.5} />
        </mesh>
        <mesh position={[-(deskDepth / 2 - 0.032), 1.25, -0.02]}>
          <planeGeometry args={[0.09, 0.11]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>

        {/* Upper Shelf Valance Box */}
        <mesh position={[-0.14, 1.62, 0]}>
          <boxGeometry args={[0.32, 0.06, deskWidth]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>

        {/* Upper Storage Cubbies */}
        <mesh position={[-0.14, 1.90, 0]}>
          <boxGeometry args={[0.32, 0.50, deskWidth]} />
          <meshStandardMaterial color={deskWood} roughness={0.6} />
        </mesh>
        <mesh position={[-0.13, 1.90, 0]}>
          <boxGeometry args={[0.30, 0.46, 0.03]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>

        {/* Study Desk Tabletop */}
<mesh position={[0, deskHeight, 0]} receiveShadow castShadow>
  <boxGeometry args={[deskDepth, 0.035, deskWidth]} />
  <meshStandardMaterial color={deskWood} roughness={0.6} />
</mesh>

{/* Interactive 24" Monitor */}
<Monitor position={[-0.10, deskHeight + 0.02, 0]} />
        
        
        {/* Recessed Warm Task Light wired to taskLightOn */}
        {taskLightOn && (
          <pointLight
            position={[-0.12, 1.58, 0]}
            intensity={1.5}
            distance={1.6}
            color="#ffd599"
          />
        )}
        <mesh position={[-0.12, 1.60, 0]}>
          <boxGeometry args={[0.04, 0.015, deskWidth * 0.7]} />
          <meshStandardMaterial
            color={taskLightOn ? '#fff1cc' : '#4a463f'}
            emissive={taskLightOn ? '#ffd599' : '#000000'}
            emissiveIntensity={taskLightOn ? 0.8 : 0}
          />
        </mesh>
      </group>

      {/* SHOE RACK */}
      <group position={[0.18, 0, 2.30]}>
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
      </group>

      {/* CLOTHESLINE CORD & LAUNDRY */}
      <mesh position={[0.12, 2.15, 2.45]} rotation={[0, 0, -0.05]}>
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
      </mesh>
    </group>
  )
}