import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(element, replace = false) {
    if (replace === false) {
      history.push(element);
      setHistory(history);
      return setMode(history[history.length - 1]);
    } else {
      history.pop();
      history.push(element);
      setHistory(history);
      return setMode(history[history.length - 1]);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setHistory(history);
      return setMode(history[history.length - 1]);
    } else {
      return setMode(history[history.length - 1]);
    }
  }
  

  return { mode, transition, back };
}

