import { useEffect, useState } from "react";
import Confetti from 'react-confetti';

export default function QuizComponent() {

    const [preguntas, setPreguntas] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleAnswerClick = (index) => {
    if (preguntas[0].correctAnswer === index) {
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    }
  }
 
    useEffect(() => {
        const fetchQuiz = async () => {
            const headers = new Headers(); //se crea un obj Header para añadir la credencial de acceso "secret"
            headers.append("X-Master-Key", "$2a$10$7mhbjKDIvNhb0DNToVgyjOqc0tU/ucm1qyhX0lnCxJVJisK1s4NQO"); //esta clave se pone aqui solo para efectos del ejemplo, pero JAMÁS se debe de hacer por temas de seguridad 

            try {
                const response = await fetch("https://api.jsonbin.io/v3/b/69e05287856a6821893bf7e8", { headers });
                const data = await response.json();
                setPreguntas(data.record);
            } catch (error) {
                console.log("Error fetching quiz data", error);
            }
        }

        fetchQuiz();
    }, []); 
    
    return(
        <>
        {showConfetti && <Confetti />}

        <div>
            <h2>Quiz Component</h2>
            <p>{preguntas[0]?.question}</p>

            <div>
                {preguntas[0]?.answers.map((option, index) => (
                    <button key={index} onClick={() => handleAnswerClick(index)}>{option}</button>
                ))}
            </div>
        </div>
        </>
    )
}