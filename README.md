# Interactive Web Form

This is an interactive web form using JS to manipulate the DOM based on user selection and input. It validates required fields and prevents submission of the form if any validation fails. When there are errors in validation, the form highlights the failed input in red and displays a caution logo to help show where the issues are.

## Extras

### Real-Time Validation

I included real-time validation for the name and email fields to check whenever a user types into the field. The validation waits to run until there's at least one character in the field, then will update real-time if all validation is met for that input.

### Conditional Error Messaging

I included a conditional error message for the email input. When the input is blank, it tells the user that the email field cannot be blank, and when it's an invalid email format, it updates to warn the user it needs to be formatted correctly.