
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

class WPassport {

    constructor(repo){
        this.repo = repo;
    }


    isValidPassword = (user, password) => {
        return bcrypt.compareSync(password, user.password);
    }

    createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }

    checkLogin = async (req, username, password, done) => {

        let userModel = this.repo.getModel();
     
        let user = await userModel.findOne({username: username })

        if (!user) {
            return done(null, false, console.log('mensaje', 'usuario no encontrado'));
        } else {
            if (!this.isValidPassword(user, password)) {
                console.log('contraseña invalida');
                return done(null, false, console.log('mensaje', 'contraseña invalida'));
            } else {
                return done(null, user);
            }
        }
    }

    signup = async (req, username, password, done) => {

        let user = this.repo.getModel();

        let usuario = await user.findOne({username: username })
            
        if (usuario) {
            console.log('usuario ya existe');
            return done(null, false, console.log('mensaje', 'usuario ya existe'));
        } else {
            let newUser = {
                username: username,
                password: this.createHash(password),
            };
            await this.repo.save(newUser);
            return done(null, newUser);
        }
    }

    deserializeUser = async (obj, done) =>{
        let userModel = this.repo.getModel();
        let user = await userModel.findOne({username: obj })
        return done(null, user);
    }

    init = () =>{

        passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },this.checkLogin));
        
        passport.use('signup', new LocalStrategy({
            passReqToCallback: true
        },  this.signup));

        passport.serializeUser(function (user, done) {
            done(null, user.username);
        });
        
        passport.deserializeUser(this.deserializeUser);
    }
}

module.exports=WPassport;