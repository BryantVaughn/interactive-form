// Wait for DOM content to be loaded in browser
window.addEventListener('DOMContentLoaded', () => {
	// Gather DOM elements
	const form = document.querySelector('form');
	const nameField = document.querySelector('#name');
	const jobRoleSelect = document.querySelector('#title');
	const otherJobRoleField = document.querySelector('#other-job-role');
	const shirtDesignSelect = document.querySelector('#design');
	const shirtColorSelect = document.querySelector('#color');
	const activitiesDiv = document.querySelector('.activities-box');
	const activities = activitiesDiv.querySelectorAll('input[type="checkbox"]');
	const activitiesCost = document.querySelector('.activities-cost');
	const paymentSelect = document.querySelector('#payment');

	// Initial setup when page loads
	// Apply focus to name field
	nameField.focus();

	// Hide other job role input field
	toggleOtherJobInput('none');

	// Disable shirt color select element
	toggleShirtColorSelect(true);

	// Default payment select to credit card
	paymentSelect.selectedIndex = 1;
	togglePaymentDisplay('credit-card');

	// Helper functions
	function updateShirtColorOptions(design) {
		const shirtColorOptions = shirtColorSelect.querySelectorAll(
			'option[data-theme]'
		);
		shirtColorOptions.forEach((option) => {
			if (!(option.dataset.theme === design)) option.hidden = true;
			else option.hidden = false;
		});
		toggleShirtColorSelect(false);
	}

	function toggleOtherJobInput(displayVal) {
		otherJobRoleField.style.display = displayVal;
	}

	function toggleShirtColorSelect(isDisabled) {
		shirtColorSelect.selectedIndex = 0;
		shirtColorSelect.disabled = isDisabled;
	}

	// Need to figure out how to disable based on selected activities
	// function updateAvailableActivities(selectedActivity) {
	// 	const activities = activitiesDiv.querySelectorAll('input[type="checkbox"]');
	// 	const selectedActivities = [];
	// 	const notSelectedActivities = [];
	// 	activities.forEach((activity) => {
	// 		if (activity.checked) selectedActivities.push(activity);
	// 		else notSelectedActivities.push(activity);
	// 	});
	// 	selectedActivities.map((selectedActivity) => {
	// 		const activityDate = selectedActivity.getAttribute('data-day-and-time');
	// 		notSelectedActivities.map((activity) => {
	// 			if (activityDate === activity.getAttribute('data-day-and-time')) {
	// 				activity.disabled = true;
	// 			} else {
	// 				activity.disabled = false;
	// 			}
	// 		});
	// 	});
	// }

	function updateTotalCost(activity) {
		const activityCost = parseInt(activity.dataset.cost);
		let currentTotal = parseInt(activitiesCost.textContent.replace(/^\D+/, ''));
		if (activity.checked) currentTotal += activityCost;
		else currentTotal -= activityCost;
		activitiesCost.textContent = `Total: $${currentTotal}`;
	}

	function togglePaymentDisplay(paymentType) {
		const paymentTypeDivs = document.querySelectorAll(
			'.payment-methods > div[id]'
		);
		paymentTypeDivs.forEach((paymentDiv) => {
			if (paymentDiv.id === paymentType) paymentDiv.style.display = '';
			else paymentDiv.style.display = 'none';
		});
	}

	// Validation functions
	function isValidName() {
		const name = nameField.value;
		return /\S+/.test(name);
	}

	function isValidEmail() {
		const email = document.querySelector('#email').value;
		return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
	}

	function isValidActivities() {
		const selectedActivities = [];
		activities.forEach((activity) => {
			if (activity.checked) selectedActivities.push(activity);
		});
		return selectedActivities.length > 0;
	}

	function isValidCreditCard() {
		if (paymentSelect.value === 'credit-card') {
			const cardDetails = document.querySelector(
				'.payment-methods .credit-card'
			);
			const cardNumber = cardDetails.querySelector('#cc-num').value;
			const cardZip = cardDetails.querySelector('#zip').value;
			const cardCVV = cardDetails.querySelector('#cvv').value;
			return (
				isValidCardNumber(cardNumber) &&
				isValidZip(cardZip) &&
				isValidCVV(cardCVV)
			);
		}

		return true;
	}

	function isValidCardNumber(number) {
		return /^\d{13,16}$/.test(number);
	}

	function isValidZip(zipCode) {
		return /^\d{5}$/.test(zipCode);
	}

	function isValidCVV(cvv) {
		return /^\d{3}$/.test(cvv);
	}

	// Callback functions
	function handleJobSelectChange(evt) {
		const { value } = evt.target;
		if (value === 'other') toggleOtherJobInput('');
		else toggleOtherJobInput('none');
	}

	function handleDesignSelectChange(evt) {
		const { value } = evt.target;
		updateShirtColorOptions(value);
	}

	function handleActivityChange(evt) {
		const { target } = evt;
		// updateAvailableActivities(target);
		updateTotalCost(target);
	}

	function handlePaymentChange(evt) {
		const { value } = evt.target;
		togglePaymentDisplay(value);
	}

	function handleFormSubmit(evt) {
		if (
			!(
				isValidName() &&
				isValidEmail() &&
				isValidActivities() &&
				isValidCreditCard()
			)
		) {
			evt.preventDefault();
		}
	}

	// Event listeners
	jobRoleSelect.addEventListener('change', handleJobSelectChange);
	shirtDesignSelect.addEventListener('change', handleDesignSelectChange);
	activitiesDiv.addEventListener('change', handleActivityChange);
	paymentSelect.addEventListener('change', handlePaymentChange);
	form.addEventListener('submit', handleFormSubmit);
	activities.forEach((activity) => {
		activity.addEventListener('focus', () =>
			activity.parentNode.classList.add('focus')
		);
		activity.addEventListener('blur', () =>
			activity.parentNode.classList.remove('focus')
		);
	});
});
