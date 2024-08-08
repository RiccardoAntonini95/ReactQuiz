import { useState, useCallback } from "react";
import questions from "../questions";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import Summary from "./Summary";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  let timer = 15000

  if(answerState === "answered" || answerState === "correct" || answerState === "wrong"){
    timer = 1000
  }

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1; //se ho appena risposto voglio vedere ancora la stessa domanda
  const quizIsComplete = userAnswers.length === questions.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevState) => {
        return [...prevState, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === questions[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState(""); //resetto lo state per procedere con la prossima domanda
        }, 1000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <Summary userAnswers={userAnswers} />
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        {/* Aggiungendo una key a questo componente faccio si che al cambiamento della key react distrugga il vecchio componente e quindi mi vada a 
        resettare la prop del timeout a 15000 così il timer rinizia */}
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={timer}
          onTimeout={answerState === ''? handleSkipAnswer : () => {}}
          answerState={answerState}
        />
        <h2>{questions[activeQuestionIndex].text}</h2>
        <Answers
          key={`${activeQuestionIndex}-bis`} //same here, voglio lo shuffle all'interno di questo componente al cambio delle domande ma necessito di key differente da quella sopra
          answers={questions[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  );
}
