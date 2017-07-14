var URL = "https://f29f39c507cd43639862ec95802fbb0e-vp0.us.blockchain.ibm.com:5004/chaincode"
var myKeyVals = {
    "jsonrpc": "2.0",
    "method": "invoke",
    "params": {
        "type": 1,
        "chaincodeID": {
            "name": "030e77eef0cc69ff8a573a102a6f53c208161d4aacd67270dd29c12c3687c71cdc65602b3da2f5d3989238519686689cf311405b61e2caaca6dc1b648ae26458"
        },
        "ctorMsg": {
            "function": "setCash",
            "args": [
                "gh", "500"
            ]
        },
        "secureContext": "admin"
    },
    "id": 2
};
var user = "test";

function pay(cash, points) {

    $('#output').empty();
    var input = document.getElementById("username").value;
    if (input === "") {
        $('#output').append('<h1 class="text-warning">Enter your username</h1>');
        return
    }
    myKeyVals.params.ctorMsg.args = [input, cash];

    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(myKeyVals),
        dataType: "text",
        success: function (resultData) {
            resultData = JSON.parse(resultData);
            console.log(resultData)


            if (resultData.error == null || resultData.error == undefined) {

                $('#output').append('<h1 class="text-success">' + input + ' has spent $' + cash + '</h1>');

                console.log(resultData.result.message);
            } else {
                $('#output').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data)
            }

            point(input, points);
        }

    })


}

function point(username, points) {

    $('#output2').empty();

    myKeyVals.params.ctorMsg.args = [username, points];
    myKeyVals.params.ctorMsg.function = "setPoints";

    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(myKeyVals),
        dataType: "text",
        success: function (resultData) {
            resultData = JSON.parse(resultData);
            console.log(resultData)


            if (resultData.error == null || resultData.error == undefined) {

                $('#output2').append('<h1 class="text-warning">' + username + ' has won ' + points + ' points </h1>');

                console.log(resultData.result.message);
            } else {
                $('#output2').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data)
            }

        }

    })


}
