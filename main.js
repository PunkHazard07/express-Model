const express = require('express');
const app = express();
const port = 4000;

//custom middleware to verify time
const verifyTime = (req, res, next) => {
    const currentHour =new Date().getHours();
    
    //define business hours
    const openHour = 9;
    const closeHour = 17;

    if(currentHour>= openHour && currentHour < closeHour) {
        next();
    } else{
        res.status(403).send('Request not allowed not in business hours(9am - 5pm)');
    }
};

//apply the middleware to routes
app.use(verifyTime);


app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});
app.get('/contact', (req, res) => {
    res.sendFile('contact.html', {root: __dirname});
})
app.get('/service', (req, res) => {
    res.sendFile('service.html', {root: __dirname});
})

app.listen(port, () => {
    console.log (`👍🍓server is up and running at http://localhost:${port}`)
});