import Link from "next/link";

export default function SearchResult({ result }) {
	return (
		<div>
			<div className=" absolute top-12 h-auto max-h-80 w-full rounded-md overflow-y-scroll bg-gray-200 shadow-2xl">
				{result &&
					result.map((item) => (
						<div
							className="m-2 bg-slate-50 rounded-md p-1"
							key={item._id}
						>
							<Link href={`/product/${item.slug}`}>
								<p className="text-xs text-gray-500">
									{item.brand}
								</p>
								<p className="text-base">{item.description}</p>
							</Link>
						</div>
					))}
			</div>
		</div>
	);
}
