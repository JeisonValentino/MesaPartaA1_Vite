import { Buffer } from 'buffer';
export const onchangeImage= (entity)=>{
    var reader =new FileReader();
    const byteCharacters =Buffer.from(entity.data ,'base64').toString('binary');
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: entity.type });
    var fileactual = new File([blob], entity.name, { lastModified: new Date().getTime(), type: entity.type})
    reader.addEventListener("load", function () {
        return reader.result
    })
    if(fileactual){
    reader.readAsDataURL(fileactual)
    return URL.createObjectURL(fileactual)
    }else{
        return ""
    }
    }