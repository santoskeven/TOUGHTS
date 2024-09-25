const Toughts = require('../models/toughts')
const User = require('../models/auth')
const { Op} = require('sequelize')

module.exports = class ToughtsController{

    static async Showall(req, res){

        const userId = req.session.userid

        let search = '';

        if(req.query.search){
            search = req.query.search;
        }

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        }else{
             order = 'DESC'
        }

        const usersData = await Toughts.findAll({
            include: User,
            where: {title: {[Op.like]: `%${search}%`}},
            order: [['createdAt', order]]
        })

        const toughts = usersData.map((result) => result.get({plain: true}))

    
        res.render('toughts/home', {toughts})
    }
    
    static async dashboard(req, res){

        const sessionId = req.session.userid

        const toughts = await Toughts.findAll({
            where: {UserId : sessionId},
            raw: true,
            order: [['createdAt', 'DESC']]
        })
        
        res.render('toughts/dashboard' , {toughts})
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
        req.session.save(()=>{
            res.redirect('/toughts/dashboard')
        })
       } catch (error) {    
        console.log(error)
       }
    }

    static async delete(req,res){
        const id = req.body.id 
        try{
            await Toughts.destroy({where: {id:id}})
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        }catch(err){
            console.log(err)
        }
    }

}