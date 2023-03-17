function loadContent(path) {
    fetch(path).then(response => response.json()).then(data => {
        loadPage(data)
    })
}

function loadPage(pageContent) {
    
    
    document.querySelector(".page-title").innerHTML = pageContent.title;
    document.querySelector(".confirm-button").innerHTML = pageContent.addButtonLabel;
    document.querySelector(".edit-button").innerHTML = pageContent.editButtonLabel;
    document.querySelector(".cancel-button").innerHTML = pageContent.deleteButtonLabel;
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel;
    fetch("/demo-database/menu-sections.json").then(response => response.json()).then(data => {
       
       
       data.forEach(element => {
            addOption(element.name);
       });
       
    })
    document.querySelector(".confirm-button").addEventListener("click",() =>  addSection());
    document.querySelector(".back-button").addEventListener("click", () => history.back());
    
}

function addOption(element){
    let select = document.querySelector(".menu-form").querySelector("select");
    let value = 0;
    let section = document.createElement("option");
    if(value==0) section.selected = true;
    section.nodeValue = value++;
    section.innerHTML = element;
    select.appendChild(section);
}
function addSection(){
    let section = window.prompt("Añada la sección deseada")
    if (section == null) return;
    addOption(section);
    /* Añadir a la base de datos la nueva sección*/
//  ...
}