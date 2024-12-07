const cookieParser = require('cookie-parser');
const authenticate = (req, res, next) => {

    if (req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'author')) {
        next();
    } else {
        res.status(403).json({ message: "Access denied: Admins only" });
    }
    


};


const authorizeAdmin=(req,res,next)=>{
if(req.user.role!=="admin")
{
    return res.status(403).json({ message: "Yalnızca yönetici erişimi" });
}
next();
}
module.exports={authenticate,authorizeAdmin}