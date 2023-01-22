
import './EstilesComponents/EstilosInputSelect.css'
import Select from 'react-select';
import { useEffect } from 'react';
import { useState } from 'react';
import $ from 'jquery';
export default function InputSelect (props){
    const {data,onChange,name,className,value,object}=props

    const handleSelectChange = ( event ) => {
        let evento ={target:{name:name,value:event.value}}
        onChange(evento )
        console.log(evento)
    }

useEffect(()=>{
if(className){
$(".css-13cymwt-control").addClass('alerta-Activa')
}else{
$(".css-13cymwt-control").removeClass('alerta-Activa') 
}
},[className])
 

    return (<>
<div className = " Suppliers-container ">
<Select
     value={{ label: object ? value.nombre:value, value: value}}
            options = { Array.from(data).map(sup => ({ label: sup.name, value: sup.data })) }
            onChange = { handleSelectChange }
        /> 
    </div>
    </>
    )

}