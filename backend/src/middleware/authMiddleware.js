const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

function generateToken(user){
    const accessToken =  jwt.sign({id : user.id }, ACCESS_SECRET, , { expiresIn: '1h' } );
    const refreshToken = jwt.sign({id : user.id }, REFRESH_TOKEN, , { expiresIn: '3d' } );
    return { accessToken, refreshToken };
}

function authenticate(req,res,next){
      const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); 
    req.user = user;
    next();
  });
}





