const outputType = document.querySelector('.options'); // only 2 radio buttons, one of them is always 'checked'
const inputTypeValues = document.querySelector('.inputTypeValues'); // only 2 radio buttons, one of them is always 'checked'
const separatorComma = document.querySelector('.separatorComma'); // only 2 radio buttons, one of them is always 'checked'
const valueFirst = document.querySelector('.valueFirst') // only 2 radio buttons, one of them is always 'checked'
const inputOptions = document.querySelector('.inputOptions');
const btnSubmit = document.querySelector('.btnSubmit');
const resultContent = document.querySelector('.resultContent');

// convert strings with _ or camelCase to proper labels
function nameToLabel(str) {
	if (typeof str !== "string") return str;

	const abbreviations = ["Id", "Url","Html"];
	const name = str.replaceAll('_', ' ')
	const nameArr = name.split(/(?<=[a-z\d])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(?<=[a-z])(?=[\d])|\s/);

	return nameArr.map(word => {
		let capWord = word.replace(word.charAt(0), word.charAt(0).toUpperCase()); // Capitalize the first character
		if (abbreviations.includes(capWord)) return capWord.toUpperCase(); // abbreviation all upper case
		return capWord;
	}).join(' ');
};

// from a list of values create array with {value, label} objects
function parseOptionsFromValues(input, separator) {
	const separatedBy = separator.checked ? ',' : '\n'
	const output = input.split(separatedBy)
		.map(element => ({
			"value": element,
			"label": nameToLabel(element)
		}));
	return JSON.stringify(output, null, 2)
};

// from a list of value,name or name,value create array with {value, label} objects
function parseOptionsFromValuesAndNames(input, order) {
	const valueOrder = order.checked ? 0 : 1;
	const nameOrder = !order.checked ? 0 : 1;
	const output = input.split('\n')
		.map(element => ({
			"value": element.split(',')[valueOrder],
			"label": element.split(',')[nameOrder]
		}));
	return JSON.stringify(output, null, 2);
};

// from a list of values create array of patrameter objects
function parseParametersFromValues(input, separator) {
	const separatedBy = separator.checked ? ',' : '\n'
	const output = input.split(separatedBy)
		.map(element => ({
			"name": element,
			"label": nameToLabel(element),
			"type": "text"
		}));
	return JSON.stringify(output, null, 2)
};

// from a list of value,name or name,value create array with {value, label} objects
function parseParametersFromValuesAndNames(input, order) {
	const valueOrder = order.checked ? 0 : 1;
	const nameOrder = !order.checked ? 0 : 1;
	const output = input.split('\n')
		.map(element => ({
			"name": element.split(',')[valueOrder],
			"label": element.split(',')[nameOrder],
			"type": "text"
		}));
	return JSON.stringify(output, null, 2);
};

// calls the function and displays the results after 'submit' button is clicked
btnSubmit.addEventListener('click', function (e) {
	e.preventDefault();
	if (!inputOptions.value) alert('Insert values');
	if (outputType.checked) {
		if (inputTypeValues.checked) resultContent.textContent = parseOptionsFromValues(inputOptions.value, separatorComma);
		if (!inputTypeValues.checked) resultContent.textContent = parseOptionsFromValuesAndNames(inputOptions.value, valueFirst);
	}
	if (!outputType.checked) {
		console.log(outputType)
		if (inputTypeValues.checked) resultContent.textContent = parseParametersFromValues(inputOptions.value, separatorComma);
		if (!inputTypeValues.checked) resultContent.textContent = parseParametersFromValuesAndNames(inputOptions.value, valueFirst);
	}
});