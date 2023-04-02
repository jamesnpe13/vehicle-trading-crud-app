exports.useFetch = async (url, method) => {
	const response = await fetch(url, { method: method });
	const data = await response.json();
	return data;
};
