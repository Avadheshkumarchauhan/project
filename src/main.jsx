
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
import {Provider} from 'react-redux'

/**
 * component import
 */
import App from './App.jsx'
import store from './redux/store.js'


createRoot(document.getElementById('root')).render(
 <Provider store={store}>
   
      <BrowserRouter>
          <App />
          <Toaster/>
      </BrowserRouter>
 
 </Provider>
  
)
