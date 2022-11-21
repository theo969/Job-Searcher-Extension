const header = document.querySelector('header');
const main = document.querySelector('main')
const categories = document.querySelector('.categories');
const dropdown = document.querySelectorAll('.dropdown');
const dropdownValues = document.querySelectorAll('.dropdownValues > div');
const dropdownValue = document.querySelectorAll('.dropdownValue');
const nav = document.querySelector('nav')
const body = document.body;
let lastScroll = 0;

dropdown.forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('active')
  })
});

dropdownValues.forEach(el => {
  el.addEventListener('click', () => {
    const id = el.id;
    const dropdownValueHeader = document.querySelector(`#${id}`);
    removeAllDropdownValueClass();
    el.classList.add('mainDropdownValue');
    dropdownValueHeader.innerHTML = el.innerHTML
  })
});

function removeAllDropdownValueClass() {
  dropdownValues.forEach(el => {
    el.classList.remove('mainDropdownValue')
  });
}

categories.addEventListener('click', () => {
  nav.classList.toggle('active');
  categoriesClick = true;
})

main.addEventListener('click', () => {
  if (nav.classList.contains('active')) {
    nav.classList.remove('active');
  }
})

setInterval(() => {
  if (window.innerWidth > 992) {
    nav.classList.remove('active');
  }
  if (window.scrollY >= 10) {
    header.classList.add("onScroll")
  } else if (window.scrollY < 10) {
    header.classList.remove("onScroll")
  }
})

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll < 100) return;

  if (currentScroll <= 0) {
    body.classList.remove("scroll-up")
  }

  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down")
  }
  if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down")
    body.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
})
