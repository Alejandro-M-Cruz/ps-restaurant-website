window.onload = function () {
    const IMAGENES = [
        '/images/carousel/restaurante-1.jpg',
        '/images/carousel/restaurante-2.jpg',
        '/images/carousel/restaurante-3.jpg',
        '/images/carousel/restaurante-4.jpg',
        '/images/carousel/restaurante-5.jpg'
    ];

    let posicionActual = 0;
    let $backButton = document.querySelector('#slide-image__left-arrow');
    let $advanceButton = document.querySelector('#slide-image__right-arrow');
    let $imagen = document.querySelector('.slide-image-thing');
    let $imagentexto = document.querySelector('.slide-image-thing-text');
    
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
    }

    $advanceButton.addEventListener('click', nextImage);
    $backButton.addEventListener('click', previousImage);
    renderizeImage();
    
}