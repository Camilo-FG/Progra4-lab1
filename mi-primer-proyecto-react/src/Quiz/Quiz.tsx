import { useEffect, useState } from "react";

import type { Opcion, Pregunta } from "./pregunta";
import "./ApiPrueba.css";
import ReactConfetti from "react-confetti";

const key = import.meta.env;
const API_URL = key.VITE_API_URL;
const X_MASTER_KEY = key.VITE_X_MASTER_KEY;

type JsonBinResponse = {
  record?: {
    preguntas?: Pregunta[];
  };
};


const ApiPrueba = () => {
  const [jsonBIN, setJsonBIN] = useState<Pregunta[]>([]);
  const [correcto, setCorrecto] = useState(0);
  const [incorrecto, setIncorrecto] = useState(0);
  const [preguntasRespondidas, setPreguntasRespondidas] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalPreguntas = jsonBIN.length;
  const quizFinalizado = totalPreguntas > 0 && preguntaActualIndex >= totalPreguntas;
  const preguntaActual = !quizFinalizado ? jsonBIN[preguntaActualIndex] : undefined;

      useEffect(() => {
    fetch(API_URL, {
      headers: {
        "X-Master-Key": X_MASTER_KEY
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const preguntas = (data as JsonBinResponse)?.record?.preguntas;
        setJsonBIN(Array.isArray(preguntas) ? preguntas : []);
        setIsLoading(false);
      })
      .catch(() => {
        setJsonBIN([]);
        setIsLoading(false);
      });
  }, []);

  const handleOpcionClick = (preguntaId: number, opcion: Opcion) => {
    if (preguntasRespondidas.includes(preguntaId)) return;

    setPreguntasRespondidas((prev) => [...prev, preguntaId]);
    opcion.correcto ? (setCorrecto((prev) => prev + 1), setShowConfetti(true)) : setIncorrecto((prev) => prev + 1);

    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  const handleSiguiente = () => {
    setPreguntaActualIndex((prev) => prev + 1);
  };


  return (
    <>
      {showConfetti && <ReactConfetti />}
      <h1>Data from JSONBIN</h1>
    
{isLoading && (
          <h2>Cargando preguntas...</h2>  
            )}
          <br />
          {!quizFinalizado && preguntaActual && (
            <section className="container">
          <div key={preguntaActual.id_pregunta} className="pregunta-container">
            <h2 className="pregunta">{preguntaActual.pregunta}</h2>
            <p className="pregunta-Descripcion">{preguntaActual.descripcion_pregunta}</p>
            <ul>
              {preguntaActual.opciones.map((opcion, index) => {
                const estaRespondida = preguntasRespondidas.includes(preguntaActual.id_pregunta);
                const colorClass = estaRespondida ? (opcion.correcto ? "correcta" : "incorrecto") : "";
                return (
                  <li className="linea" key={index}>
                    <button
                      className={`opcion-button ${colorClass}`}
                      onClick={() => handleOpcionClick(preguntaActual.id_pregunta, opcion)}
                      disabled={estaRespondida}
                    >
                      {opcion.descripcion}
                    </button>
                  </li>
                );
              })}
            </ul>
            {preguntasRespondidas.includes(preguntaActual.id_pregunta) && (
              <>
                <p className="explicacion">Explicación: {preguntaActual.explicacion}</p>
                <button className="opcion-button" onClick={handleSiguiente}>
                  {preguntaActualIndex === totalPreguntas - 1 ? "Ver resultados" : "Siguiente"}
                </button>
              </>
            )}
          </div>
      </section>
          )}
      
      {quizFinalizado && (
        
      <div>
       
        <h2>Resultados</h2>
        <p>Correctas: {correcto}</p>
        <p>Incorrectas: {incorrecto}</p>
      </div>
      )}
    </>
  );
  
};
export default ApiPrueba;


