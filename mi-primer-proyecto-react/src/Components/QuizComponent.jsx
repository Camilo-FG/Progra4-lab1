import { useEffect, useState } from "react";
import Confetti from 'react-confetti';

export default function QuizComponent() {

    const [preguntas, setPreguntas] = useState([]);
    const [actual, setActual] = useState(0);
    const [confeti, setConfeti] = useState(false);
    const [resultado, setResultado] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const handleAnswerClick = (index) => {
        if (resultado !== null) return; // evita cambiar respuesta ya seleccionada

        setResultado(index);

        if (preguntas[actual].correctAnswer === index) {
            setConfeti(true);
            setTimeout(() => setConfeti(false), 10000);
        }
    };

    const handleNext = () => {
        if (actual < preguntas.length - 1) {
            setActual(actual + 1);
            setResultado(null);
        }
    };

    useEffect(() => {
        const fetchQuiz = async () => {
            const key = import.meta.env.VITE_JSONBIN_ACCESS_KEY;
            if (!key) {
                console.error("Access key is not defined");
                setError("No se encontró la clave de acceso.");
                setCargando(false);
                return;
            }

            const headers = new Headers();
            headers.append("X-Access-Key", key);

            try {
                const response = await fetch("https://api.jsonbin.io/v3/b/69ea3e30aaba8821972d9f5c", { headers });
                const data = await response.json();

                if (Array.isArray(data.record)) {
                    setPreguntas(data.record);
                } else {
                    setError("El formato del API no es válido.");
                }
            } catch (err) {
                console.error("Error fetching quiz data", err);
                setError("Error al conectar con el API.");
            } finally {
                setCargando(false);
            }
        };

        fetchQuiz();
    }, []);

    if (cargando) return <p className="estado">Cargando preguntas...</p>;
    if (error) return <p className="estado error">{error}</p>;
    if (!preguntas.length) return <p className="estado">No hay preguntas disponibles.</p>;

    const preguntaActual = preguntas[actual];

    return (
        <>
            {confeti && <Confetti />}

            <div className="quiz-container">
                <div className="quiz-header">
                    <h2 className="quiz-titulo">Quiz</h2>
                    <span className="quiz-progreso">
                        Pregunta {actual + 1} de {preguntas.length}
                    </span>
                </div>

                <div className="quiz-card">
                    <p className="quiz-pregunta">{preguntaActual.question}</p>

                    <div className="quiz-opciones">
                        {preguntaActual.answers.map((opcion, index) => {
                            let className = "quiz-btn";

                            if (resultado !== null) {
                                if (index === preguntaActual.correctAnswer) {
                                    className += " correct";
                                } else if (index === resultado) {
                                    className += " incorrect";
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    className={className}
                                    onClick={() => handleAnswerClick(index)}
                                    disabled={resultado !== null}
                                >
                                    {opcion}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        className="quiz-siguiente"
                        onClick={handleNext}
                        disabled={resultado === null || actual === preguntas.length - 1}
                    >
                        Siguiente →
                    </button>
                </div>
            </div>
        </>
    );
}