/**
 * [getRandomArbitrary generate random ]
 *
 * @param   {[type]}  min  [min minimal number]
 * @param   {[type]}  max  [max max number]
 *
 * @return  {[type]}       [return value number random between min and max]
 */
 const config = require('../config/index');

 const logger = config.logger;

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

process.on('message', cant => {

    let collection = {};

    logger.warn(`procesamiento: ${cant}`);

    if (Number(cant)>0){
        
        for (let i = 0; i < cant; i++) {

            let random = String(getRandomArbitrary(0,1000000));
            if (collection[random]){
                collection[random] = Number(collection[random]) +1;
            }else{
                collection[random] = 1;
            }
            
        }
    }

    
    process.send(collection);
})