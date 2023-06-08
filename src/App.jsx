import { useState, useEffect } from "react";

function App() {
  const [start, setStart] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [counterSet, setCounterSet] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [showFinalPage, setShowFinalPage] = useState(false);
  const [timer, setTimer] = useState(0);

  const exercises = [
    {
      name: "push ups",
      reps: 15,
    },
    {
      name: "abs",
      reps: 20,
    },
    {
      name: "squats",
      reps: 20,
    },
    {
      name: "legs",
      reps: 20,
    },
  ];

  const handleExerciseClick = () => {
    setCounterSet(counterSet + 1);
    if (counterSet === 2) {
      setCounterSet(0);
      if (currentExercise === exercises.length - 1) {
        setCurrentExercise(0);
        setCycleCount(cycleCount + 1);
      } else {
        setCurrentExercise(currentExercise + 1);
      }
    }
  };

  useEffect(() => {
    if (cycleCount === 2) {
      setShowFinalPage(true);
      // Calculate the time taken from start to finish and set the timer state
      const endTime = new Date().getTime();
      const startTime = sessionStorage.getItem("startTime");
      const timeDifference = endTime - startTime;
      setTimer(timeDifference);
    }
  }, [cycleCount]);

  useEffect(() => {
    if (start && !showFinalPage) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1000);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [start, showFinalPage]);

  if (!start) {
    return (
      <div className="flex items-center justify-center bg-[#1e1e1e] text-[#dc143c] h-screen font-moirai">
        <button
          className="text-8xl bg-[#1e1e1e] p-2 rounded-lg"
          onClick={() => {
            setStart(true);
            sessionStorage.setItem("startTime", new Date().getTime());
          }}
        >
          Minimal Workout
        </button>
      </div>
    );
  } else if (showFinalPage) {
    return (
      <div className="flex flex-col items-center justify-center text-[#1e1e1e] bg-[#dc143c] h-screen font-moirai">
        <h1 className="text-[15vh] uppercase font-bold">FINISH</h1>
        <span className="text-[45vh] uppercase text-center bg-none">
          {Math.round(timer / 1000 / 60)}m {Math.round((timer / 1000) % 60)}s
        </span>
      </div>
    );
  } else {
    const lineWidth = `${(counterSet + 1) * 33}%`;
    const lineStyle = {
      width: lineWidth,
      transition: "width 0.3s ease-in-out",
    };

    return (
      <>
        <div className="flex items-center justify-center text-[#dc143c] min-h-screen font-inter bg-[#1e1e1e]">
          <span className="absolute font-moirai text-[55vh] text-center h-screen top-0 bg-none">
            {Math.round(timer / 1000 / 60)}m {Math.round((timer / 1000) % 60)}s
          </span>
          <button
            className="absolute bottom-0 text-6xl bg-[#1e1e1e] text-[#dc143c] p-4 rounded-xl uppercase font-moirai shadow-lg hover:shadow-xl font-bold"
            onClick={handleExerciseClick}
          >
            {exercises[currentExercise].name} x{exercises[currentExercise].reps}
          </button>
          <div
            className="absolute bottom-0 left-0 bg-[#dc143c] h-1"
            style={lineStyle}
          ></div>
        </div>
      </>
    );
  }
}

export default App;
