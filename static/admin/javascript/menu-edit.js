async function loadPage(pageContent) {
    addLabels(pageContent);
    fillSelect(document.querySelector(".menu-form").querySelector("select"));
    addUserInteraction();
}

async function fillSelect(select){
    (await getMenuSections()).forEach(section => {
        addOption(select, section);
    })
    select.removeChild(select.childNodes[1]);
}

function addLabels(pageContent){
    document.querySelector(".page-title").innerHTML = pageContent.title;
    document.querySelector(".confirm-button").innerHTML = pageContent.addButtonLabel;
    document.querySelector(".edit-button").innerHTML = pageContent.editButtonLabel;
    document.querySelector(".cancel-button").innerHTML = pageContent.deleteButtonLabel;
    document.querySelector(".back-button").innerHTML = pageContent.backButtonLabel;
}

function addUserInteraction(){
    let select = document.querySelector(".menu-form").querySelector("select");
    document.querySelector(".edit-button").addEventListener("click", () =>editSection(select));
    document.querySelector(".confirm-button").addEventListener("click",addSection);
    document.querySelector(".cancel-button").addEventListener("click",removeSection);

}
function addOption(select, section){
    if(!section)return;
    let value = 0;
    let option = document.createElement("option");
    option.selected = value === 0;
    option.nodeValue = value++;
    option.value = section.id;
    option.innerHTML = section.name;
    select.appendChild(option);
}

function addSection(){
    let newSection = window.prompt("Añada la sección deseada");
    if (!newSection) return;

    postMenuSection(newSection);
}

function editSection(select){
    window.sessionStorage.setItem("editedSectionId", select.value);
    window.location.href = "/admin/html/menu-items-edit.html";
}

function removeSection(){
    let select = document.querySelector(".menu-form").querySelector("select");

    deleteMenuSection(select.value);
}