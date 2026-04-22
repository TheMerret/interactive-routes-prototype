import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../data/routes';
import { useGame } from '../context/GameContext';

// Figma asset — expires in 7 days, replace with permanent image
const CARD_IMG = 'https://www.figma.com/api/mcp/asset/b8bd817d-d771-41dd-8cd1-d84d8b185060';

export default function RecommendationsScreen() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useGame();
  const [idx] = useState(0);

  const route = routes[idx % routes.length];
  const liked = favorites.has(route.id);

  return (
    <div style={{ background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 45, letterSpacing: 3, margin: 0, lineHeight: 1 }}>
          Рекомендации
        </h2>
      </div>

      {/* Card */}
      <div style={{ flex: 1, padding: '16px 18px 0', overflow: 'hidden' }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 20,
          background: 'rgba(255,255,255,0.85)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Route image */}
          <img
            src={CARD_IMG || route.image}
            alt={route.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Time badge */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: 'rgba(255,255,255,0.20)',
            borderRadius: 30, padding: '6px 16px',
          }}>
            <span style={{ color: 'white', fontSize: 20, fontWeight: 400 }}>1 ч</span>
          </div>

          {/* Distance badge */}
          <div style={{
            position: 'absolute', top: 60, left: 14,
            background: 'rgba(255,255,255,0.20)',
            borderRadius: 30, padding: '6px 16px',
          }}>
            <span style={{ color: 'white', fontSize: 20, fontWeight: 400 }}>5 км</span>
          </div>

          {/* Heart */}
          <div
            onClick={() => toggleFavorite(route.id)}
            style={{
              position: 'absolute', top: 14, right: 14,
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(255,255,255,0.84)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 24, color: liked ? '#e55' : '#999',
            }}
          >
            {liked ? '♥' : '♡'}
          </div>

          {/* Bottom overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '16px 16px 18px',
          }}>
            {/* Route name */}
            <h3 style={{
              fontFamily: "'GuanoApes', cursive", fontSize: 35,
              color: 'white', margin: '0 0 10px', letterSpacing: 2, lineHeight: 1.1,
              textShadow: '0 1px 6px rgba(0,0,0,0.3)',
            }}>
              {route.title}
            </h3>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {route.tags.map(tag => (
                <span key={tag} style={{
                  background: 'rgba(255,255,255,0.64)',
                  borderRadius: 272, padding: '3px 12px',
                  fontSize: 14, color: '#000',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p style={{ margin: 0, fontSize: 17, fontWeight: 274, color: 'white', lineHeight: 1.45 }}>
              {route.description.slice(0, 120)}
            </p>
          </div>
        </div>
      </div>

      {/* Close */}
      <div style={{ padding: '16px 24px 32px', textAlign: 'center' }}>
        <button
          onClick={() => navigate('/routes')}
          style={{ background: 'none', border: 'none', fontSize: 17, cursor: 'pointer', color: '#000' }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
