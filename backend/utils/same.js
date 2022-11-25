function same(arr1,arr2){
    if(arr1.length==0 && arr2.length==0){
        return false
    }
    if(arr1.length!=arr2.length){
        return false
    }
    for (let i of arr1) {
        for(let j=0; j<arr2.length; j++) {
            if(i._id.equals(arr2[j]._id)){
                break
            }
            if(j == (arr2.length-1)){
                return false
            }
        }
    }
    return true
}

module.exports = same