import { useState } from "react";
import { Fragment } from "react";
import './carrusel_imagen.css'
export default function Carrusel_imagen({ componentes }) {

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % componentes.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((currentSlide - 1 + componentes.length) % componentes.length);
  };

  const estilos_move =(index)=>{
    const slideIndex = (currentSlide + index) % componentes.length;
    return {
      transform: `translateX(-${slideIndex}00%)`,
    };
  };
  return (
    <div className="carrusel-container">
        <div className="carrusel" style={{width:`${componentes.length}00%`}}>
        {componentes.map((Componente, index) => (
          <div key={index} className={`slide` } style={estilos_move(index)}>
            <Componente />
          </div>
        ))}
      </div>
      <button className="boton-anterior" onClick={goToPreviousSlide}>Anterior</button>
      <button className="boton-siguiente" onClick={goToNextSlide}>Siguiente</button>
    </div>
  );
};
