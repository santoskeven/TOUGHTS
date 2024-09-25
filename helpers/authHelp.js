module.exports.CheckUser = function(req, res, next)
{

    const UserId = req.session.userid

    if(!UserId){
        return res.redirect('/login')
    }

    next()

}