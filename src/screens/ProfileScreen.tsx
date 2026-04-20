import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar';
import { useGame } from '../context/GameContext';

const SECTIONS = ['Дневник путешественника', 'Награды', 'Рейтинг', 'Пройденные маршруты'] as const;

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { score } = useGame();
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0]);
  const level = Math.floor(score / 3) + 11;
  const progress = ((score % 3) / 3) * 100;

  return (
    <div style={{ background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ overflowY: 'auto', flex: 1, paddingBottom: 83 }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="16" height="20" viewBox="0 0 14 18" fill="none">
              <path d="M7 0C3.69 0 1 2.69 1 6c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#555" />
            </svg>
            <span style={{ fontSize: 16, color: '#555' }}>Москва</span>
          </div>
          <button
            style={{ width: 40, height: 40, borderRadius: '50%', background: '#e8e8e8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => navigate('/')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 24px 0' }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#d0d0d0', marginBottom: 16 }} />
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Никнейм</div>
          <div style={{ fontSize: 15, color: '#888', marginBottom: 20 }}>Начинающий исследователь</div>

          {/* Level bar */}
          <div style={{ width: '100%', padding: '0 4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#888', marginBottom: 6 }}>
              <span>{level} lvl</span>
              <span>{level + 1} lvl</span>
            </div>
            <div style={{ height: 8, background: '#ddd', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${Math.max(progress, 8)}%`, height: '100%', background: '#4A90E2', borderRadius: 4, transition: 'width .4s' }} />
            </div>
          </div>
        </div>

        {/* Section buttons */}
        <div style={{ padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SECTIONS.map(section => {
            const isActive = section === activeSection;
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                style={{
                  width: '100%', height: 60,
                  borderRadius: 20,
                  border: isActive ? '2px solid #4A90E2' : '2px solid transparent',
                  background: isActive ? 'white' : '#e8e8e8',
                  fontSize: 17, fontWeight: 500,
                  cursor: 'pointer',
                  color: '#000',
                  transition: 'border-color .15s, background .15s',
                }}
              >
                {section}
              </button>
            );
          })}
        </div>
      </div>

      <TabBar />
    </div>
  );
}
