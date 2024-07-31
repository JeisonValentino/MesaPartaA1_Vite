import { defineConfig ,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import corsMiddleware from './corsMiddleware';


export default ({ mode }) => {
  // Carga las variables de entorno del nivel de la aplicación a las variables de entorno a nivel de nodo.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
  
    plugins: [react()],
  });
};
