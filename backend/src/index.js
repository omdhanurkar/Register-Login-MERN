
const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors")
mongoose.set('strictQuery', true)
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Omprakash:5yT4lLgw8aasxDCA@register-login.zlnwypj.mongodb.net/register", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

//----------handling wrong api edge case--------------------------------------------
app.use((req, res) => {
    res.status(400).send({ status: false, error: "Endpoint is not Correct" });
})


app.listen(5000, function () {
    console.log('Express app running on port ' + 5000)
});