// require('dotenv').config()
const path = require('path');
const express = require('express');
const url = 'mongodb://localhost/UserDatabase';
const mongoose = require('mongoose');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/api', (req,res) => {
//     res.json({
//         success: 1,
//         message: "this is rest api working"
//     })
// })
app.set('view engine', 'ejs');
app.set('views', 'views');
const authRoutes = require('./routes/auth')
app.use(authRoutes)

//console.log("connected");
app.listen(3000 , () => {
    console.log('server is listening on port ' + 3000)
}); 

mongoose.connect(url)
const con = mongoose.connection
con.on('open', () => {
    console.log("connected..");
})