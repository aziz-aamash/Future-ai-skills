import { useCallback, useEffect, useState } from 'react';

// Uses countapi.xyz — a free, no-backend hit-counter service.
// Swap NAMESPACE for something unique to your domain before going
// live, since countapi namespaces are globally shared by name.
const NAMESPACE = 'futureaiskills-shujabad-fa2026';
const KEY = 'students-enrolled';
const BASE_COUNT = 480; // starting headcount before the live counter began tracking
const CACHE_KEY = 'fas_student_count_cache';

function readCache() {
  const cached = parseInt(localStorage.getItem(CACHE_KEY), 10);
  return !isNaN(cached) ? cached : BASE_COUNT;
}

function writeCache(total) {
  try { localStorage.setItem(CACHE_KEY, String(total)); } catch (err) { /* ignore */ }
}

// Returns { count, increment }.
// `count` reads from the shared counter on mount (falls back to a cached
// or base value if offline). Call `increment()` whenever a student
// completes registration — e.g. on contact form submit.
export default function useStudentCount() {
  const [count, setCount] = useState(readCache());

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`)
      .then(res => res.json())
      .then(data => {
        if (cancelled) return;
        const hits = (data && typeof data.value === 'number') ? data.value : 0;
        const total = BASE_COUNT + hits;
        setCount(total);
        writeCache(total);
      })
      .catch(() => { /* offline — cached/base value stays visible */ });
    return () => { cancelled = true; };
  }, []);

  const increment = useCallback(async () => {
    try {
      const res = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`);
      const data = await res.json();
      const hits = (data && typeof data.value === 'number') ? data.value : null;
      if (hits !== null) {
        const total = BASE_COUNT + hits;
        setCount(total);
        writeCache(total);
        return;
      }
    } catch (err) { /* fall through to local-only bump */ }
    setCount(prev => {
      const next = prev + 1;
      writeCache(next);
      return next;
    });
  }, []);

  return { count, increment };
}
