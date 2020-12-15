// Wait for DOM content to be loaded in browser
window.addEventListener('DOMContentLoaded', () => {
	// Gather DOM elements
	const nameField = document.querySelector('#name');
	const jobRoleSelect = document.querySelector('#title');
	const otherJobRoleField = document.querySelector('#other-job-role');
	const shirtDesignSelect = document.querySelector('#design');
	const shirtColorSelect = document.querySelector('#color');
	const activitiesDiv = document.querySelector('.activities-box');
	const activitiesCost = document.querySelector('.activities-cost');

	// Apply focus to name field
	nameField.focus();

	// Hide other job role input field
	toggleOtherJobInput('none');

	// Disable shirt color select element
	toggleShirtColorSelect(true);

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

	function updateAvailableActivities(selectedActivity) {
		const activities = activitiesDiv.querySelectorAll('input[type="checkbox"]');
		const date = selectedActivity.getAttribute('data-day-and-time');
		activities.forEach((activity) => {
			const activityDate = activity.getAttribute('data-day-and-time');
			if (date === activityDate) activity.disabled = true;
			else activity.disabled = false;
		});
	}

	function updateTotalCost(activity) {
		const activityCost = parseInt(activity.dataset.cost);
		let currentTotal = parseInt(activitiesCost.textContent.replace(/^\D+/, ''));
		if (activity.checked) currentTotal += activityCost;
		else currentTotal -= activityCost;
		activitiesCost.textContent = `Total: $${currentTotal}`;
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
		console.log(target);
		updateAvailableActivities(target);
		updateTotalCost(target);
	}

	// Event listeners
	jobRoleSelect.addEventListener('change', handleJobSelectChange);
	shirtDesignSelect.addEventListener('change', handleDesignSelectChange);
	activitiesDiv.addEventListener('change', handleActivityChange);
});
