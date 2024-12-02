const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const authenticate = (req, res, next) => {
 
    // const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    // if (!token) {
    //     return res.status(401).json({ message: "Giriş yapmanız gerekiyor" });
    // }
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded; 
    //     next();
    // } catch (error) {
    //     return res.status(403).json({ message: "Geçersiz token" });
    // }
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