import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ status: false, message: "User is not authorized" });
  }

  try {
    const decodeToken = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (decodeToken.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(403).json({ status: false, message: "Forbidden: Invalid seller" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export default authSeller;
