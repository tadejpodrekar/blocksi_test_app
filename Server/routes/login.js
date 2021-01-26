const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = app => {
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;

        const user = await User.find(u => { return u.username === username && u.password === password });

        if (user) {
            const accessToken = jwt.sign({ username: user.username,  role: user.role }, process.env.JWT_SECRET);

            res.json({
                accessToken
            });
        } else {
            res.send('Username or password incorrect');
        }
    })
}