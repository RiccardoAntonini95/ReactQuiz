import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, answerState }) {
  const [timeLeft, setTimeLeft] = useState(timeout);

  useEffect(() => {
    setTimeLeft(timeout)
    const timer = setTimeout(() => {
      onTimeout();
    }, timeout);

    return () => {
        clearTimeout(timer)
    }
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevState) => prevState - 100);
    }, 100);

    return () => {
        clearInterval(interval)
    };
  }, []);

  return <progress id="question-time" max={timeout} value={timeLeft} className={answerState} />;
}
