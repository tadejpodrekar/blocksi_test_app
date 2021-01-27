const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
	let authHeader = req.headers['authorization']
	let token = authHeader && authHeader.split(' ')[1]
	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err)
        {
			console.log(err, 'e-authT')
			return res.sendStatus(403)
		} 
		req.user = user
		next()
	})
}

module.exports = authenticateToken