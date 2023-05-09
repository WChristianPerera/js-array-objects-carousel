const arrImg = [
	{
		image: 'img/01.webp',
		title: 'Marvel\'s Spiderman Miles Morale',
		text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
	},
	{
		image: 'img/02.webp',
		title: 'Ratchet & Clank: Rift Apart',
		text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
	},
	{
		image: 'img/03.webp',
		title: 'Fortnite',
		text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
	},
	{
		image: 'img/04.webp',
		title: 'Stray',
		text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
	},
	{
		image: 'img/05.webp',
		title: "Marvel's Avengers",
		text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
	}
];

let activeIndex = Math.floor(arrImg.length / 2); 
let sliderDirection = 1; 
let isAutorun = true;
let autorunTime = 2000;
let idAutorun;

const eleCarousel = document.querySelector('.carousel');
const containerSlides = document.querySelector('.slides');
const containerThumbs = document.querySelector('.thumbs-imgs');
const btnInvert = document.querySelector('.btn-invert');
const btnController = document.querySelector('.btn-controller');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

renderSlider();
runSlider();

btnInvert.addEventListener('click', invertSliderDirection);
btnController.addEventListener('click', toggleAutorun);
btnNext.addEventListener('click', showNextSlide);
btnPrev.addEventListener('click', showPrevSlide);
eleCarousel.addEventListener('mouseover', stopAutorun);
eleCarousel.addEventListener('mouseout', runSlider);

const listSlides = document.querySelectorAll('.slides .slide');
const listThumbs = document.querySelectorAll('.thumbs img');

for (let i = 0; i < listThumbs.length; i++) {
	listThumbs[i].addEventListener('click', () => setActiveIndex(i))
};



/* Function Definitions */

function renderSlider() {
	for (let i = 0; i < arrImg.length; i++) {
		const slide = arrImg[i];
		containerSlides.innerHTML += `
			<div class="slide${i == activeIndex ? ' active' : ''}">
				<img src="${slide.image}" alt="${slide.title}">
				<div class="contents">
					<h2>${slide.title}</h2>
					<p>${slide.text}</p>
				</div>
			</div>`;

		containerThumbs.innerHTML += `<img src="${slide.image}" alt="" class="${i == activeIndex ? 'active' : ''}">`;
	}
};

function setActiveIndex(i) {
	listSlides[activeIndex].classList.remove('active');
	listThumbs[activeIndex].classList.remove('active');
	activeIndex = i;
	listSlides[activeIndex].classList.add('active');
	listThumbs[activeIndex].classList.add('active');
};

function showNextSlide() {
	listSlides[activeIndex].classList.remove('active');
	listThumbs[activeIndex].classList.remove('active');
	activeIndex++;
	if (activeIndex >= listSlides.length) {
		activeIndex = 0;
	}
	listSlides[activeIndex].classList.add('active');
	listThumbs[activeIndex].classList.add('active');
};

function showPrevSlide() {
	listSlides[activeIndex].classList.remove('active');
	listThumbs[activeIndex].classList.remove('active');
	activeIndex--;
	if (activeIndex < 0) {
		activeIndex = listSlides.length - 1;
	}
	listSlides[activeIndex].classList.add('active');
	listThumbs[activeIndex].classList.add('active');
};

function invertSliderDirection() {
	sliderDirection *= -1;
};

function runSlider() {
	if (isAutorun) {
		idAutorun = setInterval(() => sliderDirection == 1 ? showNextSlide() : showPrevSlide(), autorunTime);
		btnController.innerHTML = 'STOP';
	} else {
		clearInterval(idAutorun);
		btnController.innerHTML = 'Start';
	}
};

function toggleAutorun() {
	isAutorun = !isAutorun;
	runSlider();
};

function stopAutorun() {
	clearInterval(idAutorun);
};