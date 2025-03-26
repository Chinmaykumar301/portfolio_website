document.getElementById("contact-form").addEventListener("submit", function(event) {
	event.preventDefault();

	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const subject = document.getElementById("subject").value;
	const message = document.getElementById("message").value;

	if (!validateEmail(email)) {
		alert("Invalid email address");
		return;
	}

	const formData = new FormData();
	formData.append("name", name);
	formData.append("email", email);
	formData.append("subject", subject);
	formData.append("message", message);

	fetch("/send-email.php", {
		method: "POST",
		body: formData
	})
	.then(response => {
		if (response.ok) {
			window.location.href = "thank-you.html";
		} else {
			throw new Error("Error sending email");
		}
	})
	.catch(error => {
		console.error(error);
		alert("Error sending email");
	});
});

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}