import quizLogo from './assets/quiz-logo.png'

export default function Header(){
    return(
        <header>
        <img src={quizLogo} alt="logo with a paper for the quiz and a pen" />
        <h1>ReactQuiz</h1>
        </header>
    )
}