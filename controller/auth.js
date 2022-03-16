// console.log('inside controller');
exports.getLogin = (req, res, next) => {
    // console.log('inside getLogin');
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    })
}
exports.postLogin = (req, res, next) => {
    req.is
    res.render('auth/login')
}