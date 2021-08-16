/**
 * [getRandomArbitrary generate random ]
 *
 * @param   {[type]}  min  [min minimal number]
 * @param   {[type]}  max  [max max number]
 *
 * @return  {[type]}       [return value number random between min and max]
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

process.on('message', cant => {

    let collection = {};

    if (Number(cant)>0){
        
        for (let i = 0; i < cant; i++) {

            let random = getRandomArbitrary(0,10000);
            if (collection[random]){
                collection[random] = collection[random] +1;
            }else{
                collection[random] = 0;
            }
            
        }
    }

    
    process.send(collection);
})