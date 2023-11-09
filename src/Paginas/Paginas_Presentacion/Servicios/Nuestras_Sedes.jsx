import { Fragment, useEffect, useRef, useState } from "react";
import Loading from "../../ControladorPage/Loading";
import  Cabecera  from "../Complemets/Cabecera";
import { Suelo } from "../Complemets/Suelo";
import './Nuestras_Sedes.css'
import banner from "../Nosotros/banner-nosotros.png"
import futbol from './imagenes_Services2/futbol.png'


 const Nuestras_Sedes = ()=>{
    const [loading ,setLoading]=useState(false);
 const containerRef=useRef(null);
 const [estado_scroll,setEstado_scroll]=useState(false);
 const [posicion,setPosicion]=useState(0);
 const [currentIndex,setCurrentIndex]=useState(0)
 let maxClonedElements=200;
    const cambiarEstado=()=>{
        setLoading(true);
        setTimeout(()=>{
    
            setLoading(false);
        },0)
    }
    
    useEffect(()=>{
        return cambiarEstado()
    }, [])
    
    const handleScrollDown = (e) => {
        setEstado_scroll(true)
        setPosicion(e.clientX)
        
      };
    const handledMouseMove = (e)=>{
        if(!estado_scroll){
            return;
        }
        containerRef.current.scrollLeft+=(posicion-e.clientX)*4
   
    }   

    const handledMouseup = (e)=>{
        setEstado_scroll(false);
      
    }
  
    const handledMouseLeave = (e)=>{
        setEstado_scroll(false);
      
    }
    

    const handleInfiniteScroll = () => {
        const container = containerRef.current;
        const cardWidth = container.querySelector(".cartas_servicios").offsetWidth;
        const numCards = container.querySelectorAll(".cartas_servicios").length;
        const carouselWidth = container.offsetWidth;
        const scrollLeft = container.scrollLeft;

        const clonedElements = container.querySelectorAll(".cloned");
        const clonedElementsLeft = container.querySelectorAll(".cloned-left");
        const clonedElementsRight = container.querySelectorAll(".cloned-right");
      
        if (scrollLeft <= 0 && clonedElementsLeft.length < maxClonedElements) {
          // Cuando llegas al inicio y no se ha excedido el límite, clona elementos al inicio
          const cards = Array.from(container.querySelectorAll(".cartas_servicios"));
          const clonedCards = cards.map((card) => card.cloneNode(true));
          clonedCards.forEach((clonedCard, index) => {
            clonedCard.classList.add("cloned-left");
            clonedCard.style.transform = `translateX(-${numCards * cardWidth}px)`;
            clonedCard.style.transition = "transform 0.5s ease";
            container.insertBefore(clonedCard, cards[0]);
            setTimeout(() => {
              clonedCard.style.transform = "translateX(0)";
            }, 0);
          });
        } else if (scrollLeft + carouselWidth >= numCards * cardWidth && clonedElementsRight.length < maxClonedElements) {
          // Cuando llegas al final y no se ha excedido el límite, clona elementos al final
          const cards = Array.from(container.querySelectorAll(".cartas_servicios"));
          const clonedCards = cards.map((card) => card.cloneNode(true));
          clonedCards.forEach((clonedCard, index) => {
            clonedCard.classList.add("cloned-right");
            clonedCard.style.transform = `translateX(${numCards * cardWidth}px)`;
            clonedCard.style.transition = "transform 0.5s ease";
            container.appendChild(clonedCard);
            setTimeout(() => {
              clonedCard.style.transform = "translateX(0)";
            }, 0);
          });
        }
          
      
      };
    


    return(
    
        <Fragment>

<Cabecera />
    {loading ? <Loading/>:<div>
    <div className="fotoNosotros">
    <div className="fondobanner"><img src={banner}></img>  <div className="linea"></div><p>Servicios</p></div>
</div>


<div style={{display:"flex",justifyContent:"center",width:"100%", flexDirection:"column",alignItems:"center"}}>
  <h2 style={{color:"#333F87",fontWeight:"800"}}>Servicios extracurriculares y talleres</h2>
  <div className="container_cartas_servicios2"  style={{ cursor: estado_scroll ? 'grabbing' : 'grab' , userSelect: 'none' }}  ref={containerRef} onMouseDown={handleScrollDown} onMouseMove={handledMouseMove} onMouseUp={handledMouseup} onMouseLeave={handledMouseLeave}  >
  
      <div className="cartas_servicios"><img src={futbol}></img><div className="descripcion">
        <h3>Futbol</h3><p>La practica del deporte ayuda al empoderamiento del alumno y a la identificacion plena con su camiseta a la que representa </p>
      </div><button type="button" class="btn btn-primary btn-lg">Saber Mas</button></div>
      <div className="cartas_servicios"><img></img><div className="descripcion">
        <h3>Realidad virtual</h3><p>Eb estis takkeres de realidad virtual los niños y niñas viven en primera persona experiencias unicas en diferentes escenarios virtuales</p>
      </div><button type="button" class="btn btn-primary btn-lg">Saber Mas</button></div>
      <div className="cartas_servicios"><img></img><div className="descripcion">
        <h3>Academia Mariano Damaso</h3><p>Lograremos que nuestros estudiantes alcance con exito su etapa escolar y preuniversitaria , garantizando el ingreso seguro a las mas importantes universidades</p>
      </div><button type="button" class="btn btn-primary btn-lg">Saber Mas</button></div>
  
  </div>
</div>


    <Suelo/>
    
  </div>

}

    </Fragment>
)

}
export default Nuestras_Sedes; 