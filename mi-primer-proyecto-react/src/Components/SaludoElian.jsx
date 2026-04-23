import { useEffect, useState } from "react";

export default function SaludoElian() {
    //1. Declaramos estados
    const [phrase, setPhrase] = useState([]);
    const [randomNumber, setRandomNumber] = useState(0);


    //2.Cargamos la frase al iniciar el comoponente
    useEffect(() => {
        const fetchPhrase = async () => {
            try {
                const response = await fetch("https://www.positive-api.online/phrases/esp")
                const data = await response.json();
                setPhrase(data);
            } catch (error) {
                console.error("Error fetching phrase:", error);
            }
            finally {
                const randomIndex = Math.floor(Math.random() * 40);
                setRandomNumber(randomIndex);
            }
        }
        fetchPhrase();
    }, []);

    return (
        <div className="saludo">
            <h1 className="saludo__title">Frase motivacional del día</h1>
            <p className="saludo__phrase">{phrase[randomNumber]?.text}</p>
            <button className="saludo__button" onClick={() => setRandomNumber(Math.floor(Math.random() * 40))}>Nueva frase</button>
        </div>
    )
}