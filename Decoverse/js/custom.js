// ========= Navigation Menu Toggle ========= //
function openNav() {
	document.getElementById('myNav')?.classList.toggle('menu_width');
	document.querySelector('.custom_menu-btn')?.classList.toggle('menu_btn-style');
}

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