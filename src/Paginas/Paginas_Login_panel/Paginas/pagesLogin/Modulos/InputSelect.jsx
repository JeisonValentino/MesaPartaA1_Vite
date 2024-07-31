
import './EstilesComponents/EstilosInputSelect.css'
import Select from 'react-select';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import $ from 'jquery';
export default function InputSelect (props){
    const {id,data,onChange,name,className,value,object,placeholder}=props

    const handleSelectChange = ( event ) => {
        let evento ={target:{name:name,value:event.value}}
        onChange(evento )
        console.log(evento)
    }
    const selectRef = useRef(null);
    useEffect(() => {
        if (selectRef.current && className) {
            // Accede al controlRef del componente React Select
            const controlElement = selectRef.current.controlRef;
            // Verifica si la clase "alerta-Activa" no está presente
            if (!controlElement.classList.contains('alerta-Activa')) {
              controlElement.classList.add('alerta-Activa');
            }
          } else if (selectRef.current) {
            // Accede al controlRef del componente React Select
            const controlElement = selectRef.current.controlRef;
            // Remueve la clase "alerta-Activa" si está presente
            controlElement.classList.remove('alerta-Activa');
          }

   
      }, [className]);


    return (<>
<div style={{width:"100%"}} className = " Suppliers-container ">
<Select id={id} ref={selectRef}
     value={{ label: object ? value.nombre:value, value: value}}
            options = { Array.from(data).map(sup => ({ label: sup.name, value: sup.data })) }
            onChange = { handleSelectChange }

            placeholder={placeholder}
        /> 
    </div>
    </>
    )

}