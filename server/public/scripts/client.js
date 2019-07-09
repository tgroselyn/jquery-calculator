$(onReady);

let objectToCalculate = {
    firstNumber: '',
    operator: '',
    secondNumber: '',
    result: ''
};

function onReady() {
    console.log('js ready');
    updateExpression();
    getResultFromCalculator();

    //clear button empties object, input fields, and display area
    $('#clearBtn').on('click', function () {
        objectToCalculate = {
            firstNumber: '',
            operator: '',
            secondNumber: ''
        };
        $('input').val('');
        updateExpression();
    });

    //add input values to object when entered
    $('#firstNumberIn').on('change', function() {
        objectToCalculate.firstNumber = $('#firstNumberIn').val();
        updateExpression();
    });
    $('#secondNumberIn').on('change', function () {
        objectToCalculate.secondNumber = $('#secondNumberIn').val();
        updateExpression();
    });

    //operator buttons reassign object's operator property
    $('#addBtn').on('click', function() {
        objectToCalculate.operator = '+';
        updateExpression();
    });
    $('#subtractBtn').on('click', function () {
        objectToCalculate.operator = '-';
        updateExpression();
    });
    $('#multiplyBtn').on('click', function () {
        objectToCalculate.operator = '*';
        updateExpression();
    });
    $('#divideBtn').on('click', function () {
        objectToCalculate.operator = '/';
        updateExpression();
    });

    //equals button calls calculator sequence
    $('#equalsBtn').on('click', postToCalculator);

    // //dynamic delete button calls clear history function
    // $('#delete').on('click', '.delBtn', deleteHistory);

} //end onReady

function postToCalculator() {
    //validate input data
    if (validateData()) {
        //post to server
        $.ajax({
            type: 'POST',
            url: '/calc',
            data: objectToCalculate
        }).then(function (response) {
            //then, get the result
            getResultFromCalculator();
        });
    }
} //end postToCalculator

function getResultFromCalculator() {
    //get result from server
    $.ajax({
        type: 'GET',
        url: '/calc'
    }).then(function(response) {
        //update result using response (array)
        updateResult(response);
        //add to history section
        updateHistory(response);
        
        // //add delete button if needed
        // if (response.length < 1 || $('#delete').find('button').hasClass('delBtn')) {
        //     return false;
        // } else {
        //     $('#delete').append(`<button class="delBtn">Delete History</button>`);
        // }
    });
} //end getResultFromCalculator

function updateExpression() {
    $('#expression').empty();
    $('#result').empty();
    $('#expression').append(`${objectToCalculate.firstNumber} ${objectToCalculate.operator} ${objectToCalculate.secondNumber}`);
} //end updateResult

function updateResult(calcHistory) {
    if ($('#expression').text().length > 3) {
        $('#result').empty();
        $('#result').append(' = ' + calcHistory[calcHistory.length - 1].result);
    }
} //end updateResult

function updateHistory(calcHistory) {
    //empty area on DOM
    $('#history').empty();
    //loop through array to add every object to history section
    for (let item of calcHistory) {
        $('#history').append(`
            <li>${item.firstNumber} ${item.operator} ${item.secondNumber} = ${item.result}</li>
        `);
    } //end for loop
} //end updateHistory

// function deleteHistory() {
//     $.ajax({
//         type: 'DELETE',
//         url: '/calc'
//     }).then(function(response) {
//         getResultFromCalculator();
//     })
// }

function validateData() {
    if (objectToCalculate.firstNumber == '' || objectToCalculate.secondNumber == '' || objectToCalculate.operator == '') {
        alert('must include: first number, operator, and second number');
        return false;
    }
    return true;
} //end validateData