var URL = "https://f29f39c507cd43639862ec95802fbb0e-vp0.us.blockchain.ibm.com:5004/chaincode"
var myKeyVals = {
    "jsonrpc": "2.0",
    "method": "query",
    "params": {
        "type": 1,
        "chaincodeID": {
            "name": "030e77eef0cc69ff8a573a102a6f53c208161d4aacd67270dd29c12c3687c71cdc65602b3da2f5d3989238519686689cf311405b61e2caaca6dc1b648ae26458"
        },
        "ctorMsg": {
            "function": "getPoints",
            "args": [
                "test"
            ]
        },
        "secureContext": "admin"
    },
    "id": 2
}
var user = "test";
var x = "";
var y = "";
var z = true;

function getPoints() {
    $('#output1').empty();
    $('#output2').empty();
    $('#output3').empty();
    $('#output4').empty();
    $('#output5').empty();
    $('#output6').empty();
    var input = document.getElementById("get").value;
    myKeyVals.params.ctorMsg.args = [input];
    myKeyVals.params.ctorMsg.function = "getPoints";
    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(myKeyVals),
        dataType: "text",
        success: function (resultData) {
            resultData = JSON.parse(resultData);
            console.log(resultData)

            if (resultData.error == null || resultData.error == undefined) {
                if (resultData.result.message == null || resultData.result.message == undefined) {
                    $('#output1').append('<h1 class="text-warning">Buyer does not exist</h1>');
                } else {
                    var message = resultData.result.message.replace(/\"/g, "");
                    console.log(message);
                    if (z) {
                        $('#output1').append('<h1 class="text-danger">Buyer has Points = ' + message + '</h1>');
                    } else {
                        $('#output3').append('<h1 class="text-danger">Buyer had Points = ' + message + '</h1>');

                    }
                    x = message;


                }


            } else {
                $('#output1').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data)
                z = true;
            }

        }

    })
}
function getCash() {
    $('#output1').empty();
    $('#output2').empty();
    $('#output3').empty();
    $('#output4').empty();
    $('#output5').empty();
    $('#output6').empty();

    var input = document.getElementById("get").value;
    myKeyVals.params.ctorMsg.args = [input];
    myKeyVals.params.ctorMsg.function = "getCash";
    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(myKeyVals),
        dataType: "text",
        success: function (resultData) {
            resultData = JSON.parse(resultData);
            console.log(resultData)

            if (resultData.error == null || resultData.error == undefined) {
                if (resultData.result.message == null || resultData.result.message == undefined) {
                    $('#output2').append('<h1 class="text-warning">Buyer does not exist</h1>');
                } else {
                    var message = resultData.result.message.replace(/\"/g, "");
                    console.log(message);
                    if (z) {
                        $('#output2').append('<h1 class="text-danger">Buyer has Cash = ' + message + '</h1>');
                    } else
                    {
                        $('#output4').append('<h1 class="text-danger">Buyer had Cash = ' + message + '</h1>');
                        z = true;

                    }
                    y = message;

                }


            } else {
                $('#output2').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data)
            }

        }

    })
}


function exchange() {
    $('#output1').empty();
    $('#output2').empty();
    $('#output3').empty();
    $('#output4').empty();
    $('#output5').empty();
    $('#output6').empty();
    var input = document.getElementById("get").value;
    z = false;
    getPoints();
    z = false;
    getCash();
    var j = Number(x);
    var k = Number(y);
    k = k + j;
    j = 0;
    x = "" + k;
    y = "" + j;
    pay(input, x);
    point(input, y);

}



function pay(username, cash) {

    var newKeyVals = jQuery.extend(true, {}, myKeyVals);

    newKeyVals.params.ctorMsg.args = [username, cash];
    newKeyVals.method = "invoke";
    newKeyVals.params.ctorMsg.function = "setCash";

    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(newKeyVals),
        dataType: "text",
        success: function (resultData) {
            resultData = JSON.parse(resultData);
            console.log(resultData)


            if (resultData.error == null || resultData.error == undefined) {

                $('#output5').append('<h1 class="text-success">Now ' + input + ' has $' + cash + '</h1>');

                console.log(resultData.result.message);
            } else {
                $('#output5').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data)
            }

        }

    })


}

function point(username, points) {


    var newKeyVals = jQuery.extend(true, {}, myKeyVals);
    newKeyVals.params.ctorMsg.args = [username, points];
    newKeyVals.method = "invoke";
    newKeyVals.params.ctorMsg.function = "setPoints";

    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(newKeyVals),
        dataType: "text",
        success: function (resultData) {
            resultData = JSON.parse(resultData);
            console.log(resultData)


            if (resultData.error == null || resultData.error == undefined) {

                $('#output6').append('<h1 class="text-warning">Now ' + username + ' has ' + points + ' points </h1>');

                console.log(resultData.result.message);
            } else {
                $('#output6').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data)
            }


        }

    })


}
