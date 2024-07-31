import { useState } from "react";
import { Editor } from 'primereact/editor';

const Comentarios = ({ comment, setComment  }) => {

  return (
    <div className="textEditor" >

    <Editor  placeholder="Escribe un comentario..."
     value={comment}  onTextChange={(e) => setComment(e.htmlValue)}  
     style={{ height: '50px', width: '100%' }} />

</div>
  );
};

export default Comentarios;
