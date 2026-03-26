
import { useState } from 'react'
import './SaludoAlex.css'

export default function SaludoAndrey() {
    const [name, setName] = useState('Andrey')
    return (
        <section className='container'>
            <section className='saludo'>
                <h2 className='saludo_title'>!Hola, {name} !</h2>
                <p className='saludo_extra'>
                    Aquí hay un mensaje adicional!
                </p>
            </section>
        </section>
    )
}