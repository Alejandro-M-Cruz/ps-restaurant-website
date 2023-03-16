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
       let select = document.querySelector(".menu-form").querySelector("select");
       let value = 0;
       data.forEach(element => {
            let section = document.createElement("option");
            if(value==0) section.selected = true;
            section.nodeValue = value++;
            section.innerHTML = element.name;
            select.appendChild(section);
       });
       
    })
    document.querySelector(".confirm-button").addEventListener("click",() =>  addSection());
    document.querySelector(".back-button").addEventListener("click", () => history.back());
    
}

function addOption
function addSection(){
    console.log(typeof window.prompt("Añada la sección deseada"));
}