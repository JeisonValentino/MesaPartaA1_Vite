export const isObjEmpty = (obj)=>{
console.log("paso por el isObjempy")
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}