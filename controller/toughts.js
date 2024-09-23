const Toughts = require('../models/toughts')
const User = require('../models/auth')
const { where } = require('sequelize')

module.exports = class ToughtsController{

    static async Showall(req, res){

        res.render('toughts/home')
    }
    
    static async dashboard(req, res){

        const UserId = req.session.userid

        const user = await User.findOne({where: {id : UserId},
            include: Toughts,
            plain: true
        })

        const toughts = user.Toughts.map((result)=>result.dataValues)
        
        res.render('toughts/dashboard', {toughts})
    }

    static Create(req, res){
        res.render('toughts/create')
    }

    static async CreateSave(req, res){

        const tougth = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try{
            await Toughts.create(tougth)
            req.flash('message', 'PENSAMENTO CRIADO COM SUCESSO')
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        }catch(err){
            console.log(err)
        }
    }

    static async edit(req, res){

        const id = req.params.id    

        try{
            const toughts  = await Toughts.findOne({where:{id : id},
            raw:true
        })
            res.render('toughts/edit', {toughts})
        }catch(err){
            console.log(err)
        }
    }

    static async editSave(req, res){

        const {id, title} = req.body

        const toughts = {
            title: title
        }
        
       try {
        await Toughts.update(toughts, {where: {id : id}})
        res.redirect('/toughts/dashboard')
       } catch (error) {    
        console.log(error)
       }
    }

    static async delete(req,res){
        const id = req.body.id 
        try{
            await Toughts.destroy({where: {id:id}})
            res.redirect('/toughts/dashboard')
        }catch(err){
            console.log(err)
        }
    }

}