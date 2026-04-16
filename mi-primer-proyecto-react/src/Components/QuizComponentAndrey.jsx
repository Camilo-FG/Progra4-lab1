import { useEffect, useState } from "react"
import Comfetti from "react-confetti";
export default function QuizComponentAndrey(){

    const[preguntas, setPreguntas] = useState([]);
    const[showConfetti, setShowConfetti] = useState(false);
    const[currentQuestion, setCurrentQuestion] = useState(0);
    const[selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
        if (preguntas[currentQuestion]?.correctAnswer === index) {
            setShowConfetti(true);
            setTimeout(() => {
                setShowConfetti(false);
                setSelectedAnswer(null);
                if (currentQuestion < preguntas.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                }
            }, 3000);
        }
    }

    useEffect(() => {
        const fetchQuizData = async () => {
            const headers = new Headers();
            headers.append('X-Master-Key', '$2a$10$W57Wigcyb0dXIGr.2ob3DeaBYZVuZQwbJzaK.27QU9QeONdq.e1BC');
            try {
                const response = await fetch('https://api.jsonbin.io/v3/b/69e0586036566621a8bb06fe', { headers });
                const data = await response.json();
                setPreguntas(data.record);

            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        }
        fetchQuizData();

    }, []);
    
    return(
        <>
            {showConfetti && <Comfetti />}
            <div className="quiz-container">
                <h2>QuizComponent</h2>
                <p>{preguntas[currentQuestion]?.question}</p>
                <div className="quiz-options">{preguntas[currentQuestion]?.answers.map((option, index) => {
                    let buttonClass = '';
                    if (selectedAnswer !== null) {
                        if (index === preguntas[currentQuestion]?.correctAnswer) {
                            buttonClass = 'correct';
                        } else if (index === selectedAnswer) {
                            buttonClass = 'incorrect';
                        }
                    }
                    return <button key={index} className={buttonClass} onClick={()=>handleAnswerClick(index)}>{option}</button>
                })}</div>
            </div>
        </>
    )

}
