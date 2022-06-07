import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {Home} from "./components/Home";
import {createRoot} from "react-dom/client";

/*const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');*/
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,);


serviceWorkerRegistration.unregister();
reportWebVitals();