import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  // console.log("auth-key: ", req.headers.authorization);

  if (!token) {
    return res.status(403).json({
      message: "Нет доступа!",
    });
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");
      decoded._id ? (req.userId = decoded._id) : (req.userId = decoded.userId);
      next();
    } catch (err) {
      return res.status(403).json({
        message: "Нет доступа!",
      });
    }
  }
};
