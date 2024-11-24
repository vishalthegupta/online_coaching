import jwt from 'jsonwebtoken';

const authenticateToken = (req , res , next) => {
     const authHeader = req.headers["authorization"];
     const token = authHeader && authHeader.split(" ")[1];
     if(token == null) {
        return res.status(401).json({message : "Authentication Token Required"});
     }

    jwt.verify(token , "coursehub123" , (err , user) => {
         if(err) {
            return res.status(403).json({message : "Token expired. Please Sign-in again"});
         }
         res.user = user;
         next();
    })
}

export { authenticateToken };
