export default (req, res, next) => {
    //this middleware redirect requests like 'user//all' to 'user/all'
    req.url = req.url.replace(/\/{2,}/g, '/');
    next();
}