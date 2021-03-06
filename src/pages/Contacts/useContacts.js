import { useState, useEffect } from 'react';

export const useContacts = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setisError] = useState(false);

	useEffect(() => {
		const getContacts = async () => {
			setIsLoading(true);
			try {
				const response = await fetch('https://randomuser.me/api/?results=10');
				const { results, error } = await response.json();

				if (error) {
					throw new Error(error);
				}

				setData(results);
				setisError(false);
			} catch (e) {
				setisError(true);
			} finally {
				setIsLoading(false);
			}
		};
		getContacts();
	}, []);

	return {
		data,
		isLoading,
		isError,
	};
};
