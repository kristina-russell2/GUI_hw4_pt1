/* Created by Kristina Russell - 11/16/2023 - kristina_russell@student.uml.edu

Sources Used:
https://www.w3schools.com/html/html_tables.asp
https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements
https://www.w3schools.com/jsref/met_node_appendchild.asp
https://www.w3schools.com/jsref/prop_node_childnodes.asp
https://www.w3schools.com/html/html_forms.asp
https://www.w3schools.com/jsref/jsref_parseint.asp
https://www.w3schools.com/js/js_htmldom_elements.asp
*/

function useForm() {
    // get all the elements from the form submission
    const userInput = document.getElementById("ColRowForm").elements;
    // convert the incoming string into an int
    const minCol = parseInt(userInput["MinCol"].value);
    const maxCol = parseInt(userInput["MaxCol"].value);
    const minRow = parseInt(userInput["MinRow"].value);
    const maxRow = parseInt(userInput["MaxRow"].value);

    // error handling, any out of bounds will be caught and throw an error message
    if (minCol > 50 || minCol < -50 || maxCol > 50 || maxCol < -50 || minRow > 50 || minRow < -50 || maxRow > 50 || maxRow < -50){
        const targTable = document.getElementById("table");
        targTable.innerHTML = '';
        const h1Ele = document.createElement("h1");
        h1Ele.appendChild(document.createTextNode("------> ERROR <------"));
        targTable.appendChild(h1Ele);

        const h2Ele = document.createElement("h2");
        h2Ele.appendChild(document.createTextNode("You have entered a number that does not fit the bounds!"));
        targTable.appendChild(h2Ele);
        
        const h2v2Ele = document.createElement("h2");
        h2v2Ele.appendChild(document.createTextNode("Please fix your values."));
        targTable.appendChild(h2v2Ele);

        return;
    }

    // error handling, if a min number is bigger than a max number an error will throw
    if (minCol > maxCol || minRow > maxRow){
        const targTable = document.getElementById("table");
        targTable.innerHTML = '';
        const h1Ele = document.createElement("h1");
        h1Ele.appendChild(document.createTextNode("------> ERROR <------"));
        targTable.appendChild(h1Ele);

        const h2Ele = document.createElement("h2");
        h2Ele.appendChild(document.createTextNode("You have min numbers that are greater than their max numbers!"));
        targTable.appendChild(h2Ele);
        
        const h2v2Ele = document.createElement("h2");
        h2v2Ele.appendChild(document.createTextNode("Please fix your values."));
        targTable.appendChild(h2v2Ele);

        return;
    }

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
    for(var j = minRow; j <= maxRow; j++){
        const thEle = document.createElement("th");
        const rowHeaders = document.createTextNode(j);
        thEle.appendChild(rowHeaders);
        trEle.appendChild(thEle);
    }

    for(var i = minCol; i <= maxCol; i++){
        // makes the left hand min and max column numbers
        const trEle = document.createElement("tr");
        const colHeaders = document.createTextNode(i);
        trEle.appendChild(colHeaders);
        // makes the actual multiplication contents of the table
        for(var j = minRow; j <= maxRow; j++){
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