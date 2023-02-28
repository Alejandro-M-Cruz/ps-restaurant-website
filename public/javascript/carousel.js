window.onload = function () {
    const IMAGENES = [
        '/images/restaurante-1.jpg',
        '/images/restaurante-2.jpg',
        '/images/restaurante-3.jpg',
        '/images/restaurante-4.jpg',
        '/images/restaurante-5.jpg'
    ];

    let posicionActual = 0;
    let $backButton = document.querySelector('#slide-image__left-arrow');
    let $advanceButton = document.querySelector('#slide-image__right-arrow');
    let $imagen = document.querySelector('.slide-image-thing');
    let $title = document.querySelector('.slide-image-thing__center-text');
    let $description = document.querySelector('.slide-image-thing__center-text-p');
    let $divtext = document.querySelector('.slide-image-thing-text');
    
    function nextImage() {
        if (posicionActual >= IMAGENES.length - 1) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizeImage();
    }

    function previousImage() {
        if (posicionActual <= 0) {
            posicionActual = IMAGENES.length - 1;
        } else {
            posicionActual--;
        }
        renderizeImage();
    }

    function renderizeImage() {
        $imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
        // $divtext.style.filter = "brightness(100%)";
    }

    $advanceButton.addEventListener('click', nextImage);
    $backButton.addEventListener('click', previousImage);
    renderizeImage();
    
}