// import { useState, useEffect } from "react";

// // export function useFetch(url, method) {
// // 	const [data, setData] = useState(null);
// // 	const [error, setError] = useState(null);
// // 	const [loading, setLoading] = useState(false);

// // 	useEffect(() => {
// // 		(async function () {
// // 			try {
// // 				setLoading(true);
// // 				const response = await fetch(url, { method: method });
// // 				const data = await response.json();
// // 				setData(data);
// // 			} catch (err) {
// // 				setError(err);
// // 			} finally {
// // 				setLoading(false);
// // 			}
// // 		})();
// // 	}, [url]);

// // 	return { data, error, loading };
// // }
// const useFetch = async (URL, method, body) => {
// 	const response = await fetch(URL, { method: method, body: body });
// 	const data = await response.json();
// 	console.log(data)
// 	return data;
// };

// export { fetchData };
