var URL = "https://f29f39c507cd43639862ec95802fbb0e-vp0.us.blockchain.ibm.com:5004/chaincode"
var myKeyVals =       {
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

function getPoints() {
     $('#output1').empty();
    var input = document.getElementById("get").value;
    myKeyVals.params.ctorMsg.args = [input];
    myKeyVals.params.ctorMsg.function ="getPoints";
    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(myKeyVals),
        dataType: "text",
        success: function(resultData) { 
            resultData = JSON.parse(resultData);
            console.log(resultData)
           
            if (resultData.error == null || resultData.error == undefined) { 
                if (resultData.result.message == null || resultData.result.message == undefined) {
                     $('#output1').append('<h1 class="text-warning">Buyer does not exist</h1>');
                }
                else {
                    var message = resultData.result.message.replace(/\"/g, "");
                    console.log (message);
                    
                        $('#output1').append('<h1 class="text-danger">Buyer has Points = '+message+'</h1>');
                    
                  
                }

  
            }
            else {
                $('#output1').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data) 
            }
             
        }

    })
}
function getCash() {
     $('#output2').empty();
    var input = document.getElementById("get").value;
    myKeyVals.params.ctorMsg.args = [input];
    myKeyVals.params.ctorMsg.function = "getCash";
    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(myKeyVals),
        dataType: "text",
        success: function(resultData) { 
            resultData = JSON.parse(resultData);
            console.log(resultData)
           
            if (resultData.error == null || resultData.error == undefined) { 
                if (resultData.result.message == null || resultData.result.message == undefined) {
                     $('#output2').append('<h1 class="text-warning">Buyer does not exist</h1>');
                }
                else {
                    var message = resultData.result.message.replace(/\"/g, "");
                    console.log (message);
                    
                        $('#output2').append('<h1 class="text-danger">Buyer has Cash = '+message+'</h1>');
                    
                  
                }

  
            }
            else {
                $('#output2').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data) 
            }
             
        }

    })
}


function initUser() {
    $('#output3').empty();
    var newKeyVals = jQuery.extend(true, {}, myKeyVals);
    var input = document.getElementById("create").value;
    newKeyVals.params.ctorMsg.args = [input];
    newKeyVals.params.ctorMsg.function = "initUser";
    newKeyVals.method = "invoke";
     $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(newKeyVals),
        dataType: "text",
        success: function(resultData) { 
            resultData = JSON.parse(resultData);
            console.log(resultData)
            
            if (resultData.error == null || resultData.error == undefined) {
                
                $('#output3').append('<h1 class="text-success">Buyer successfully created  "' + input +'"</h1>');
                console.log(resultData.result.message);
            }
            else {
                $('#output3').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data) 
            }
             
        }

    })
}
