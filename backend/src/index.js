
const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();
mongoose.set('strictQuery', true)

app.use(express.json());

mongoose.connect("mongodb+srv://Omprakash:5yT4lLgw8aasxDCA@register-login.zlnwypj.mongodb.net/register", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

//----------handling wrong api edge case--------------------------------------------
app.use((req, res) => {
    res.status(400).send({ status: false, error: "Endpoint is not Correct" });
})

app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});