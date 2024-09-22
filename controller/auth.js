const auth = require('../models/auth')
const bcrytp = require('bcryptjs')

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

    static async Create(req, res){

        const {name, email, password, confirmPassword} = req.body

        console.log(name, email, password, confirmPassword)

        if(password != confirmPassword){
            console.log('senhas não batem')
            req.flash('message', 'As senhas não são iguais, tente novamente!!')
            res.render('users/register')

            return
        }

        //verificar se o email já está em uso
        const CheckUser = await auth.findOne({where: {email : email}})
        if(CheckUser){
            req.flash('message', 'Este email já está em uso, tente outro!!')
            res.render('users/register')

            return
        }

        //criptografar senha
        const salt = bcrytp.genSaltSync(10)
        const hashedPassword = bcrytp.hashSync(password, salt)  

        const user = {
            name: name,
            email: email,
            password: hashedPassword
        }

        try{
            req.flash('message', 'USUÁRIO CADASTRADO COM SUCESSO')
            const CreateUser = await auth.create(user)
            req.session.userid = CreateUser.id
            req.session.save(()=>{
                res.redirect('/')   
            })
        }catch(err){
            req.flash('message', 'FALHA NO CADASTRADO DO USUÁRIO')
            console.log(err)
        } 
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }

    static async loginSave(req, res){

        const {email, password} = req.body

        const User = await auth.findOne({where: {email : email}})

        if(!User){
            req.flash('message', 'USUÁRIO INCORRETO, TENTE NOVAMENTE!')
            res.render('users/login')

            return
        }

        const passwordMatch = bcrytp.compareSync(password, User.password)

        if(!passwordMatch){
            req.flash('message', 'SENHA INCORRETA, TENTE NOVAMENTE!')
            res.render('users/login')

            return
        }

        req.session.userid = User.id

        req.flash('message', 'LOGIN REALIZADO COM SUCESSO')

        req.session.save(()=>{
            res.redirect('/')
        })
    }

}