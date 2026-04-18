import { useEffect, useState } from 'react'


export default function SaludoKeril() {
    const [name, setName] = useState('Keril')
   const [data ,SetData]=useState([]);
   const [randomIndex, setRandomIndex] = useState(1);
   
   
   
   useEffect(() => {
   const fetchData = async () => {
    try{
    const response = await fetch(`https://positive-api.online/phrase/esp/${randomIndex}`);
    const data = await response.json()
    SetData(data)
    }
    catch(error){
        console.error('Error fetching data:', error);
    }
   }
   fetchData();
   }, [randomIndex]);
   
    const handleButtonClick = () => {
        const randomIndex = Math.floor(Math.random() * 40);
        setRandomIndex(randomIndex);
    }

    return (
        <section className='container'>
            <section className='saludo'>
                <h2 className='saludo_title'>!Hola, {name} !</h2>
                <p className='saludo_extra'>
                    Aquí hay un mensaje adicional!
                </p>
                <h2 className='saludo_title'>Frase del día:</h2>
                <p className='saludo_extra'>{data?.text}</p>
                <button onClick={handleButtonClick}>Nueva Frase</button>
            </section>
            <section>
                
            </section>
        </section >
    )
}