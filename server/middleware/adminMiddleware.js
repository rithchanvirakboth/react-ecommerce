export const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin === 1) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
}
