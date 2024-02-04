const outputTypeOptions = document.querySelector('.options'); 
const outputTypeParameters = document.querySelector('.parameters'); 
const outputTypeArray = document.querySelector('.array'); 
const inputTypeValues = document.querySelector('.inputTypeValues'); 
const inputTypeNames = document.querySelector('.inputTypeNames'); 
const inputTypeNamesAndTypes = document.querySelector('.inputTypeNamesAndTypes'); 
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

// from a list of values create array with {value, label} objects (options for Select dropdown list)
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

// from a list of values create array of parameter objects
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

// Custom typeMap
const typeMap = {
        "String": "text",
        "Datetime": "date",
		"Date":"string",
		"Int":"number",
		"Decimal":"number",
		"Short":"number",
		"Byte":"number",
		"string": "text",
        "datetime": "date",
		"date":"string",
		"int":"number",
		"decimal":"number",
		"short":"number",
		"byte":"number"
    };

// from a list of name,type create array with {name, label, type} objects for mappable parameters/interface
function parseParametersFromValuesAndTypes(input, order) {
	const output = input.split('\n')
		.map(element => ({
			"name": element.split(',')[0],
			"label": nameToLabel(element.split(',')[0]),
			"type": typeMap[element.split(',')[1]] || element.split(',')[1],
		}));
	return JSON.stringify(output, null, 2);
};

// from a list of value,name or name,value create array with {value, label} objects
function parseArrayFromValues(input, separator) {
	const separatedBy = separator.checked ? ',' : '\n'
	const output = input.split(separatedBy)
	return JSON.stringify(output)
};

// calls the function and displays the results after 'submit' button is clicked
btnSubmit.addEventListener('click', function (e) {
	e.preventDefault();
	if (!inputOptions.value) alert('Insert values');
	if (outputTypeOptions.checked) {
		if (inputTypeValues.checked) resultContent.textContent = parseOptionsFromValues(inputOptions.value, separatorComma);
		if (!inputTypeValues.checked) resultContent.textContent = parseOptionsFromValuesAndNames(inputOptions.value, valueFirst);
	};
	if (outputTypeParameters.checked) {
		if (inputTypeValues.checked) resultContent.textContent = parseParametersFromValues(inputOptions.value, separatorComma);
		if (inputTypeNames.checked) resultContent.textContent = parseParametersFromValuesAndNames(inputOptions.value, valueFirst);
		if (inputTypeNamesAndTypes.checked) resultContent.textContent = parseParametersFromValuesAndTypes(inputOptions.value, valueFirst);
	};
	if (outputTypeArray.checked) {
		if (inputTypeValues.checked) resultContent.textContent = parseArrayFromValues(inputOptions.value, separatorComma);
	}
});