import jwt from 'jsonwebtoken'

const authAdmin = (req, res, next) => {
    try {

        const atoken = req.headers.authorization?.split(" ")[1];
        if (!atoken) return res.status(401).json({ message: "Unauthorized user" });

        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        
        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({ success: false, message: "Not authorized Login"});
        }

        next(); 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
export default authAdmin;