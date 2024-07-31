import { Fragment, useEffect } from "react";
import banner from "./../Nosotros/banner-nosotros.png";
import { Accordion, AccordionTab } from "primereact/accordion";
import Loading from "../../ControladorPage/Loading";
import { useState } from "react";
import axios from "axios";

const Preguntas_frecuentes = () => {
  const [data, setData] = useState([
,
  ]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
  
  axios.get('http://localhost:3031/Preguntas').then(res=>{
    setData(res.data)
    setLoading(false);
  }).catch((err)=>{
    setLoading(true);
  })
  }, []);
  return (
    <Fragment>
      <div className="fotoNosotros">
        <div className="fondobanner">
          <img src={banner}></img>
          <div className="fondo_container_banner">
            <div className="linea"></div>
            <div>
              <p>Preguntas Frecuentes</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "5rem" }}>
        <Accordion multiple activeIndex={[0]}>
          {loading ? (
            <Loading />
          ) : data.length === 0 ? (
            <>no hay datos</>
          ) : (
            data.map((id,index) => {
              return (
          
                  <AccordionTab key={index} header={id.cabecera}>
             
                    <p className="m-0">{id?.cuerpo}</p>
                  </AccordionTab>
           
              );
            })
          )}
        </Accordion>
      </div>
    </Fragment>
  );
};

export default Preguntas_frecuentes;
