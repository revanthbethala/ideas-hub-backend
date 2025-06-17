import jwt from "jsonwebtoken";

export const authenticateToken = async (req, res, next) => {
  const header = req.get("authorization");
  if (!header) {
    return res.status(404).json({ error: "Authorization header missing" });
  }
  const token = header.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Bearer Token missing" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ error: "Invalid token or token expired" });
    }
    req.user = user;
    next();
  });
};
