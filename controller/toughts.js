const Toughts = require('../models/toughts')

module.exports = class ToughtsController{

    static async Showall(req, res){
        res.render('toughts/home')
    }

}