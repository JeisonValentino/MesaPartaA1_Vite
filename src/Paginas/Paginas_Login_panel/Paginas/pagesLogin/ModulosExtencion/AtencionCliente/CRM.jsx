import { Fragment } from "react";
import { Cabecera } from "../../ExtencionesCompartidas/Cabecera";
import "./CRM.css"
import descarga from "./../../../../../../Imagenes/descarga.jpg"
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default function CRM (){

return(
<Fragment>
<Cabecera/>


    <div className="capa">

    <div className="contenedor">


<div className="contenedorHijoChats">
<InputText  style={{width:"90%" , margin:"10px"}} placeholder="Buscar persona"/>

<div className="conversation">
<img   className="conversationImg" src={descarga} /> jeison 
</div>
<div className="conversation">
<img   className="conversationImg"  src={descarga}/> jeison
</div>
<div className="conversation">
<img   className="conversationImg" src={descarga} />jeison
</div>

</div>

<div>
<div className="message">

      <div className="messageTop">
        <img
          className="messageImg"
          src={descarga}
          alt=""
        />
        <p className="messageText">mensaje</p>
      </div>
      <div className="messageBottom">fecha de mensaje</div>
    
   
    </div>

    <div className="message own">

<div className="messageTop">
  <img
    className="messageImg"
    src={descarga}
    alt=""
  />
  <p className="messageText">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde voluptas ut ipsa, sit atque ipsam! Excepturi, dignissimos mollitia. A hic minus iusto mollitia sapiente rem sint natus, fuga ea delectus.</p>
</div>
<div className="messageBottom">fecha de mensaje</div>

</div>




<div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                
                  ></textarea>
                  <button className="chatSubmitButton" >
                    Send
                  </button>
                </div>



</div>

<div className="archivadores">
   <div className="carpeta">
   <FontAwesomeIcon icon={faUser}/> Chats activos
   </div>
   <div className="carpeta">
   <FontAwesomeIcon icon={faUser}/> Historial de chats
   </div>
</div>

</div>

    </div>

    </Fragment>
)
}