import { useState } from "react";
import { useRef } from "react";

const Video_Detecte_Qr = (props)=>{


    const {delay,onScan,onError}=props;
    const videoRef= useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto ,setHasPhoto]=useState(false);
    const [qrCode, setQrCode] = useState('');
    const qr = new QrCodeReader();
    const getVideo=()=>{
      navigator.mediaDevices.getUserMedia({
        video:{width:4096 ,height:2160 }
      }).then( (stream)=>{
        let video=videoRef.current;
    
       
       video.srcObject=stream;
        video.play()
      }).catch(err =>{
        onError(err);
      });
    
    }
    
    useEffect(()=>{
    getVideo();
    },[videoRef])
    
    
    useEffect(()=>{
      setInterval(async () => {
        // Capturar una imagen de la videocámara web
        const video = videoRef.current;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        const image = canvas.toDataURL("image/jpeg");
        // Escanear la imagen capturada en busca de códigos QR
    
        qr.callback = (err, value) => {
          if (err) {
            onError(err)
            return;
          }
          onScan(value.result);
        };
    
        qr.decode(image);
      }, delay);
    },[videoRef])
    
    
    
    const takePhoto = ()=>{
      const width =414;
      const heigth = width/(16/9);
      let video = videoRef.current;
      let photo= photoRef.current;
      var images = document.getElementById('img');
      photo.width=width;
      photo.height=heigth;
      let ctx =photo.getContext('2d');
      ctx.drawImage(video,0,0,width,heigth)
      photo.toBlob ((blob) => { 
      images.src = URL.createObjectURL(blob); 
      const imageData=ctx.getImageData(0,0,width,heigth);
      qr.callback = (err, value) => {
        if (err) {
          console.error(err);
          return;
        }
        onScan(value.result);
      };
      qr.decode(imageData);
      });
      console.log(qrCode)
      setHasPhoto(true)
    }
    const closePhoto = ()=>{
      let photo= photoRef.current;
      let ctx =photo.getContext('2d');
      ctx.clearRect(0,0,photo.width,photo.height);
      setHasPhoto(false);
    }
    
    
    return (
        <div className="App">
    <div className="camera">
      <video ref={videoRef} autoPlay ></video>
      <button onClick={()=>{takePhoto()}}>SNAP!</button>
    </div>
    <div className={'resultado'+(hasPhoto ? 'hasPhoto' : '')}>
    <canvas ref={photoRef}></canvas>
    <img id='img' />
    <button onClick={()=>{closePhoto()}} >Cerrar</button>
    <div>{qrCode}</div>
    </div>
        </div>
      )
}
export default Video_Detecte_Qr;