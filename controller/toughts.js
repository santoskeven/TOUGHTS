const Toughts = require('../models/toughts')
const User = require('../models/auth')

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

        console.log(user)
        
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

}