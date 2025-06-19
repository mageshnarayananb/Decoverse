const kryTrack = document.getElementById('kry-carousel-track');
const krySlides = Array.from(kryTrack.children);
const slideCount = krySlides.length;
const visibleSlides = 3;

let kryCurrentIndex = 0;
document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll('.kry-carousel-wrapper');

  carousels.forEach((wrapper) => {
    const track = wrapper.querySelector('.kry-carousel-track');
    const slides = track.querySelectorAll('.kry-carousel-slide');
    const slideWidth = slides[0].offsetWidth;
    const visibleSlides = Math.floor(wrapper.offsetWidth / slideWidth);
    const maxIndex = slides.length - visibleSlides;

    let index = 0;

    const updateTransform = () => {
      track.style.transform = `translateX(-${index * slideWidth}px)`;
    };

    wrapper.querySelector('.kry-prev').addEventListener('click', () => {
      index = Math.max(0, index - 1);
      updateTransform();
    });

    wrapper.querySelector('.kry-next').addEventListener('click', () => {
      index = Math.min(maxIndex, index + 1);
      updateTransform();
    });
  });
});

// Clone slides for infinite loop
function kryCloneSlides() {
	for (let i = 0; i < visibleSlides; i++) {
		const cloneStart = krySlides[i].cloneNode(true);
		const cloneEnd = krySlides[slideCount - 1 - i].cloneNode(true);
		kryTrack.appendChild(cloneStart);
		kryTrack.prepend(cloneEnd);
	}
}
kryCloneSlides();

// Update with new slides after cloning
const kryAllSlides = Array.from(kryTrack.children);

// Set initial position
let krySlideWidth = kryAllSlides[0].offsetWidth + 20; // +gap
let kryPosition = visibleSlides * krySlideWidth;
kryTrack.style.transform = `translateX(-${kryPosition}px)`;

// Resize handler to update width on window resize
window.addEventListener('resize', () => {
	krySlideWidth = kryAllSlides[0].offsetWidth + 20;
	kryTrack.style.transition = 'none';
	kryTrack.style.transform = `translateX(-${
		(visibleSlides + kryCurrentIndex) * krySlideWidth
	}px)`;
});

// Slide Function
function krySlide(direction) {
	kryCurrentIndex += direction;
	kryTrack.style.transition = 'transform 0.5s ease';
	kryTrack.style.transform = `translateX(-${
		(visibleSlides + kryCurrentIndex) * krySlideWidth
	}px)`;

	// Looping logic
	kryTrack.addEventListener(
		'transitionend',
		() => {
			if (kryCurrentIndex >= slideCount) {
				kryTrack.style.transition = 'none';
				kryCurrentIndex = 0;
				kryTrack.style.transform = `translateX(-${visibleSlides * krySlideWidth}px)`;
			} else if (kryCurrentIndex < 0) {
				kryTrack.style.transition = 'none';
				kryCurrentIndex = slideCount - 1;
				kryTrack.style.transform = `translateX(-${
					(visibleSlides + kryCurrentIndex) * krySlideWidth
				}px)`;
			}
		},
		{ once: true },
	);
}

// Controls
document.querySelector('.kry-prev').addEventListener('click', () => krySlide(-1));
document.querySelector('.kry-next').addEventListener('click', () => krySlide(1));

// Auto Slide every 3 seconds
setInterval(() => {
	krySlide(1);
}, 3000);

