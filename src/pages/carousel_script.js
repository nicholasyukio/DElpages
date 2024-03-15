let currentImageIndex = 0;

export function enlargeImage(event) {
    const clickedElement = event.currentTarget;
    const imageId = clickedElement.getAttribute('id');
    const src = 'depoimentos/'+imageId+'.png';
    console.log(src)
    const overlay = document.getElementById('image-overlay');
    const enlargedImage = document.getElementById('enlarged-image');
    enlargedImage.src = src;
    overlay.style.display = 'flex';
}

export function closeOverlay() {
    const overlay = document.getElementById('image-overlay');
    overlay.style.display = 'none';
}

export function moveCarousel(direction) {

    const images = document.querySelectorAll('.carousel-item');
    const imageCount = images.length;
    const visibleImages = 3; // Number of images visible in the carousel
    if (direction === 'left') {
        currentImageIndex = (currentImageIndex - 1 + imageCount) % imageCount;
    } else if (direction === 'right') {
        currentImageIndex = (currentImageIndex + 1) % imageCount;
    }

    // Hide all images
    images.forEach((item) => {
        item.style.display = 'none';
    });

    // Show the visible images in the carousel
    for (let i = currentImageIndex; i < currentImageIndex + visibleImages; i++) {
        const index = i % imageCount;
        images[index].style.display = 'block';
    }
}
