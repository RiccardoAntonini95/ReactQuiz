import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}){
    const shuffledAnswers = useRef();
 
  if(!shuffledAnswers.current){
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); //con lo 0.5 sottratto ottengo al 50% dei casi un numero negativo
    //il sort swappa due elementi se ha un numero negativo altrimenti no, quindi con il caso li mischia
  }

    return (
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            let cssClasses = "";
            const isSelected = selectedAnswer === answer; //controllo l'ultima risposta dello state per verificare se è stata selezionata

            if(answerState === 'answered' && isSelected){
              cssClasses = 'selected'
              console.log(answerState + "sono nell'if di answered")
            } 

            if((answerState === 'correct' || answerState === 'wrong') && isSelected){
              cssClasses = answerState; //quindi correct o wrong
              console.log(answerState + "sono nell'if correct o wrong")
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => onSelect(answer)}
                  className={cssClasses}
                  disabled={answerState !== "" && !isSelected}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
    )
}