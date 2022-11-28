class Errors{
    empty = 0;
}

const validate_input = (element,callback =(error,el)=>{})=>{
    if(element.value === ''){
        callback(Errors.empty,element)
        return false
    }
    else{
        return true
    }
}