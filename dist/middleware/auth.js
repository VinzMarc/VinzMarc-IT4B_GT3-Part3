import jwt from "jsonwebtoken";
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid bearer token" });
    }
    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET ?? "dev-secret";
    try {
        const payload = jwt.verify(token, jwtSecret);
        req.userId = payload.userId;
        return next();
    }
    catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
