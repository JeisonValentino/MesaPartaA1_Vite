import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import Controller_Page from './Paginas/ControladorPage/Controller_Page.jsx';

import { faFacebook,faInstagram,faTiktok} from '@fortawesome/free-brands-svg-icons';

const rootElement = document.getElementById('root');
library.add(faFacebook, faInstagram, faTiktok)
const root = createRoot(rootElement);
root.render(
  <StrictMode>

  <h1>hola a todos </h1>

</StrictMode>
)
