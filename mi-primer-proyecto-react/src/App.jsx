import './App.css'
import QuizComponent from './Components/QuizComponent'
import SaludoDaniel from './Components/SaludoDaniel'

import { RouterProvider } from '@tanstack/react-router'
import {router} from './routes'


function App() {


  return (
    <>
      
        <RouterProvider router={router} />  
      
    </>
  )
}

export default App