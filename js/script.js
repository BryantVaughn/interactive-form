// Wait for DOM content to be loaded in browser
window.addEventListener('DOMContentLoaded', () => {
	// Gather DOM elements
	const form = document.querySelector('form');
	const nameField = document.querySelector('#name');
	const emailField = document.querySelector('#email');
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

	/***
	 * `updateShirtColorOptions` function
	 * Updates the options in the shirt color select based on the design selected.
	 */
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

	/***
	 * `toggleOtherJobInput` function
	 * Displays or hides the 'Other job role?' text input based on the Job Role select.
	 */
	function toggleOtherJobInput(displayVal) {
		otherJobRoleField.style.display = displayVal;
	}

	/***
	 * `toggleShirtColorSelect` function
	 * Resets shirt color select whenever there is a design option change.
	 */
	function toggleShirtColorSelect(isDisabled) {
		shirtColorSelect.selectedIndex = 0;
		shirtColorSelect.disabled = isDisabled;
	}

	/***
	 * `updateAvailableActivities` function
	 * Receives a changed activity as input and then disables/enables other
	 * activities with a conflicting day and time.
	 */
	function updateAvailableActivities(changedActivity) {
		const activities = activitiesDiv.querySelectorAll('input[type="checkbox"]');
		const changedDate = changedActivity.getAttribute('data-day-and-time');
		activities.forEach((activity) => {
			const activityDate = activity.getAttribute('data-day-and-time');
			if (activityDate === changedDate && activity !== changedActivity) {
				if (changedActivity.checked) {
					activity.disabled = true;
					activity.parentNode.classList.add('disabled');
				} else {
					activity.disabled = false;
					activity.parentNode.classList.remove('disabled');
				}
			}
		});
	}

	/***
	 * `updateTotalCost` function
	 * Updates the total cost display of the checked activities.
	 */
	function updateTotalCost(activity) {
		const activityCost = parseInt(activity.dataset.cost);
		let currentTotal = parseInt(activitiesCost.textContent.replace(/^\D+/, ''));
		if (activity.checked) currentTotal += activityCost;
		else currentTotal -= activityCost;
		activitiesCost.textContent = `Total: $${currentTotal}`;
	}

	/***
	 * `togglePaymentDisplay` function
	 * Displays the correct payment information based on the payment select option.
	 */
	function togglePaymentDisplay(paymentType) {
		const paymentTypeDivs = document.querySelectorAll(
			'.payment-methods > div[id]'
		);
		paymentTypeDivs.forEach((paymentDiv) => {
			if (paymentDiv.id === paymentType) paymentDiv.style.display = '';
			else paymentDiv.style.display = 'none';
		});
	}

	/***
	 * `toggleValidInputField` function
	 * Applies the correct classes and display for required input fields based on
	 * if they're valid or not.
	 */
	function toggleValidInputField(inputField, isValid) {
		const parentNode = inputField.parentNode;
		if (isValid) {
			parentNode.classList.remove('not-valid');
			parentNode.classList.add('valid');
			parentNode.querySelector('.hint').style.display = 'none';
		} else {
			parentNode.classList.add('not-valid');
			parentNode.classList.remove('valid');
			parentNode.querySelector('.hint').style.display = '';
		}
	}

	// Validation functions

	/***
	 * `isValidName` function
	 * Checks that name field contains a valid value on submission.
	 */
	function isValidName() {
		const name = nameField.value;
		return /\S+/.test(name);
	}

	/***
	 * `isValidEmail` function
	 * Checks that email field contains a valid email value on submission.
	 */
	function isValidEmail() {
		const email = emailField.value;
		return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
	}

	/***
	 * `isValidActivities` function
	 * Checks that at least one activity is checked on submission.
	 */
	function isValidActivities() {
		const selectedActivities = [];
		activities.forEach((activity) => {
			if (activity.checked) selectedActivities.push(activity);
		});
		return selectedActivities.length > 0;
	}

	/***
	 * `isValidCreditCard` function
	 * If payment option is credit card, it checks to make sure the card
	 * number, zip code, and cvv inputs are correct. If payment is not
	 * credit card it returns the value of true to skip validation.
	 */
	function isValidCreditCard() {
		if (paymentSelect.value === 'credit-card') {
			return isValidCardNumber() && isValidZip() && isValidCVV();
		}

		return true;
	}

	/***
	 * `isValidCardNumber` function
	 * Checks that credit card number is between 13 and 16 digits only.
	 */
	function isValidCardNumber() {
		const cardNumber = document.querySelector('#cc-num').value;
		return /^\d{13,16}$/.test(cardNumber);
	}

	/***
	 * `isValidZip` function
	 * Checks that the zip code value is 5 digits only.
	 */
	function isValidZip() {
		const cardZip = document.querySelector('#zip').value;
		return /^\d{5}$/.test(cardZip);
	}

	/***
	 * `isValidCVV` function
	 * Checks that the cvv value is 3 digits only.
	 */
	function isValidCVV() {
		const cardCVV = document.querySelector('#cvv').value;
		return /^\d{3}$/.test(cardCVV);
	}

	// Callback functions

	/***
	 * `handleJobSelectChange` function
	 * Runs when the job select is changed to toggle the display of
	 * other job input if needed.
	 */
	function handleJobSelectChange(evt) {
		const { value } = evt.target;
		if (value === 'other') toggleOtherJobInput('');
		else toggleOtherJobInput('none');
	}

	/***
	 * `handleDesignSelectChange` function
	 * Runs when design select is changed to update the shirt color options.
	 */
	function handleDesignSelectChange(evt) {
		const { value } = evt.target;
		updateShirtColorOptions(value);
	}

	/***
	 * `handleActivityChange` function
	 * Runs when an activity is checked or unchecked to update total cost and
	 * disable activities that conflict with the times selected.
	 */
	function handleActivityChange(evt) {
		const { target } = evt;
		updateAvailableActivities(target);
		updateTotalCost(target);
	}

	/***
	 * `handlePaymentChange` function
	 * Runs when the payment select is changed to update the displayed payment info.
	 */
	function handlePaymentChange(evt) {
		const { value } = evt.target;
		togglePaymentDisplay(value);
	}

	/***
	 * `handleFormSubmit` function
	 * Runs when form is submitted. Checks that required fields have valid input
	 * and updates the display accordingly. If not all required fields are valid,
	 * submission is stopped and hints are provided to user.
	 */
	function handleFormSubmit(evt) {
		const validName = isValidName();
		const validEmail = isValidEmail();
		const validActivities = isValidActivities();
		const validCreditCard = isValidCreditCard();
		if (!(validName && validEmail && validActivities && validCreditCard)) {
			evt.preventDefault();
			toggleValidInputField(nameField, validName);
			toggleValidInputField(emailField, validEmail);
			toggleValidInputField(activitiesDiv, validActivities);
			if (paymentSelect.value === 'credit-card') {
				const ccNum = document.querySelector('#cc-num');
				const zipCode = document.querySelector('#zip');
				const cvv = document.querySelector('#cvv');

				toggleValidInputField(ccNum, isValidCardNumber());
				toggleValidInputField(zipCode, isValidZip());
				toggleValidInputField(cvv, isValidCVV());
			}
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

	// Real-time error messaging event listeners
	nameField.addEventListener('keyup', () => {
		if (nameField.value.length > 0) {
			toggleValidInputField(nameField, isValidName());
		}
	});
	emailField.addEventListener('keyup', () => {
		if (emailField.value.length > 0) {
			toggleValidInputField(emailField, isValidEmail());
		}
	});
});
