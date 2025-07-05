import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase';

const CHAPTERS = [
  {
    title: "The Sunny Start",
    text: "Once upon a time, in a world full of color, lived a giggly yellow Sun and her friends.",
    character: "sun",
  },
  {
    title: "The Splashy Adventure",
    text: "Sunny’s best pal, Splash the Whale, loved making waves & giggling all day long.",
    character: "whale"
  },
  {
    title: "Monkey’s Big Leap",
    text: "Bop the Monkey was swinging high, always up for bananas and fun surprises.",
    character: "monkey"
  }
];

const CHARACTER_EMOJIS = {
  sun: "☀️",
  whale: "🐳",
  monkey: "🐵"
};

const CHARACTER_COLORS = {
  sun: "text-yellow-400",
  whale: "text-secondary",
  monkey: "text-accent"
};

const PRIMARY_BTN = "bg-primary text-white shadow-md font-bold rounded px-6 py-2 my-2 active:scale-95 transition-transform";
const SECONDARY_BTN = "bg-secondary text-white font-bold rounded px-4 py-2 mx-2 active:scale-95";

function useProgress(userId) {
  const [loading, setLoading] = useState(false);
  const [lastChapter, setLastChapter] = useState(0);
  const [error, setError] = useState(null);

  // PUBLIC_INTERFACE
  async function loadProgress(uid) {
    setLoading(true); setError(null);
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
    setLoading(true); setError(null);
    const { error } = await supabase
      .from("progress")
      .upsert({ user_id: uid, last_chapter: chapterIdx });
    if (error) setError(error.message);
    setLoading(false);
  }

  return { lastChapter, loadProgress, saveProgress, loading, error };
}

// PUBLIC_INTERFACE
function AnimatedCharacter({ character, onClick }) {
  const [anim, setAnim] = useState("");
  const timeoutRef = useRef(null);

  const handleClick = () => {
    setAnim((character === "monkey") ? "animate-bounceY" :
      (character === "whale") ? "animate-wave" : "animate-bounceY");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAnim(""), 700);
    if (onClick) onClick();
  };

  return (
    <button
      aria-label="Animated Story Character"
      onClick={handleClick}
      className={"text-[85px] md:text-[110px] transition-all drop-shadow-lg " + CHARACTER_COLORS[character] + " " + anim}
      tabIndex={0}
      style={{ outline: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      {CHARACTER_EMOJIS[character]}
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

  // Load progress after user submits ID
  useEffect(() => {
    if (stage === "story" && userId) {
      (async () => {
        const saved = await loadProgress(userId);
        setChapterIdx(saved || 0);
      })();
    }
    // eslint-disable-next-line
  }, [stage, userId]);

  // Save progress on chapter change
  useEffect(() => {
    if (stage === "story" && userId) {
      saveProgress(userId, chapterIdx);
    }
    // eslint-disable-next-line
  }, [chapterIdx]);

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

  function nextChapter() {
    setChapterIdx(idx => Math.min(idx + 1, CHAPTERS.length - 1));
  }
  function prevChapter() {
    setChapterIdx(idx => Math.max(idx - 1, 0));
  }

  return (
    <div className="w-full min-h-screen bg-storybg flex flex-col items-center font-playful text-lg text-primary">
      {stage === "start" && (
        <div className="flex flex-col gap-6 items-center justify-center h-screen p-4">
          <h1 className="text-4xl text-accent font-extrabold">🌈 Welcome to BrightTales!</h1>
          <p className="text-xl text-secondary">A magical story adventure for little readers</p>
          <input
            aria-label="Your Name"
            placeholder="Enter your name..."
            className="rounded px-4 py-3 border-2 border-accent text-lg focus:ring-accent outline-none text-accent font-bold bg-white shadow"
            value={inputId}
            onChange={e => setInputId(e.target.value)}
            maxLength={18}
            style={{ width: 240 }}
          />
          <button
            className={"mt-2 " + PRIMARY_BTN}
            style={{ fontFamily: "Fredoka One, cursive" }}
            onClick={handleStart}
            disabled={!inputId.trim()} >
            Start Reading
          </button>
          <p className="italic text-primary/70 text-xs">No sign up needed. Progress will be saved!</p>
        </div>
      )}
      {stage === "story" && (
        <div className="flex flex-col items-center w-full min-h-screen p-2 pt-12 max-w-md mx-auto">
          <div className="flex w-full justify-between p-2 mb-2">
            <button className={"text-xs " + SECONDARY_BTN} onClick={handleRestart}>← Restart</button>
            <span className="text-right text-accent font-extrabold text-md">Hello, {userId}!</span>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow-lg py-8 px-4 border-2 border-primary mb-6">
            <AnimatedCharacter character={CHAPTERS[chapterIdx].character} />
            <h2 className="text-2xl font-extrabold text-accent my-2">{CHAPTERS[chapterIdx].title}</h2>
            <p className="text-primary font-body text-[1.2em] my-4">{CHAPTERS[chapterIdx].text}</p>
          </div>
          <div className="flex w-full justify-center gap-6">
            <button
              className={SECONDARY_BTN}
              onClick={prevChapter}
              disabled={chapterIdx === 0}
              aria-label="Previous page"
            >Prev</button>
            {chapterIdx < CHAPTERS.length - 1 ? (
              <button
                className={PRIMARY_BTN}
                onClick={nextChapter}
                aria-label="Next page"
              >Next</button>
            ) : (
              <span className="font-bold text-accent/80">The End!</span>
            )}
          </div>
          {loading && (<p className="text-primary text-xs mt-4">Saving or loading...</p>)}
          {error && (<p className="text-accent font-bold mt-2">Error: {error}</p>)}
          <p className="text-xs text-secondary/70 mt-8 mb-2">Your page progress is auto-saved.</p>
        </div>
      )}
    </div>
  );
}
