const auth = require('../models/auth')

module.exports = class AuthController{

    static async login(req, res){
        res.render('users/login')
    }

    static register(req, res){
        try{
            res.render('users/register')
        }catch(err){
            console.log(err)
        }
    }

}