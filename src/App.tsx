import { useEffect, useMemo, useState } from "react";
import "./App.css";

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3_600_000);
  const minutes = Math.floor((time % 3_600_000) / 60_000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const formatNumber = (num: number) => String(num).padStart(2, "0");
  return {
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds),
    milliseconds: formatNumber(milliseconds),
  };
};

function App() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };
  const handlePause = () => {
    setIsRunning(false);
  };
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formattedTime = useMemo(() => formatTime(time), [time]);

  return (
    <div className="container">
      <div className="stopwatch-wrapper">
        <div className="display-time">
          <div>{formattedTime?.hours}:</div>
          <div>{formattedTime?.minutes}:</div>
          <div>{formattedTime?.seconds}:</div>
          <div>{formattedTime?.milliseconds}</div>
        </div>
        <div className="button-group">
          <button className="start" onClick={handleStart} disabled={isRunning}>
            Start
          </button>
          <button className="start" onClick={handlePause} disabled={!isRunning}>
            Pause
          </button>
          <button className="start" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
