import { useState, CSSProperties } from 'react';

interface Filters {
  city: string[];
  category: string[];
  duration: string[];
}

interface Props {
  onClose: () => void;
  onApply: (filters: Filters) => void;
  initial?: Filters;
}

const CITIES = ['Москва', 'Санкт-Петербург'];
const CATEGORIES = ['История', 'Архитектура', 'Литература', 'Культура'];
const DURATIONS = ['до 1 ч', '1–2 ч', '2+ ч'];

export default function FilterBottomSheet({ onClose, onApply, initial }: Props) {
  const [filters, setFilters] = useState<Filters>(
    initial ?? { city: [], category: [], duration: [] }
  );

  function toggle(key: keyof Filters, value: string) {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }));
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }}
      />

      {/* Sheet */}
      <div
        style={{
          position: 'relative',
          background: '#f5f5f5',
          borderRadius: '24px 24px 0 0',
          padding: '0 0 40px',
          animation: 'slideUp .25s ease-out',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
          <div style={{ width: 40, height: 4, background: '#ccc', borderRadius: 2 }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 24px 16px' }}>
          <h3 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 28, letterSpacing: 2, margin: 0 }}>Фильтры</h3>
          <button onClick={onClose} style={closeBtn}>✕</button>
        </div>

        <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Section label="Город">
            {CITIES.map(v => (
              <Chip key={v} label={v} active={filters.city.includes(v)} onToggle={() => toggle('city', v)} />
            ))}
          </Section>

          <Section label="Категория">
            {CATEGORIES.map(v => (
              <Chip key={v} label={v} active={filters.category.includes(v)} onToggle={() => toggle('category', v)} />
            ))}
          </Section>

          <Section label="Длительность">
            {DURATIONS.map(v => (
              <Chip key={v} label={v} active={filters.duration.includes(v)} onToggle={() => toggle('duration', v)} />
            ))}
          </Section>
        </div>

        {/* Actions */}
        <div style={{ padding: '24px 24px 0', display: 'flex', gap: 12 }}>
          <button
            onClick={() => setFilters({ city: [], category: [], duration: [] })}
            style={{ ...actionBtn, background: '#e0e0e0', flex: 1 }}
          >
            Сбросить
          </button>
          <button
            onClick={() => { onApply(filters); onClose(); }}
            style={{ ...actionBtn, background: '#b1b1b1', flex: 2 }}
          >
            Применить
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 10, fontWeight: 500, letterSpacing: 0.5 }}>
        {label.toUpperCase()}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{children}</div>
    </div>
  );
}

function Chip({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: '8px 16px',
        borderRadius: 30,
        border: 'none',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 500,
        background: active ? '#333' : 'white',
        color: active ? 'white' : '#333',
        transition: 'background .15s, color .15s',
      }}
    >
      {label}
    </button>
  );
}

const closeBtn: CSSProperties = {
  width: 36, height: 36, borderRadius: '50%',
  background: 'white', border: 'none',
  cursor: 'pointer', fontSize: 14,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const actionBtn: CSSProperties = {
  height: 52, borderRadius: 16, border: 'none',
  fontSize: 16, fontWeight: 500, cursor: 'pointer',
};
