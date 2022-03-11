require('dotenv').config()
const express = require('express');
const app = express();

app.get('/api', (req,res) => {
    res.json({
        success: 1,
        message: "this is rest api working"
    })
})

//console.log("connected");
app.listen(process.env.APP_PORT , () => {
    console.log('server is listening on port ' + process.env.APP_PORT)
}); 