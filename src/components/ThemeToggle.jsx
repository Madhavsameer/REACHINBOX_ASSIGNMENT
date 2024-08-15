import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function ThemeToggle() {
	const [darkMode, setDarkMode] = useState(() => {
		return localStorage.getItem("theme") === "dark";
	});

	useEffect(() => {
		const root = window.document.documentElement;
		if (darkMode) {
			root.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			root.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [darkMode]);

	return (
		<button
			className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded-md flex items-center"
			onClick={() => setDarkMode(!darkMode)}
		>
			{darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
			<span>Toggle Theme</span>
		</button>
	);
}

export default ThemeToggle;
