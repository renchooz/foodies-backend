import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token)
    return res.json({ status: false, message: "not authorized" });

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decodeToken.id) {
      req.userId = decodeToken.id;
      req.email = decodeToken.email
    
    } else {
      return res.status(401).json({ status: false, message: "Not authorized" });
    }

    next();
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export default authUser;
