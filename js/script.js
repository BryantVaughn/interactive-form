// Wait for DOM content to be loaded in browser
window.addEventListener('DOMContentLoaded', () => {
	// Gather DOM elements
	const nameField = document.querySelector('#name');
	const jobRoleSelect = document.querySelector('#title');
	const otherJobRoleField = document.querySelector('#other-job-role');
	const shirtDesignSelect = document.querySelector('#design');
	const shirtColorSelect = document.querySelector('#color');

	// Apply focus to name field
	nameField.focus();

	// Hide other job role input field
	toggleOtherJobInput('none');

	// Disable shirt color select element
	toggleShirtColorSelect(true);

	// Helper functions
	function handleJobSelectChange(evt) {
		const { value } = evt.target;
		if (value === 'other') toggleOtherJobInput('');
		else toggleOtherJobInput('none');
	}

	function handleDesignSelectChange(evt) {
		const { value } = evt.target;
		updateShirtColorOptions(value);
	}

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

	// Event listeners
	jobRoleSelect.addEventListener('change', handleJobSelectChange);

	shirtDesignSelect.addEventListener('change', handleDesignSelectChange);
});
