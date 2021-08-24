

const {fork } = require('child_process');

const numCPUs = require('os').cpus().length;

const config = require('../config/index');

const logger = config.logger;

class WProcessController {

    constructor(){
    }

    getRandom = async (req,res,next) => {

        let cant = 100000000;

        if (Object.keys(req.query).length>0 && req.query.cant){
            cant = req.query.cant;
        }

        const computo = fork("./src/util/computo.js");

        computo.send(cant);

        computo.on('message',value => {
            logger.info(`Valor: ${value}`);
            res.status(200).json(value);
        })
        
    }

    getInfo = async (req,res,next) =>{
        
        const response = {
            argvs:process.argv,
            currentdirectory:process.cwd(),
            processid: process.pid,
            memoryuse:process.memoryUsage(),
            version:process.version,
            platform:process.platform,
            executionpath:process.execPath,
            cantcpu: numCPUs,
        };

        logger.info(`Valor: ${response}`);
        
        res.status(200).json(response);

    }

}

module.exports = WProcessController;