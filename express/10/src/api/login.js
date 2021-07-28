const user = {
    username:'sample',
    password:'sample'
}

class LoginController {
    
    
    constructor(repo){
        this.repo = repo;
    }

    vistalogout = async(req,res,next) =>{

        if (req.query.username){

            return res.render('logout',{user:req.query.username});
        }

        return res.redirect('http://localhost:3000/login');
    }

    logout = async(req,res,next) =>{

        if (req.session.user){ 
            req.session.destroy();
            //NO FUNCIONA
            // req.session.destroy((err)=>{
            //     if (!err){
            //         console.log("Ok logout");
            //         return res.redirect('http://localhost:3000/logout?username='+user.username);
            //     }else{
            //         console.log(`Error: ${err}`);
            //     }
            // })
            res.clearCookie('user');
            return res.status(200).json({status:true,info:'http://localhost:3000/logout?username='+user.username});
            
        }
        return res.status('500').json({status:false,info:'sin user'})
    }

    login = async (req,res,next) =>{

        console.log(req.body);

        if (req.body.username && req.body.password){

            //const user = await this.repo.find(username);

            if (user){
                if (user.username === req.body.username && req.body.password === user.password ){
                    req.session.user = user;
                    //NO FUNCIONA
                    // req.session.save(function(err){
                    //     if (!err){
                    //         console.log(req.session);
                    //          //res.setHeader('Content-Type', 'application/json');
                    //         res.redirect('http://localhost:3000/productos/vista');
                    //         //return res.status(200).json({status:true,info:'http://localhost:3000/productos/vista'});
                    //     }else{
                    //         console.error(err);
                    //     }
                    // });
                    //return res.redirect('http://localhost:3000/productos/vista');
                    res.cookie('user' ,user.username, {expire : 1000 * 60});
                    return res.status(200).json({status:true,info:'http://localhost:3000/productos/vista'});
                    
                }
            }            
        }
        return res.status('401').json({status:false,info:'Credenciales incorrectaas'});
    }

    vista = async (req,res,next) =>{
        return res.render('login');
    }
}

module.exports = LoginController;