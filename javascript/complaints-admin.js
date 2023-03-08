// JavaScript source code
w3IncludeHTML(loadContent("/demo-database/complaints.json"));

function loadContent(path) {
    fetch(path).then(response => response.json()).then(data => {
        loadPage(data)
    })
}

function loadPage(pageContent) {
    let table = document.getElementById("complaints-admin-table");
    const complaints = pageContent.formFields;
    complaints.slice().reverse().forEach(complaint => 
        createRow(complaint)
    );

}

function createRow(info) {
    let row = document.createElement("tr");
    row.appendChild(createTdElement("users-column",info.userPhone));
    row.appendChild(createTdElement("date-column",info.date));
    row.appendChild(createTdElement("messages-column",info.message));
    document.querySelector("#complaints-admin-table").querySelector("tbody").appendChild(row);
}

function createTdElement(className, inner) {
    let tdElement = document.createElement("td");
    tdElement.className = className;
    tdElement.innerHTML = inner;
    return tdElement;
}
