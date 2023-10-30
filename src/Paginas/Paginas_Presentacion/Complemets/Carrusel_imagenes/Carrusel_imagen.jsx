import { useState } from "react";
import { Fragment } from "react";
import './carrusel_imagen.css'
import { useEffect } from "react";
export default function Carrusel_imagen({ componentes }) {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false); 
  const [derecha_animada, setDerecha_animada] = useState(false); 
  const [izquierda_animada, setIzquierda_animada] = useState(false); // Estado para controlar la habilitación de la animación
  const [animation1, setAnimation1] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const tiempo_animacion = 1000;
  const goToNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % componentes.length);

    if((currentSlide + 1) % componentes.length===0){
      setDerecha_animada(true)
      setIsAnimationEnabled(true);
   
        setAnimation1(true);
   
      setTimeout(() => {
        setAnimation2(true);
      }, tiempo_animacion/2); 
    }
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((currentSlide - 1 + componentes.length) % componentes.length);


    if((currentSlide + 1) % componentes.length===1){
      
      setIzquierda_animada(true);
      setIsAnimationEnabled(true);
   
        setAnimation1(true);
   
      setTimeout(() => {
        setAnimation2(true);
      }, tiempo_animacion/2); 
    }
  };

  const animacion =()=>{
  


    if(((currentSlide + 1) % componentes.length===0 || (currentSlide + 1) % componentes.length===1 )&& isAnimationEnabled){

      if(derecha_animada){
if(animation1===true){
  return { opacity: `1`,
  transform: `translateX(-${currentSlide+1 * 200}%)`,width:`${componentes.length * 100}%`, transition:` transform ${tiempo_animacion/1000}s ease-in-out`}
}

if(animation2===true){
  return { opacity: `0`,
  transform: `translateX(${componentes.length+1 * 100}%)`,width:`${componentes.length * 100}%`}
}
      }
        if(izquierda_animada){
        console.log("animacion aplicada")
        if(animation1===true){
          return { opacity: `1`,
          transform: `translateX(${currentSlide+1 * 200}%)`,width:`${componentes.length * 100}%`, transition:` transform ${tiempo_animacion/1000}s ease-in-out`}
        }
        
        if(animation2===true){
          return { opacity: `0`,
          transform: `translateX(-${componentes.length+1 * 100}%)`,width:`${componentes.length * 100}%`}
        }
      }
    }else{
    return {transform: `translateX(-${currentSlide * 100 /componentes.length}%)`,
    width:`${componentes.length * 100}%`, transition:` transform ${tiempo_animacion/1000}s ease-in-out`}
    }
    
  }



  useEffect(()=>{
    if (animation1) {
      setTimeout(() => {
        setAnimation1(false);
      }, tiempo_animacion/2); // Deshabilitar después de 2 segundos
    }
  }, [animation1]);

  useEffect(()=>{
    if (animation2) {
      setTimeout(() => {
        setAnimation2(false);
      }, tiempo_animacion/2); // Deshabilitar después de 2 segundos
    }
  }, [animation2]);

  useEffect(()=>{
    if (isAnimationEnabled) {
      setTimeout(() => {
        setIsAnimationEnabled(false);
      }, tiempo_animacion); // Deshabilitar después de 2 segundos
    }
  }, [isAnimationEnabled]);

  useEffect(()=>{
    if (derecha_animada) {
      setTimeout(() => {
        setDerecha_animada(false);
      }, tiempo_animacion); // Deshabilitar después de 2 segundos
    }
},[derecha_animada])



useEffect(()=>{
  if (izquierda_animada) {
    setTimeout(() => {


      setIzquierda_animada(false);
    }, tiempo_animacion); // Deshabilitar después de 2 segundos
  }
},[izquierda_animada])

  return (
    <div className="carrusel-container">

<div className="btn_carrusel">
        <button className="boton-anterior" onClick={goToPreviousSlide}>Anterior</button>
        <button className="boton-siguiente" onClick={goToNextSlide}>Siguiente</button>
      </div>
        <div className={`carrusel `} style={animacion()}>
        {componentes.map((Componente, index) => (
          <div key={index} className={`slide` } >
            <Componente />
          </div>
        ))}
      </div>
      
     
    </div>
  );
};
