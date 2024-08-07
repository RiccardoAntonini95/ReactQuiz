import { useState, useCallback } from "react";
import questions from "../questions";
import QuestionTimer from "./QuestionTimer";
import quizCompleted from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = userAnswers.length === questions.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevState) => {
      return [...prevState, selectedAnswer];
    });
  }, [])

  const handleSkipAnswer = useCallback(() => {handleSelectAnswer(null)}, [handleSelectAnswer])


  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleted} alt="Trophy icon for completing quiz" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...questions[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5); //con lo 0.5 sottratto ottengo al 50% dei casi un numero negativo
  //il sort swappa due elementi se ha un numero negativo altrimenti no, quindi con il caso li mischia

  return (
    <div id="quiz">
      <div id="question">
        {/* Aggiungendo una key a questo componente faccio si che al cambiamento della key react distrugga il vecchio componente e quindi mi vada a 
        resettare la prop del timeout a 15000 così il timer rinizia */} 
        <QuestionTimer key={activeQuestionIndex} timeout={15000} onTimeout={handleSkipAnswer} />
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
