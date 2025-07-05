import React, { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./supabase";

// PUBLIC_INTERFACE
const CHAPTERS = [
  {
    title: "The Sunny Start",
    text: "Once upon a time, in a world full of color, lived a giggly yellow Sun and her friends.",
    character: "sun",
  },
  {
    title: "The Splashy Adventure",
    text: "Sunny’s best pal, Splash the Whale, loved making waves & giggling all day long.",
    character: "whale",
  },
  {
    title: "Monkey’s Big Leap",
    text: "Bop the Monkey was swinging high, always up for bananas and fun surprises.",
    character: "monkey",
  }
];

// SVG Placeholder characters -- in a real app, replace with real SVG or Lottie
function SunSVG({ className = "", style = {} }) {
  // Sun: round, smiley, with rays
  return (
    <svg viewBox="0 0 120 120" width="100" height="100" className={className} style={style}>
      <circle cx="60" cy="60" r="36" fill="#FFD93B" stroke="#FFD93B" />
      {[...Array(12)].map((_,i)=>(
        <line
          key={i}
          x1={60}
          y1={12}
          x2={60}
          y2={0}
          stroke="#FFD93B"
          strokeWidth="5"
          transform={`rotate(${i*30} 60 60)`}
        />
      ))}
      <ellipse cx="75" cy="65" rx="6" ry="6" fill="#FFF" opacity="0.4"/>
      <ellipse cx="45" cy="65" rx="6" ry="6" fill="#FFF" opacity="0.35"/>
      <ellipse cx="60" cy="78" rx="17" ry="8" fill="#FFF" opacity="0.07"/>
      {/* Eyes */}
      <ellipse cx="52" cy="58" rx="3" ry="4" fill="#692e1b"/>
      <ellipse cx="68" cy="58" rx="3" ry="4" fill="#692e1b"/>
      {/* Smile */}
      <path d="M 54,72 Q 60,78 66,72" stroke="#692e1b" strokeWidth="2.2" fill="none"/>
    </svg>
  );
}
function WhaleSVG({ className="", style={} }) {
  // Simple rounded whale
  return (
    <svg viewBox="0 0 120 90" width="110" height="85" className={className} style={style}>
      <ellipse cx="60" cy="60" rx="45" ry="26" fill="#71D6FF" />
      <ellipse cx="90" cy="53" rx="16" ry="12" fill="#71D6FF" />
      <ellipse cx="35" cy="66" rx="27" ry="16" fill="#A3ECFF" opacity="0.5"/>
      {/* Fin */}
      <ellipse cx="50" cy="80" rx="9" ry="4" fill="#4ED1E7"/>
      {/* Tail */}
      <path d="M108,55 Q117,50 113,67 Q107,56 115,64" stroke="#4ED1E7" strokeWidth="4.5" fill="none"/>
      {/* Smile */}
      <path d="M 93 68 Q 92 62 87 66" stroke="#26757B" strokeWidth="2.5" fill="none"/>
      {/* Eye */}
      <ellipse cx="98" cy="54" rx="2" ry="3" fill="#26757B"/>
    </svg>
  );
}
function MonkeySVG({ className="", style={} }) {
  // Playful, round monkey face
  return (
    <svg viewBox="0 0 120 110" width="94" height="88" className={className} style={style}>
      <ellipse cx="60" cy="62" rx="36" ry="33" fill="#FFE0A7"/>
      {/* face */}
      <ellipse cx="60" cy="82" rx="23" ry="13" fill="#FFF4D2"/>
      {/* head shadow */}
      <ellipse cx="41" cy="62" rx="17" ry="19" fill="#E2A271"/>
      <ellipse cx="79" cy="62" rx="17" ry="19" fill="#E2A271"/>
      {/* cheeks */}
      <ellipse cx="49" cy="80" rx="3" ry="3" fill="#E2A271" opacity="0.4"/>
      <ellipse cx="71" cy="80" rx="3" ry="3" fill="#E2A271" opacity="0.4"/>
      {/* eyes */}
      <ellipse cx="53" cy="70" rx="3" ry="5" fill="#583152"/>
      <ellipse cx="67" cy="70" rx="3" ry="5" fill="#583152"/>
      {/* smile */}
      <path d="M 54,86 Q 60,93 66,86" stroke="#644626" strokeWidth="2" fill="none"/>
      {/* ear outlines */}
      <ellipse cx="20" cy="76" rx="11" ry="13" fill="#FFE0A7"/>
      <ellipse cx="100" cy="76" rx="11" ry="13" fill="#FFE0A7"/>
    </svg>
  );
}

// Component mapping for clarity
const CHARACTER_MAP = {
  sun: SunSVG,
  whale: WhaleSVG,
  monkey: MonkeySVG,
};

// Accessible color mapping for SVG accents
const CHARACTER_COLOR_CLASSES = {
  sun: "drop-shadow-md",
  whale: "drop-shadow-md",
  monkey: "drop-shadow-md"
};

// Styled, animated Home (House) SVG
function HomeIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 38 38" width="38" height="38">
      <rect x="12" y="22" width="14" height="11"
            rx="3.2" fill="#FFD93B" stroke="#FFD93B" />
      <polygon points="19,6 5,20 33,20" fill="#2EC4B6" stroke="#FFD93B" strokeWidth="2.3"/>
      <rect x="15.7" y="27" width="6.6" height="6.2" rx="2.3" fill="#E71D36" />
      <circle cx="33" cy="18.5" r="3" fill="#FFED89" />
    </svg>
  );
}

// Animated toast
function Toast({ open, children }) {
  // Fade in/out with slide and pop
  return (
    <div
      className={`fixed bottom-7 z-50 left-1/2 -translate-x-1/2 transition-all
        ${open?'opacity-100 translate-y-0':'opacity-0 translate-y-5 pointer-events-none'}
        bg-white/90 rounded-full px-5 py-3 shadow-lg border-2 border-primary font-bold text-accent text-base`}
      style={{ minWidth: 140, pointerEvents: open?'auto':'none', transitionDuration: '0.7s' }}>
      <span>{children}</span>
      <span className="ml-2 inline-block animate-bounceY text-primary">✔️</span>
    </div>
  );
}

// Soft animated gradient/clouds background (optional)
function AnimatedBackground() {
  // Simple: animated gradient + floating pastel "clouds"
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at top, #FFF9DE 70%, #E0ECFF 100%)",
        minHeight: "100vh"
      }}
    >
      <div className="absolute left-0 top-0 w-full h-full">
        {/* Clouds */}
        <div
          className="absolute left-8 top-12 w-52 h-16 rounded-full bg-white/60 blur-2xl animate-blob1"
        />
        <div
          className="absolute right-12 top-40 w-36 h-16 rounded-full bg-blue-100/80 blur-xl animate-blob2"
        />
        <div
          className="absolute right-2 bottom-16 w-32 h-11 rounded-full bg-pink-100/70 blur-md animate-blob3"
        />
      </div>
    </div>
  );
}

// Keyframes for blobs and basic animation in Tailwind config

// PUBLIC_INTERFACE
function useProgress(userId) {
  const [loading, setLoading] = useState(false);
  const [lastChapter, setLastChapter] = useState(0);
  const [error, setError] = useState(null);

  // PUBLIC_INTERFACE
  async function loadProgress(uid) {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("progress")
      .select("last_chapter")
      .eq("user_id", uid)
      .maybeSingle();
    if (error) setError(error.message);
    setLastChapter(data?.last_chapter ?? 0);
    setLoading(false);
    return data?.last_chapter ?? 0;
  }

  // PUBLIC_INTERFACE
  async function saveProgress(uid, chapterIdx) {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from("progress")
      .upsert({ user_id: uid, last_chapter: chapterIdx });
    if (error) setError(error.message);
    setLoading(false);
  }

  return { lastChapter, loadProgress, saveProgress, loading, error };
}

function useSwipeable(onSwipeLeft, onSwipeRight) {
  // Minimal swipe for mobile/desktop
  const startX = useRef(null);
  const valid = typeof window !== "undefined";
  useEffect(() => {
    if (!valid) return;
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) startX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
      if (startX.current !== null && e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - startX.current;
        if (dx < -40) onSwipeLeft();
        else if (dx > 40) onSwipeRight();
        startX.current = null;
      }
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight]); // Only set up if handler changes
}

function ProgressIndicator({ idx, total }) {
  return (
    <span className="select-none rounded-full bg-white border-2 border-primary px-5 py-1 shadow
       font-bold text-accent text-base tracking-wide"
    >
      Page <span className="text-primary">{idx+1}</span> of <span className="text-secondary">{total}</span>
    </span>
  );
}

// PUBLIC_INTERFACE
function AnimatedCharacter({ character, onClick }) {
  // Animation states: idle (wiggle/blink), hover (pulse/glow), click (bounce/rotate)
  const [anim, setAnim] = useState("");
  const [idle, setIdle] = useState(true);
  const [smile, setSmile] = useState(false);
  const timeoutRef = useRef(null);

  // Idle: wiggle every N sec
  useEffect(() => {
    if (!idle) return;
    const idler = setTimeout(() => {
      setAnim("animate-wiggle");
      setTimeout(() => setAnim(""), 900);
    }, 2000 + Math.random()*2500);
    return () => clearTimeout(idler);
  }, [idle, anim]);

  // Click triggers bounce/rotate/smile
  const handleClick = () => {
    setSmile(true);
    setAnim(
      character === "monkey"
        ? "animate-bounceY"
        : character === "whale"
        ? "animate-wave"
        : "animate-bounceY"
    );
    setTimeout(() => {
      setSmile(false);
      setAnim("");
    }, 700);
    if (onClick) onClick();
  };

  // Hover triggers pulse/glow
  const handleMouseEnter = () => {
    setIdle(false);
    setAnim("animate-pulseGlow");
    setTimeout(() => setAnim(""), 500);
  };
  const handleMouseLeave = () => {
    setIdle(true);
  };

  const CharacterSVG = CHARACTER_MAP[character] || SunSVG;
  return (
    <button
      aria-label="Animated Story Character"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`outline-none bg-none border-none cursor-pointer transition-all 
        focus:ring-accent active:scale-95 p-0 block
        mx-auto drop-shadow-lg min-w-[110px]  ${CHARACTER_COLOR_CLASSES[character]} ${anim}`}
      style={{
        width: "110px", height: "110px", minHeight: 90, minWidth: 90
      }}
      tabIndex={0}
    >
      <CharacterSVG
        className={`transition-all duration-200 ${smile ? "saturate-150" : ""} `}
      />
    </button>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  const [stage, setStage] = useState("start");
  const [userId, setUserId] = useState("");
  const [inputId, setInputId] = useState("");
  const [chapterIdx, setChapterIdx] = useState(0);

  const { lastChapter, loadProgress, saveProgress, loading, error } = useProgress(userId);

  // Toast state for saved progress
  const [showToast, setShowToast] = useState(false);

  // Load progress after user submits ID
  useEffect(() => {
    if (stage === "story" && userId) {
      (async () => {
        const savedIdx = await loadProgress(userId);
        setChapterIdx(savedIdx || 0);
      })();
    }
    // eslint-disable-next-line
  }, [stage, userId]);

  // Save progress on chapter change
  useEffect(() => {
    if (stage === "story" && userId) {
      saveProgress(userId, chapterIdx);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1400);
    }
    // eslint-disable-next-line
  }, [chapterIdx]);

  // Swipe navigation (mobile+desktop)
  useSwipeable(
    () => { if (stage==="story" && chapterIdx < CHAPTERS.length-1) nextChapter(); },
    () => { if (stage==="story" && chapterIdx > 0) prevChapter(); }
  );

  function handleStart() {
    if (!inputId.trim()) return;
    setUserId(inputId.trim());
    setStage("story");
  }
  function handleRestart() {
    setInputId("");
    setUserId("");
    setStage("start");
    setChapterIdx(0);
  }
  function homeToStart() {
    handleRestart();
  }
  function nextChapter() {
    setChapterIdx((idx) => Math.min(idx + 1, CHAPTERS.length - 1));
  }
  function prevChapter() {
    setChapterIdx((idx) => Math.max(idx - 1, 0));
  }

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handler = (e) => {
      if (stage !== "story") return;
      if (e.key === "ArrowRight") nextChapter();
      if (e.key === "ArrowLeft") prevChapter();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line
  }, [stage, chapterIdx]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center font-playful text-lg text-primary bg-storybg selection:bg-accent/20">
      <AnimatedBackground />
      <Toast open={showToast}>Progress saved!</Toast>

      {/* Floating home button */}
      {stage === "story" && (
        <button
          className="fixed z-30 top-4 left-3 md:top-6 md:left-8 w-14 h-14 p-2 rounded-full bg-white/90 border-2 border-accent shadow-lg flex items-center justify-center transition-all hover:scale-110 focus:ring-2 focus:ring-accent"
          style={{ minWidth: 48, minHeight: 48 }}
          onClick={homeToStart}
          aria-label="Go Home"
        >
          <HomeIcon className="w-10 h-10" />
        </button>
      )}
      {/* Main content */}
      {stage === "start" && (
        <div className="z-10 flex flex-col gap-6 items-center justify-center min-h-screen p-4 relative">
          <h1 className="text-5xl sm:text-6xl text-accent font-extrabold font-playful drop-shadow-lg tracking-wide mb-4">
            🌈 BrightTales!
          </h1>
          <p className="text-2xl text-secondary font-bold font-playful mb-2">
            A magical story adventure for little readers
          </p>
          <input
            aria-label="Your Name"
            placeholder="Enter your name..."
            className="rounded-xl px-4 py-4 border-2 border-accent/70 text-xl focus:ring-accent outline-none text-primary font-bold font-playful bg-white shadow w-[260px] max-w-full mb-1 transition-all"
            value={inputId}
            onChange={e => setInputId(e.target.value)}
            maxLength={18}
            style={{ minHeight: 48 }}
            autoFocus
          />
          {/* Start Button */}
          <button
            className="mx-auto bg-accent text-white font-extrabold text-2xl rounded-full px-12 py-4 my-4 shadow-lg
              transition-transform active:scale-95 hover:scale-105 duration-300
              animate-startBounce w-[220px] min-h-[54px] focus:ring-4 focus:ring-accent"
            style={{
              fontFamily: "'Fredoka One', 'Baloo 2', 'Comic Neue', cursive, sans-serif",
              minWidth: 120,
              minHeight: 54,
              letterSpacing: "0.04em"
            }}
            onClick={handleStart}
            disabled={!inputId.trim()}
          >
            <span className="inline-block">Start</span>
            <span className="ml-2 animate-bounceY text-3xl">👉</span>
          </button>
          <p className="italic text-primary/70 text-base my-0 font-body">No sign up needed. Progress is saved!</p>
        </div>
      )}

      {stage === "story" && (
        <div className="z-10 w-full max-w-2xl flex flex-col items-center min-h-screen pt-24 pb-16 p-1 mx-auto relative">
          {/* Top row: Progress indicator */}
          <div className="flex w-full justify-center items-center mb-2 z-20">
            <ProgressIndicator idx={chapterIdx} total={CHAPTERS.length} />
          </div>
          {/* Story Card */}
          <div
            className="relative flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl border-4 border-accent
              py-10 px-3 mx-auto my-4 transition-all
              animate-[floatCard_2s_ease-in-out_infinite] min-h-[320px] max-w-xs sm:max-w-md"
            style={{
              minWidth: 280,
              width: "97vw",
              maxWidth: 384,
            }}
          >
            {/* Character, animated */}
            <AnimatedCharacter character={CHAPTERS[chapterIdx].character} />
            {/* Speech bubble */}
            <div className="mt-1 w-full flex flex-col justify-center items-center">
              <div
                className="relative inline-block bg-gradient-to-br from-[#FFF9DE] to-[#FAF2FF]
                  border-2 border-primary rounded-2xl px-6 pt-7 pb-8 mt-1 shadow
                  min-h-[80px] min-w-[180px] text-center font-body text-lg sm:text-xl
                  animate-[speechPop_0.6s]"
                style={{
                  fontFamily: "'Comic Neue','Fredoka One',cursive,sans-serif",
                }}
              >
                <span className="text-primary">
                  {CHAPTERS[chapterIdx].text}
                </span>
                {/* Bubble tail - left under character */}
                <span
                  className="absolute -top-3 left-8 w-7 h-7"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFF9DE 84%, #FFECA1 100%)",
                    borderBottomLeftRadius: "60% 80%",
                    transform: "rotate(-30deg)",
                    clipPath: "ellipse(52% 70% at 53% 85%)",
                  }}
                ></span>
              </div>
              <div className="mt-2 mb-2">
                <span className="font-playful text-accent font-extrabold text-xl">
                  {CHAPTERS[chapterIdx].title}
                </span>
              </div>
            </div>
          </div>
          {/* Navigation arrows/prev/next */}
          <div className="w-full flex justify-between items-center absolute left-0 bottom-8 px-4 select-none pointer-events-none">
            <div className="flex-1 flex justify-start pointer-events-auto">
              {chapterIdx > 0 && (
                <button
                  className="w-16 h-16 min-w-[48px] min-h-[48px] flex items-center justify-center
                    bg-secondary/90 rounded-full text-white text-4xl shadow-lg border-2 border-primary
                    transition-all hover:scale-115 hover:bg-secondary/100 focus:ring-4 focus:ring-accent
                    animate-arrowBounce"
                  onClick={prevChapter}
                  aria-label="Previous Page"
                  tabIndex={0}
                  style={{ outline: "none", marginLeft: 0 }}
                >
                  <span className="inline-block -ml-1 animate-bounceY">←</span>
                </button>
              )}
            </div>
            <div className="flex-1 flex justify-end pointer-events-auto">
              {chapterIdx < CHAPTERS.length - 1 ? (
                <button
                  className="w-16 h-16 min-w-[48px] min-h-[48px] flex items-center justify-center
                    bg-accent/90 rounded-full text-white text-4xl shadow-lg border-2 border-primary
                    transition-all hover:scale-115 hover:bg-accent/100 focus:ring-4 focus:ring-accent
                    animate-arrowBounce"
                  onClick={nextChapter}
                  aria-label="Next Page"
                  tabIndex={0}
                  style={{ outline: "none", marginRight: 0 }}
                >
                  <span className="inline-block animate-bounceY">→</span>
                </button>
              ) : (
                <span className="text-lg font-extrabold text-primary pointer-events-none select-none pl-2">🎉</span>
              )}
            </div>
          </div>
          {/* Bottom blurb */}
          <div className="flex flex-col w-full items-center justify-center mt-20 mb-2">
            {loading && (
              <span className="flex items-center text-primary font-bold text-base">
                Saving...
                <span className="animate-bounceY ml-2">💾</span>
              </span>
            )}
            {error && (
              <span className="text-accent font-bold mt-2">Error: {error}</span>
            )}
            <span className="text-sm text-secondary/70 mt-2">Progress auto-saved</span>
          </div>
        </div>
      )}
    </div>
  );
}
