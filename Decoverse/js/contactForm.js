(function () {
	emailjs.init('TwKgYAKmaWl5a7iAu'); // Your public key
})();

function showFormMessage(message, isSuccess) {
	const formMessage = document.getElementById('formMessage');
	formMessage.textContent = message;
	formMessage.style.color = isSuccess ? 'green' : 'red';
}

function sendEmail(event) {
	event.preventDefault();
	const submitButton = document.getElementById('submit');
	const originalText = submitButton.innerText;

	const name = document.getElementById('name').value.trim();
	const phone = document.getElementById('phone').value.trim();
	const email = document.getElementById('email').value.trim();
	const message = document.getElementById('message').value.trim();

	if (!name || !phone || !email || !message) {
		showFormMessage('Please fill out all fields.', false);
		return;
	}

	submitButton.innerText = 'Sending...';
	submitButton.disabled = true;

	const templateParams = {
		from_name: name,
		phone_number: phone,
		from_email: email,
		message: message,
		to_name: 'Decovers',
	};

	emailjs
		.send('service_19sy3yi', 'template_5f9j2fm', templateParams) // Replace with your actual template ID
		.then(() => {
			showFormMessage('Message sent successfully!', true);
			document.getElementById('contactForm').reset();
		})
		.catch((error) => {
			console.error('Email Send Error:', error);
			showFormMessage('Failed to send message. Please try again later.', false);
		})
		.finally(() => {
			submitButton.innerText = originalText;
			submitButton.disabled = false;
		});
}
