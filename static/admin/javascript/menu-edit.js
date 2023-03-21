async function loadPage(pageContent) {

    let select = document.querySelector(".menu-form").querySelector("select");
    document.querySelector(".page-title").innerHTML = pageContent.title;
    document.querySelector(".confirm-button").innerHTML = pageContent.addButtonLabel;
    const editSectionButton = document.querySelector(".edit-button")
    editSectionButton.innerHTML = pageContent.editButtonLabel;
    editSectionButton.addEventListener("click", () => {
        window.sessionStorage.setItem("editedSectionId", select.value);
        window.location.href = "/admin/html/menu-items-edit.html";
    })
    document.querySelector(".cancel-button").innerHTML = pageContent.deleteButtonLabel;
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel;
    (await getMenuSections()).forEach(section => {
        addOption(select, section);
    })
    document.querySelector(".confirm-button").addEventListener("click",() =>  addSection());
}

function addOption(select, section){
    let value = 0;
    let option = document.createElement("option");
    option.selected = value === 0;
    option.nodeValue = value++;
    option.value = section.id;
    option.innerHTML = section.name;
    select.appendChild(option);
}

function addSection(){
    let section = window.prompt("Añada la sección deseada")
    if (section == null) return;
    addOption(section);
    /* Añadir a la base de datos la nueva sección*/
//  ...
}

function aDASD(){
    
}