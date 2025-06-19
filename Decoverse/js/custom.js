// ========= Navigation Menu Toggle ========= //
function openNav() {
	const overlay = document.getElementById('myNav');
	const menuBtn = document.querySelector('.custom_menu-btn');
	const body = document.body;
	if (overlay && menuBtn && body) {
		overlay.classList.toggle('menu_width');
		menuBtn.classList.toggle('menu_btn-style');
		if (overlay.classList.contains('menu_width')) {
			body.classList.add('menu-open');
		} else {
			body.classList.remove('menu-open');
		}
	}
}

// Close overlay when a link is clicked
window.addEventListener('DOMContentLoaded', function() {
	const overlayLinks = document.querySelectorAll('#myNav .overlay-content a');
	const overlay = document.getElementById('myNav');
	const menuBtn = document.querySelector('.custom_menu-btn');
	const body = document.body;
	overlayLinks.forEach(link => {
		link.addEventListener('click', function() {
			overlay.classList.remove('menu_width');
			menuBtn.classList.remove('menu_btn-style');
			body.classList.remove('menu-open');
		});
	});
	// Ensure overlay is closed on every page load
	if (overlay) overlay.classList.remove('menu_width');
	if (body) body.classList.remove('menu-open');
});

// ========= Image Modal Logic ========= //
$(document).ready(function () {
	let $imageSrc;

	$('.concept_section .search-box').click(function () {
		$imageSrc = $(this).data('bigimage');
	});

	$('#myModal').on('shown.bs.modal', function () {
		$('#image').attr('src', $imageSrc);
	});

	$('#myModal').on('hide.bs.modal', function () {
		$('#image').attr('src', '');
	});
});
// ========= Google Maps ========= //
function myMap() {
	const mapProp = {
		center: new google.maps.LatLng(12.971598, 77.594562),
		zoom: 18,
	};
	const map = new google.maps.Map(document.getElementById('map'), mapProp);
}
window.myMap = myMap;

// ========= Scroll to Top ========= //
