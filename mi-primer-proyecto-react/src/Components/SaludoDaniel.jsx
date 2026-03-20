import { useState } from 'react'
import './SaludoDaniel.css'

export default function SaludoDaniel() {
    const [name, setName] = useState('Alex');

    return (
        <section className='saludo'>
            <h2 className='saludo__title'>¡Hola, {name}!</h2>
                <p className='saludo__extra'>
                    ¡Aquí hay un mensaje adicional!
                </p>
                
        </section>
    )
}