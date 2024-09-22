module.exports.CheckUser = function(req, res, next)
{

    const UserId = req.session.userid

    if(!UserId){
        res.redirect('/login')
    }

    next()

}