const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        420: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        620: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        },
    }
});
