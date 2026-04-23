import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
// import Confetti from "react-confetti";
export default function QuizComponent() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    // cargar desde JSONBin
    const key = import.meta.env.VITE_JSONBIN_MASTER_KEY;

    useEffect(() => {


        const fetchQuiz = async () => {
            const headers = new Headers();
            headers.append("X-Access-Key", key);
            try {

                const response = await fetch("https://api.jsonbin.io/v3/b/69dd6a83856a6821892e43e7", { headers });
                const data = await response.json();
                setQuestions(data.record);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };
        fetchQuiz();
    }, []);
    const handleAnswer = (option) => {
        if (showFeedback) return;

        setSelectedAnswer(option);
        setShowFeedback(true)
        if (option === questions[currentQuestion].answer) {
            setScore((score) => score + 1);
        }
    }

    const goToNext = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            setIsFinished(true);
        }
    }

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setIsFinished(false);
        setShowFeedback(false);
        setSelectedAnswer(null);
    }

    // mientras carga
    if (questions.length === 0) {
        return <p className="text-white">Loading...</p>
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center ">
            {/* {showFeedback && selectedAnswer === questions[currentQuestion].answer && (
                <Confetti />
            )} */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-purple-600 mb-2 ">Game quiz</h1>
                <p className="text-gray-400">Adivina el juego</p>
            </div>

            {!isFinished ? (
                <>
                    <p>Score: {score}</p>
                    <QuestionCard
                        showFeedback={showFeedback}
                        onAnswer={handleAnswer}
                        data={questions[currentQuestion]}
                        current={currentQuestion}
                        total={questions.length}
                        selected={selectedAnswer}
                    />
                    <div className=" mt-3">
                        {showFeedback && (
                            <button
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                onClick={goToNext}
                            >
                                {currentQuestion + 1 < questions.length ? "Continue" : "See results"}
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">quiz is over</h2>
                    <p>
                        you score {score} out of {questions.length} that is{" "}
                        {Math.round((score / questions.length) * 100)}%
                    </p>
                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-3"
                        onClick={restartQuiz}
                    >
                        Restart Quiz
                    </button>
                </div>
            )}
        </div>
    );
}