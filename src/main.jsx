import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import Controller_Page from './Paginas/ControladorPage/Controller_Page.jsx';

import { faFacebook,faInstagram,faTiktok} from '@fortawesome/free-brands-svg-icons';


library.add(faFacebook, faInstagram, faTiktok)
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>




<Controller_Page/>



</React.StrictMode>
)
