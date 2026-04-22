import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type CardType = 'quest-text' | 'quest-photo' | 'info';
type View = 'carousel' | 'info-expanded';

interface ForkCard {
  type: CardType;
  label: string;
  taskText: string;
  xp: number;
}

const CARDS: ForkCard[] = [
  {
    type: 'quest-text',
    label: 'квест',
    taskText: 'Это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания',
    xp: 15,
  },
  {
    type: 'quest-photo',
    label: 'квест',
    taskText: 'Это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания это текст задания',
    xp: 20,
  },
  {
    type: 'info',
    label: 'больше\nинформации',
    taskText: '',
    xp: 15,
  },
];

const INFO_TEXT_1 = '   Это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки ';
const INFO_TEXT_2 = '   Это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки это текст справки ';

const XP_PROGRESS = 0.34; // 83/241 from Figma

// Figma layout proportions (based on 441px wide screen):
// center card: left=79 (17.9%), width=283 (64.2%), height=493
// peek card: width=148 (33.6%), left=-100 (-22.7%), right=393 (89.1%)
const CENTER_LEFT = '17.9%';
const CENTER_WIDTH = '64.2%';
const PEEK_LEFT = '-22.7%';
const PEEK_RIGHT = '89.1%';
const PEEK_WIDTH = '33.6%';
const CENTER_H = 400;
const PEEK_H = 310;
const CAROUSEL_H = CENTER_H + 20;

export default function ForkScreen() {
  const { id, wp } = useParams<{ id: string; wp: string }>();
  const navigate = useNavigate();
  const wpIndex = parseInt(wp ?? '0', 10);

  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [view, setView] = useState<View>('carousel');
  const [textAnswer, setTextAnswer] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  const mins = String(Math.floor(seconds / 60)).padStart(1, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  const timerLabel = `${mins}:${secs}`;

  const handleSubmit = () => {
    navigate(`/routes/${id}/result/${wpIndex}`, { state: { isCorrect: true } });
  };
  const handleSkip = () => navigate(`/routes/${id}/nav/${wpIndex + 1}`);
  const handleClose = () => navigate(`/routes/${id}`);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0 && activeIdx < CARDS.length - 1) setActiveIdx(i => i + 1);
      if (dx > 0 && activeIdx > 0) setActiveIdx(i => i - 1);
      setExpanded(false);
    }
    touchStartX.current = null;
  };

  const activeCard = CARDS[activeIdx];

  // ── Info expanded view ──────────────────────────────────────────────────────
  if (view === 'info-expanded') {
    return (
      <div style={{ background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar timer={timerLabel} paused={paused} onPause={() => setPaused(p => !p)} onClose={handleClose} />

        {/* Title + back */}
        <div style={{ padding: '4px 24px 0', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <button
            onClick={() => setView('carousel')}
            style={{ ...ctrlBtn, marginTop: 6, flexShrink: 0 }}
          >
            ‹
          </button>
          <h2 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 40, letterSpacing: 2, margin: 0, lineHeight: 1.1 }}>
            больше<br />информации
          </h2>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 41px' }}>
          <p style={{ margin: '0 0 20px', fontSize: 17, fontWeight: 274, lineHeight: 1.5 }}>{INFO_TEXT_1}</p>
          <p style={{ margin: '0 0 20px', fontSize: 17, fontWeight: 274, lineHeight: 1.5 }}>{INFO_TEXT_2}</p>

          {/* Photo placeholder */}
          <div style={{ background: '#d9d9d9', borderRadius: 20, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <span style={{ color: '#888', fontSize: 16 }}>*фото, если есть</span>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i === 0 ? '#555' : '#d9d9d9' }} />
            ))}
          </div>
        </div>

        {/* XP bar */}
        <div style={{ padding: '0 51px 32px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 274, color: '#000' }}>+ {CARDS[2].xp}XP за любознательность!</p>
          <XpBar />
        </div>
      </div>
    );
  }

  // ── Carousel view ───────────────────────────────────────────────────────────
  return (
    <div style={{ background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar timer={timerLabel} paused={paused} onPause={() => setPaused(p => !p)} onClose={handleClose} />

      {/* Title */}
      <div style={{ padding: '4px 24px 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'GuanoApes', cursive", fontSize: 40, letterSpacing: 2, margin: 0 }}>Развилка</h2>
      </div>

      {/* Carousel */}
      <div
        style={{ flex: 1, position: 'relative', overflow: 'hidden', margin: '20px 0 0' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {CARDS.map((card, i) => {
          const diff = i - activeIdx;
          const isCenter = diff === 0;
          const isLeft = diff < 0;

          const left = isCenter ? CENTER_LEFT : (isLeft ? PEEK_LEFT : PEEK_RIGHT);
          const width = isCenter ? CENTER_WIDTH : PEEK_WIDTH;
          const height = isCenter ? CENTER_H : PEEK_H;
          const topOffset = isCenter ? 0 : (CENTER_H - PEEK_H) / 2;
          const bg = isCenter ? '#bebebe' : 'rgba(197,195,195,0.7)';

          return (
            <div
              key={i}
              onClick={() => {
                if (!isCenter) { setActiveIdx(i); setExpanded(false); return; }
                if (card.type === 'info') { setView('info-expanded'); return; }
                setExpanded(true);
              }}
              style={{
                position: 'absolute',
                left, top: topOffset,
                width, height,
                borderRadius: 34,
                background: bg,
                cursor: 'pointer',
                transition: 'all 0.28s ease',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                alignItems: isCenter ? 'flex-start' : 'center',
                justifyContent: isCenter && !expanded ? 'center' : 'flex-start',
                padding: isCenter ? '22px 20px 16px' : 0,
              }}
            >
              {isCenter && !expanded && (
                /* Label-only state */
                <p style={{
                  fontFamily: "'GuanoApes', cursive",
                  fontSize: card.type === 'info' ? 40 : 80,
                  color: 'white', margin: 0,
                  lineHeight: card.type === 'info' ? 1.1 : 0.77,
                  letterSpacing: 0,
                  whiteSpace: card.type === 'info' ? 'pre-line' : 'nowrap',
                }}>
                  {card.label}
                </p>
              )}

              {isCenter && expanded && card.type !== 'info' && (
                /* Expanded quest card */
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <p style={{ fontFamily: "'GuanoApes', cursive", fontSize: 40, color: 'white', margin: '0 0 12px', letterSpacing: 0, lineHeight: 1.035 }}>
                    {card.label}
                  </p>
                  <p style={{ fontSize: 17, fontWeight: 274, color: '#000', margin: '0 0 12px', lineHeight: 1.45, flex: 1, overflow: 'hidden' }}>
                    {card.taskText}
                  </p>

                  {/* Input area */}
                  {card.type === 'quest-text' ? (
                    <div style={{ background: '#d9d9d9', borderRadius: 20, height: 48, display: 'flex', alignItems: 'center', padding: '0 14px', marginBottom: 10 }}>
                      <input
                        value={textAnswer}
                        onChange={e => setTextAnswer(e.target.value)}
                        placeholder="Впишите ответ..."
                        style={{ background: 'none', border: 'none', outline: 'none', fontSize: 14, fontWeight: 274, color: '#000', width: '100%' }}
                      />
                    </div>
                  ) : (
                    <div style={{ background: '#cdcdcd', borderRadius: 31, height: 84, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, position: 'relative', overflow: 'hidden' }}>
                      {/* Decorative diagonal slashes */}
                      <div style={{ position: 'absolute', left: -8, top: '20%', width: 12, height: 60, background: 'rgba(255,255,255,0.59)', transform: 'rotate(45deg)' }} />
                      <div style={{ position: 'absolute', right: -4, bottom: '10%', width: 10, height: 52, background: 'rgba(255,255,255,0.59)', transform: 'rotate(45deg)' }} />
                      <span style={{ fontSize: 28, opacity: 0.7 }}>📷</span>
                    </div>
                  )}

                  {/* XP bar inside card */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 17, color: '#000', whiteSpace: 'nowrap' }}>11 lvl</span>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <div style={{ height: 13, background: 'white', borderRadius: 20 }} />
                      <div style={{ position: 'absolute', top: 0, left: 0, height: 13, width: `${XP_PROGRESS * 100}%`, background: '#a4a4a4', borderRadius: 20 }} />
                    </div>
                    <span style={{ fontSize: 17, color: '#000', whiteSpace: 'nowrap' }}>12 lvl</span>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 274, opacity: 0.6, marginTop: 2 }}>+ {card.xp}XP</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Проверить — shown when expanded quest */}
      {expanded && (activeCard.type === 'quest-text' || activeCard.type === 'quest-photo') && (
        <div style={{ padding: '12px 99px 0' }}>
          <button
            onClick={handleSubmit}
            style={{ width: '100%', height: 57, borderRadius: 30, background: '#a4a4a4', border: 'none', fontSize: 17, fontWeight: 500, cursor: 'pointer' }}
          >
            Проверить
          </button>
        </div>
      )}

      {/* Пропустить */}
      <div style={{ padding: '12px 24px 36px', textAlign: 'center' }}>
        <button onClick={handleSkip} style={{ background: 'none', border: 'none', fontSize: 17, cursor: 'pointer', color: '#000' }}>
          Пропустить
        </button>
      </div>
    </div>
  );
}

// ── Shared sub-components ────────────────────────────────────────────────────

function TopBar({ timer, paused, onPause, onClose }: {
  timer: string; paused: boolean;
  onPause: () => void; onClose: () => void;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px 0' }}>
      <span style={{ fontSize: 17, fontWeight: 274, opacity: 0.5, letterSpacing: 0.85 }}>{timer}</span>
      <div style={{ display: 'flex', gap: 7 }}>
        <button onClick={onPause} style={ctrlBtn}>{paused ? '▶' : '⏸'}</button>
        <button onClick={onClose} style={ctrlBtn}>✕</button>
      </div>
    </div>
  );
}

function XpBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 17, color: '#000' }}>11 lvl</span>
      <div style={{ flex: 1, position: 'relative', height: 14 }}>
        <div style={{ position: 'absolute', inset: 0, background: '#d9d9d9', borderRadius: 20 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${XP_PROGRESS * 100}%`, background: '#a4a4a4', borderRadius: 20 }} />
      </div>
      <span style={{ fontSize: 17, color: '#000' }}>12 lvl</span>
    </div>
  );
}

const ctrlBtn: React.CSSProperties = {
  width: 45, height: 45, borderRadius: '50%',
  background: '#dedede', border: 'none',
  cursor: 'pointer', fontSize: 16,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
