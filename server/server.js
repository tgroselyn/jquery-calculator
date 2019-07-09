const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5566;

let calcHistory = [];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
})

// //delete route for /calc
// app.delete('/calc', (req, res) => {
//     calcHistory = [];
//     res.sendStatus(200);
// })

//get route for /calc
app.get('/calc', (req, res) => {
    res.send(calcHistory);
})

//post route for /calc
app.post('/calc', (req, res) => {
    calculateObject(req.body);
    res.sendStatus(201);
});

let calculateObject = (newObject) => {
    switch(newObject.operator) {
        case '+':
            newObject.result = parseFloat(newObject.firstNumber) + parseFloat(newObject.secondNumber);
            break;
        case '-':
            newObject.result = newObject.firstNumber - newObject.secondNumber;
            break;
        case '*':
            newObject.result = newObject.firstNumber * newObject.secondNumber;
            break;
        case '/':
            newObject.result = newObject.firstNumber / newObject.secondNumber;
    }
    calcHistory.push(newObject);
} //end calculateObject