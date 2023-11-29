import { InputText } from "primereact/inputtext";
import { Fragment } from "react";
import InputSelect from "../InputSelect";
import { InputTextarea } from 'primereact/inputtextarea';

import './estilos_content_inputs.css'
import { classNames } from "primereact/utils";
 const PersonalizadoInput = ({
  listaFormulario,
  onInputChange,
  Entity,
  submitted,
}) => {

function validarCorreo (valor){

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validar la entrada con la expresión regular
    if(emailRegex.test(valor)){
return true
    }else{
        return false
    }
}


const tipoInputText = (dat)=>{
  if(dat==='institucional_regular'){
    return 'institucional_regular'
  }
}

const validarNumero = (event,dat)=>{

 if( dat==='numero'){
  console.log(event.key )
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
 }
}

  return (
    <Fragment>
      {listaFormulario?.map((data, id) => {
        return ( 
          <>
            {data.type === "text" ? (
              <div key={id} style={{ marginTop: "1rem" }}>
              {data.titulo!==''?(
                <label>{data.titulo}</label>
              ):("")} 
                
              <InputText
                  
                  name={`${data.identidad}`}
                  value={Entity?.[data?.identidad]}
                  onChange={(e) => onInputChange(e)}
                  required
                  placeholder={data.placehold}
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && Entity?.[data?.identidad] 
                  }) + tipoInputText(data.estilo)}
                  onKeyDown={(event) => validarNumero(event,data.data)}


                />
                {submitted && Entity?.[data?.identidad] && (
                  <small className="p-error">{data.advertencia}</small>
                )}

               

                    
                {data.data==="correo" && validarCorreo(Entity?.[data.identidad]) && (
                  <small className="p-error">{"el correo es incorrecto"}</small>
                )}
               

              </div>
            ) : (
              <>
                {" "}
                {data.type === "select" ? (
                  <div key={id} style={{ marginTop: "1rem" }}>
                    <label>{data.titulo}</label>

                    <InputSelect
                     
                      data={data?.data}
                      object={data?.object}
                      value={Entity?.[data?.identidad]}
                      name={`${data?.identidad}`}
                      onChange={(e) => onInputChange(e)}
                      className={
                        submitted && !Entity[data.identidad?.identidad]
                      }
                    />

                    {submitted && !Entity[data.identidad.nombre] && (
                      <small className="p-error">{data.advertencia}</small>
                    )}
                  </div>
                ) : (<>
                {data.type ==="text_area" ?(



              <div key={id} style={{ marginTop: "1rem" }}>
              {data.titulo!==''?(
                <label>{data.titulo}</label>
              ):("")} 
               
              <InputTextarea  name={`${data.identidad}`}
                  value={Entity?.[data?.identidad]}
                  onChange={(e) => onInputChange(e)}
                  required
                  placeholder={data.placehold}
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && Entity?.[data?.identidad] 
                  }) + tipoInputText(data.estilo)}
                  onKeyDown={(event) => validarNumero(event,data.data)} rows={5} cols={30} />

                {submitted && Entity?.[data?.identidad] && (
                  <small className="p-error">{data.advertencia}</small>
                )}
              </div>
          

                ):("nada")}
                </>)}{" "}
              </>
            )}
          </>
        );
      })}
    </Fragment>
  );
}

export default PersonalizadoInput;
