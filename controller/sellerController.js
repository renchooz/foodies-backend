import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
         path: "/",
      });

      return res.status(200).json({ status: true, message: "Seller logged in successfully" });
    }

    return res.status(401).json({ status: false, message: "Invalid credentials" });
  } catch (error) {
    console.error("Seller login error:", error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};


export const sellerisAuth = async (req, res) => {
  try {
    return res.json({
      status: true,
      
    });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};



export const sellerlogout = async (req, res) => {
  try {
    const {sellerToken} = req.cookies
    res.clearCookie("sellerToken", {
       httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
     
      path: "/",
    });
    res.json({ status: true, message: "Loged Out" });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};
