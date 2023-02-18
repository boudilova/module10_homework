const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  alert (`Размеры экрана:\nШирина: ${window.screen.width}px\nВысота: ${window.screen.height}px\nРазмеры окна\nШирина: ${document.documentElement.clientWidth}px\nВысота: ${document.documentElement.clientHeight}px`)
});
