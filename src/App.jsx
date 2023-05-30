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

  if (!start) {
    return (
      <div className="flex items-center justify-center bg-[#b32b2b] text-[#F0F0F0] h-screen font-arvo">
        <button
          className="text-4xl bg-red-800 p-2 rounded-lg"
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
      <div className="flex flex-col items-center justify-center bg-[#b32b2b] text-[#F0F0F0] h-screen font-arvo">
        <h1 className="text-4xl">Workout Complete!</h1>
        <span>
          time: {Math.round(timer / 1000 / 60)}m{" "}
          {Math.round((timer / 1000) % 60)}s
        </span>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex items-center justify-center bg-[#b32b2b] text-[#F0F0F0] h-screen font-arvo">
          <button
            className="text-4xl bg-red-800 p-2 rounded-lg"
            onClick={handleExerciseClick}
          >
            {exercises[currentExercise].name} x{exercises[currentExercise].reps}
          </button>
        </div>
      </>
    );
  }
}

export default App;
