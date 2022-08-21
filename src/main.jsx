import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import Controller_Page from './Paginas/ControladorPage/Controller_Page.jsx';
import store from './Paginas/Paginas_Login_panel/ConfigurationAuthenticacion/store';
import { faFacebook,faInstagram,faTiktok} from '@fortawesome/free-brands-svg-icons';

const rootElement = document.getElementById('root');
library.add(faFacebook, faInstagram, faTiktok)
const root = createRoot(rootElement);
root.render(
  <StrictMode>
  <BrowserRouter>
<Provider store={store}>

<Controller_Page/>
</Provider>
</BrowserRouter>
</StrictMode>,
)
