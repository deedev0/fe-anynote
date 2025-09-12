import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';

import "./index.css";


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </BrowserRouter>,
)
