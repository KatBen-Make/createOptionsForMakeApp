
const separatorComma = document.querySelector('.separatorComma'); // only 2 radio buttons, one of them is always 'checked'
const inputOptions = document.querySelector('.inputOptions');
const btnSubmit = document.querySelector('.btnSubmit');
const resultContent = document.querySelector('.resultContent');

// to convert strings with _ or camelCase to proper labels
function nameToLabel(str) {
	if (typeof str !== "string") return str;
	const name = str.replaceAll('_', ' ')
	const nameArr = name.split(/(?<=[a-z\d])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(?<=[a-z])(?=[\d])|\s/);

	return nameArr.map(word => {
		return word.replace(word.charAt(0), word.charAt(0).toUpperCase()); // Capitalize the first character
	}).join(' ');
};

// to create array with {value, label} objects
function parseOptions(input, separator) {
	const separatedBy = separator.checked ? ',' : '\n'
	const output = input.split(separatedBy)
		.map(element => ({
			"value": element,
			"label": nameToLabel(element)
		}));
	return JSON.stringify(output, null, 2)
};

// calls the function and displays the results after 'submit' button is clicked
btnSubmit.addEventListener('click', function (e) {
	e.preventDefault();
	if (!inputOptions.value) alert('Insert options');
	if (inputOptions.value) {
		resultContent.textContent = parseOptions(inputOptions.value, separatorComma);
		console.log(resultContent.textContent);
	}
});