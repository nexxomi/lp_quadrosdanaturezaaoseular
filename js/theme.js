const toggleSwitch = document.querySelector('#themeToggle')
const htmlElement = document.documentElement

toggleSwitch.addEventListener('click', function () {
    this.classList.toggle('active')
    htmlElement.classList.toggle('dark-theme')
})