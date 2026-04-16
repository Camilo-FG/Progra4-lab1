
import { useEffect, useState } from 'react'
import './SaludoAlex.css'

export default function SaludoDaniel() {

    //estados
    const [name, setName] = useState('Daniel')
    const [phrase, setPhrase] = useState([]);
    const [randomNumber, setRandomNumber] = useState(0);

    //logica

    const motivacion = useEffect(() => {
        const fetchPhrase = async () => {
            try {
                const response = await fetch("https://www.positive-api.online/phrases/esp");
                const data = await response.json();

                setPhrase(data); //aqui se actualiza el valor de phrase
            } catch(error)
            {
                console.log("Error fetching phrase:", error);
            }
            //me inspiré en el diseño de gonza, solo que me volé el finally 
        }

        fetchPhrase();
    }, []);


    //render
    return (
        <>
        <section className='container'>
            <section className='saludo'>
                <h2 className='saludo_title'>!Hola, {name} !</h2>
                <p className='saludo_extra'>
                    Aquí hay un mensaje adicional!!
                </p>
            </section>
        </section>

        <h1>Hola clase</h1>
        <button onClick={() => setRandomNumber(Math.floor(Math.random() * 40))}>cambiar</button>
        <p>{phrase[randomNumber]?.text}</p>
        </>
    )
}