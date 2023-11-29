import { Fragment, useEffect, useRef, useState } from "react";
import Loading from "../../ControladorPage/Loading";
import Cabecera from "../Complemets/Cabecera";
import { Suelo } from "../Complemets/Suelo";
import "./Nuestras_Sedes.css";
import banner from "../Nosotros/banner-nosotros.png";
import futbol from "./imagenes_Services2/futbol.png";
import escudo from "./../Imagenes/escudo.png";
import inicial from "./imagenes_niveles/inicial.png"
import primaria from "./imagenes_niveles/primaria 3.png"
import secundaria from "./imagenes_niveles/secundaria 1.png"
import arte from "./imagenes_niveles/cartas imagenes/arte.jpg"
import robotica from "./imagenes_niveles/cartas imagenes/robotica2.jpg"
import realidad_virtual from "./imagenes_niveles/cartas imagenes/robotica3.jpg"

const Nuestras_Sedes = () => {
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [estado_scroll, setEstado_scroll] = useState(false);
  const [posicion, setPosicion] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  let maxClonedElements = 200;
  const cambiarEstado = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  };

  useEffect(() => {
    return cambiarEstado();
  }, []);

  const handleScrollDown = (e) => {
    setEstado_scroll(true);
    setPosicion(e.clientX);
  };
  const handledMouseMove = (e) => {
    if (!estado_scroll) {
      return;
    }
    containerRef.current.scrollLeft += (posicion - e.clientX) * 4;
  };

  const handledMouseup = (e) => {
    setEstado_scroll(false);
  };

  const handledMouseLeave = (e) => {
    setEstado_scroll(false);
  };

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
    } else if (
      scrollLeft + carouselWidth >= numCards * cardWidth &&
      clonedElementsRight.length < maxClonedElements
    ) {
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

  return (
    <Fragment>
      <Cabecera />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="fotoNosotros">
            <div className="fondobanner">
              <img src={banner}></img> <div className="linea"></div>
              <p>Servicios</p>
            </div>
          </div>

          <div
            style={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "4rem",
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                width: "18rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={escudo} style={{ width: "100%", height: "100%" }} />
            </div>

            <div
              style={{
                fontSize: "1.2rem",
                textAlign: "center",
                paddingLeft: "4rem",
                paddingRight: "4rem",
                paddingTop: "2rem",
              }}
            >
              <p>
                Desde nuestra fundación, nos hemos caracterizado por ser una
                escuela dinámica e innovadora, con sólidos cimientos que se
                fundamentan en los principios de Autenticidad, Respeto y
                Sabiduría. Renovamos nuestro compromiso de brindar una educación
                de calidad a nuestros estudiantes y familias, sea de manera
                presencial o virtual, con un plan curricular actualizado, clases
                presenciales y con apoyo emocional. Nos amoldamos a las
                necesidades de nuestros estudiantes, a sus diferentes estilos
                cognitivos, brindando una educación integral, entendiendo que
                cada uno es un ser único y diferente; los educamos respetando su
                esencia y ayudamos en el desarrollo del talento innato en cada
                uno, en un ambiente cálido, familiar y de confianza, en el cual
                enseñamos a nuestros estudiantes a elegir y tomar decisiones.
                Nuestro objetivo es lograr que nuestros estudiantes obtengan una
                base sólida para un futuro profesional y una vida próspera.
              </p>
            </div>
          </div>

          <div >
            <div>
              <h3 style={{ textAlign: "center" }}>NIVELES ACADEMICOS</h3>
            </div>

            <div className="contenedor_global_informativo">
            <h3>Inicial</h3>
              <div className="contenedor_informativo">
                <div className="contenedor">
                  <p>
                    Como colegio del mundo IB ofrecemos el Programa de la Escuela
                    Primaria del IB conocido como PEP o PYP.
                  </p>
                  <p>
                    Se trata de un programa educativo que fomenta y apoya el
                    interés de los niños, lo fortalece, de manera que sus
                    habilidades se desarrollen de forma natural en todas las áreas
                    cognitivas. Las clases se dan en inglés y en castellano de
                    acuerdo a la materia enseñada.
                  </p>
                  <p>
                    A partir del 5to año de Primaria se introduce el idioma
                    Francés.
                  </p>
                </div>
                <div className="contenedor">
                  <img src={inicial} style={{ width: "100%", height: "100%" }} />
                </div>
              </div>
            </div>
       
            <div className="contenedor_global_informativo">
            <h3>Primaria</h3>
              <div className="contenedor_informativo reverso ">
                <div className="contenedor ">
                  <p>
                    Como colegio del mundo IB ofrecemos el Programa de la Escuela
                    Primaria del IB conocido como PEP o PYP.
                  </p>
                  <p>
                    Se trata de un programa educativo que fomenta y apoya el
                    interés de los niños, lo fortalece, de manera que sus
                    habilidades se desarrollen de forma natural en todas las áreas
                    cognitivas. Las clases se dan en inglés y en castellano de
                    acuerdo a la materia enseñada.
                  </p>
                  <p>
                    A partir del 5to año de Primaria se introduce el idioma
                    Francés.
                  </p>
                </div>
                <div className="contenedor">
                  <img src={primaria}  style={{ width: "100%", height: "100%" }} />
                </div>
              </div>
            </div>


            <div className="contenedor_global_informativo">
            <h3>Secundaria</h3>
              <div className="contenedor_informativo">
                <div className="contenedor">
                  <p>
                    Como colegio del mundo IB ofrecemos el Programa de la Escuela
                    Primaria del IB conocido como PEP o PYP.
                  </p>
                  <p>
                    Se trata de un programa educativo que fomenta y apoya el
                    interés de los niños, lo fortalece, de manera que sus
                    habilidades se desarrollen de forma natural en todas las áreas
                    cognitivas. Las clases se dan en inglés y en castellano de
                    acuerdo a la materia enseñada.
                  </p>
                  <p>
                    A partir del 5to año de Primaria se introduce el idioma
                    Francés.
                  </p>
                </div>
                <div className="contenedor">
                  <img src={secundaria} style={{ width: "100%", height: "100%" }} />
                </div>
              </div>
            </div>



          </div>



<div>
<div>
              <h3 style={{ textAlign: "center" }}>GRUPO DE ESTUDIO </h3>
            </div>
            <div className="contenedor_global_informativo">
              <h3> MARIO DAMASO </h3>
                <div className="contenedor_informativo">
                  <div className="contenedor">
                    <p>
                      Como colegio del mundo IB ofrecemos el Programa de la Escuela
                      Primaria del IB conocido como PEP o PYP.
                    </p>
                    <p>
                      Se trata de un programa educativo que fomenta y apoya el
                      interés de los niños, lo fortalece, de manera que sus
                      habilidades se desarrollen de forma natural en todas las áreas
                      cognitivas. Las clases se dan en inglés y en castellano de
                      acuerdo a la materia enseñada.
                    </p>
                    <p>
                      A partir del 5to año de Primaria se introduce el idioma
                      Francés.
                    </p>
                  </div>
                  <div className="contenedor">
                    <img  style={{ width: "100%", height: "100%" }} />
                  </div>
                </div>
              </div>
</div>


          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "#333F87", fontWeight: "800" }}>
              Servicios extracurriculares y talleres
            </h2>
            <div
              className="container_cartas_servicios2"
              style={{
                cursor: estado_scroll ? "grabbing" : "grab",
                userSelect: "none",
              }}
              ref={containerRef}
              onMouseDown={handleScrollDown}
              onMouseMove={handledMouseMove}
              onMouseUp={handledMouseup}
              onMouseLeave={handledMouseLeave}
            >
              <div className="cartas_servicios ">
                <img src={futbol}></img>
                <div className="descripcion">
                  <h3>Futbol</h3>
                  <p>
                    La practica del deporte ayuda al empoderamiento del alumno y
                    a la identificacion plena con su camiseta a la que
                    representa{" "}
                  </p>
                </div>
                <button type="button" class="btn btn-primary btn-lg">
                  Saber Mas
                </button>
              </div>
              <div className="cartas_servicios ">
                <img src={realidad_virtual}/>
                <div className="descripcion">
                  <h3>Realidad virtual</h3>
                  <p>
                    Eb estis takkeres de realidad virtual los niños y niñas
                    viven en primera persona experiencias unicas en diferentes
                    escenarios virtuales
                  </p>
                </div>
                <button type="button" class="btn btn-primary btn-lg">
                  Saber Mas
                </button>
              </div>
              <div className="cartas_servicios">
                <img src={arte}/>
                <div className="descripcion">
                  <h3>Arte</h3>
                  <p>
                    Lograremos que nuestros estudiantes alcance con exito su
                    etapa escolar y preuniversitaria , garantizando el ingreso
                    seguro a las mas importantes universidades
                  </p>
                </div>
                <button type="button" class="btn btn-primary btn-lg">
                  Saber Mas
                </button>
              </div>

              <div className="cartas_servicios">
                <img src={robotica}></img>
                <div className="descripcion">
                  <h3>ROBOTICA Y ELECTRONICA</h3>
                  <p>
                    Lograremos que nuestros estudiantes alcance con exito su
                    etapa escolar y preuniversitaria , garantizando el ingreso
                    seguro a las mas importantes universidades
                  </p>
                </div>
                <button type="button" class="btn btn-primary btn-lg">
                  Saber Mas
                </button>
              </div>
            </div>
          </div>

          <Suelo />
        </div>
      )}
    </Fragment>
  );
};
export default Nuestras_Sedes;
