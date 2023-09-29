// Check string integer
const isStringInt = (str: string) => {
	if (typeof str !== 'string') return false;
	return !Number.isNaN(parseInt(str, 10));
};

// Checks numeric string
const isNumeric = (str: string) => {
	if (typeof str !== 'string') return false;
	return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
};

export { isNumeric, isStringInt };
