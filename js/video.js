function updateVideoSource() {
    let video = document.querySelector("video");
    let sourceSmall = "videos/video-mobile.mp4";
    let sourceLarge = "videos/video-desktop.mp4";

    let newSource = window.innerWidth > 1024 ? sourceLarge : sourceSmall;

    // Pega o src atual como atributo, comparando corretamente
    if (video.getAttribute("src") !== newSource) {
        video.setAttribute("src", newSource);
        video.load();
    }
}

// Dispara a função ao carregar a página
window.addEventListener("load", updateVideoSource);

// Dispara a função sempre que a tela for redimensionada
window.addEventListener("resize", updateVideoSource);
