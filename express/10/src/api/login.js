class LoginController {
    
    
    constructor(repo){
        this.repo = repo;
    }

    vistalogout = async (req,res,next) =>{

        if (req.query.username){

            return res.render('logout',{user:req.query.username});
        }

        return res.redirect('http://localhost:3000/login');
    }

    failLogin = async (req,res,next)=>{
        return res.render("faillogin");
    }

    failSignup = async (req,res,next)=>{
        return res.render("failsignup");
    }

    vistasignup = async (req,res,next)=>{
        return res.render("signup");
    }

    signup = async (req,res,next)=>{
        console.log(req.user);
        if (req.user){
            req.session.user = req.user;
            return res.redirect("http://localhost:3000/productos/vista");
        }
    }

    logout = async(req,res,next) =>{
        const username = req.user.username;
        req.logout();
        res.clearCookie('user');
        req.session.destroy();
        return res.redirect("http://localhost:3000/logout?username="+username);
    }

    login = async (req,res,next) =>{

        console.log(req.user);

        if (req.user){
            req.session.user = req.user;
            res.cookie('user' ,req.session.user.username, {expire : 1000 * 60});
            return res.redirect("http://localhost:3000/productos/vista");
            
        }
        return res.redirect('http://localhost:3000/faillogin');
    }

    vistaLogin = async (req,res,next) =>{
        return res.render('login');
    }
}

module.exports = LoginController;