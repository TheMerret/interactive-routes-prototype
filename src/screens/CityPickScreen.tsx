import { useNavigate } from 'react-router-dom';

const MOSCOW_IMG = 'https://www.figma.com/api/mcp/asset/d67f9d52-fb13-400e-91c1-83b58a7ff183';
const SPB_IMG = 'https://www.figma.com/api/mcp/asset/6434fd84-5b7d-4c85-88e7-70b7e603dee6';

export default function CityPickScreen() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/quiz')}
      style={{ height: '100vh', position: 'relative', overflow: 'hidden', cursor: 'pointer', background: '#111' }}
    >
      {/* SPb full-screen background */}
      <img
        src={SPB_IMG}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />

      {/* Moscow clipped to upper-left diagonal */}
      <img
        src={MOSCOW_IMG}
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          clipPath: 'polygon(0 0, 100% 0, 100% 38%, 0 64%)',
        }}
      />

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.40)' }} />

      {/* Diagonal divider line */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '-20%',
        width: '140%', height: 3,
        background: 'white',
        transform: 'translateY(-50%) rotate(-16.7deg)',
        transformOrigin: 'center',
        zIndex: 10,
      }} />

      {/* Москва label — top right */}
      <p style={{
        position: 'absolute', top: '13%', right: '8%',
        fontFamily: "'GuanoApes', cursive",
        fontSize: 50, color: 'white',
        letterSpacing: 2.5, margin: 0,
        textShadow: '0 2px 12px rgba(0,0,0,0.4)',
        zIndex: 11,
      }}>
        Москва
      </p>

      {/* Санкт-петербург label — bottom left */}
      <p style={{
        position: 'absolute', bottom: '8%', left: '8%',
        fontFamily: "'GuanoApes', cursive",
        fontSize: 46, color: 'white',
        letterSpacing: 2.5, margin: 0,
        textShadow: '0 2px 12px rgba(0,0,0,0.4)',
        zIndex: 11,
      }}>
        Санкт-петербург
      </p>

      {/* Home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%',
        transform: 'translateX(-50%)',
        width: 134, height: 5, background: 'white', borderRadius: 5, zIndex: 12,
      }} />
    </div>
  );
}
