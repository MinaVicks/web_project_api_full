const auth = (req, res, next) => {
    console.log('Auth middleware triggered in Auth.js');
    next(); // Call next() to pass control to the next middleware or route handler
    res.send('Auth middleware is working from Auth.js');
};

module.exports = auth;