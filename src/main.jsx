
/**
 * CSS import
 */
import './index.css'

/**
 * Library import
 */
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import {Toaster} from 'react-hot-toast'

/**
 * component import
 */
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
       <App />
       <Toaster/>
  </BrowserRouter>
 
  
)
