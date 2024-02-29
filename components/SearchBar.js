import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchResult from "./SearchResult";

export default function SearchBar() {
	const [input, setInput] = useState("");
	const [result, setResult] = useState(undefined);
	async function fetchData(value) {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_HOST}/api/searchProduct`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ value }),
			},
		);
		const data = await response.json();
		setResult(data);
	}
	function handleChange(value) {
		setInput(value);
		fetchData(value);
	}
	return (
		<div className="relative">
			<div className="flex w-full">
				<input
					value={input}
					onChange={(e) => {
						handleChange(e.target.value);
					}}
					id="search"
					placeholder="search for products..."
					className="border-2 border-red-600 rounded-l-md text-lg focus:outline-none p-1 md:w-96 w-80"
				/>
				<button className="bg-red-600 py-1 px-2 rounded-r-md focus:outline-none focus:ring focus:ring-red-300">
					<FaMagnifyingGlass />
				</button>
			</div>
			<SearchResult result={result} />
		</div>
	);
}
