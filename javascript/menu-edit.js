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
            section.nodeValue = value++;
            section.innerHTML = element.sectionName;
            select.appendChild(section);
       });
       
    })
    document.querySelector(".confirm-button").addEventListener("click",() => redirectPage(true))
}


function redirectPage(isNew){
    window.location.href = "menu-items.html?isNew" + isNew;
}