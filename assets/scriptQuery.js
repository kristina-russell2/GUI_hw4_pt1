// Created by Kristina Russell - 12/4/2023 - kristina_russell@student.uml.edu
// understanding of the JQuery Validation library was found here: https://jqueryvalidation.org/documentation/
$(document).ready(function(){
    $("#ColRowForm").validate({
        // make some rules that each field is required and must be a number from -50 to 50
        // note to future self, digit doesnt work for negatives because of the '-' symbol
        rules: {
            MinCol: {
                required: true,
                number: true,
                range: [-50, 50],
                leThan: "#MaxCol",
            },
            MaxCol: {
                required: true,
                number: true,
                range: [-50, 50],
                geThan: "#MinCol",
            },
            MinRow: {
                required: true,
                number: true,
                range: [-50, 50],
                leThan: "#MaxRow",
            },
            MaxRow: {
                required: true,
                number: true,
                range: [-50, 50],
                geThan: "#MinRow",
            }, 
        },
        // these are the error messages for each field of each element
        messages: {
            MinCol: {
                required: "Please enter a value for MinCol.",
                number: "Please enter only numbers for MinCol.",
                range: "Please enter a value between -50 and 50 for MinCol.",
                leThan: "Please make sure MinCol is less than MaxCol",
            },
            MaxCol: {
                required: "Please enter a value for MaxCol.",
                number: "Please enter only numbers for MaxCol.",
                range: "Please enter a value between -50 and 50 for MaxCol.",
                geThan: "Please make sure MaxCol is greater than MinCol",
            },
            MinRow: {
                required: "Please enter a value for MinRow.",
                number: "Please enter only numbers for MinRow.",
                range: "Please enter a value between -50 and 50 for MinRow.",
                leThan: "Please make sure MinRow is less than MaxRow",
            },
            MaxRow: {
                required: "Please enter a value for MaxRow.",
                number: "Please enter only numbers for MaxRow.",
                range: "Please enter a value between -50 and 50 for MaxRow.",
                geThan: "Please make sure MaxRow is greater than MinRow",
            },      
        },
    });

    // on button press, check that the form is valid before we handle the numbers
    $("#submitForm").click(function(){
        if($("#ColRowForm").valid()) {
            makeTable();
        }
    });
});

function makeTable() {
    // get all the elements from the form submission
    const userInput = document.getElementById("ColRowForm").elements;
    // convert the incoming string into an int
    const minCol = parseInt(userInput["MinCol"].value);
    const maxCol = parseInt(userInput["MaxCol"].value);
    const minRow = parseInt(userInput["MinRow"].value);
    const maxRow = parseInt(userInput["MaxRow"].value);

    // make the table row, table header, and table data tags...
    // unfortunately i figured out i have to recreate the element
    // every time i need new one...
    // get the location of the table element via its id
    // make sure the table isn't going to repeatedly duplicate 
    const trEle = document.createElement("tr");
    const thEle = document.createElement("th");
    const targTable = document.getElementById("table");
    targTable.innerHTML = '';

    // makes the * that sits in the upper left corner
    targTable.appendChild(trEle);
    thEle.appendChild(document.createTextNode("*"));
    trEle.appendChild(thEle);
    // makes the top row that contains the min and max row numbers
    for(var j = minCol; j <= maxCol; j++){
        const thEle = document.createElement("th");
        const rowHeaders = document.createTextNode(j);
        thEle.appendChild(rowHeaders);
        trEle.appendChild(thEle);
    }

    for(var i = minRow; i <= maxRow; i++){
        // makes the left hand min and max column numbers
        const trEle = document.createElement("tr");
        const colHeaders = document.createTextNode(i);
        trEle.appendChild(colHeaders);
        // makes the actual multiplication contents of the table
        for(var j = minCol; j <= maxCol; j++){
            //const trEle = document.createElement("tr"); <-- dont need bc we need it on same row as the col nums
            const tdEle = document.createElement("td");
            const multVals = i * j;
            const content = document.createTextNode(multVals);
            tdEle.appendChild(content);
            trEle.appendChild(tdEle);
            targTable.appendChild(trEle);
        }
    }
}

// for this portion i used https://jqueryvalidation.org/jQuery.validator.addMethod/
// along side a stackOverflow question https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
// to help me figure out what to do in terms of comparing the other element

//this adds a less than or equal to method by comparing the target element and the supplied element
$.validator.addMethod("leThan", function (value, param) {
    const $otherElement = $(param);
    if($otherElement.val() !== ''){
    return parseInt(value, 10) <= parseInt($otherElement.val(), 10);
    }
    else {
        return error;
    }
});

//this adds a less than or equal to method by comparing the target element and the supplied element
$.validator.addMethod("geThan", function (value, element, param) {
    const $otherElement = $(param);
    if($otherElement.val() !== ''){
        return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
    }
    else {
        return error;
    }
});