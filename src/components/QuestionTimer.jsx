import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(timeout);

  useEffect(() => {
    console.log("setting timeout")
    const timer = setTimeout(() => {
      onTimeout();
    }, timeout);

    return () => {
        clearTimeout(timer)
    }
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("setting interval")
    const interval = setInterval(() => {
      setTimeLeft((prevState) => prevState - 100);
    }, 100);

    return () => {
        clearInterval(interval)
    };
  }, []);

  return <progress id="question-time" max={timeout} value={timeLeft} />;
}
