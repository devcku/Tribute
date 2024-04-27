import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { addDoc, onSnapshot } from "firebase/firestore";
import { tributesQuery, tributesRef } from "../contexts/DB";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";

type tribute = { value: string, createdAt: Date };
const Home = () => {
	const [tributes, setTributes] = useState<tribute[]>([]);
	const [value, setValue] = useState<string>("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		onSnapshot(tributesQuery, (snapshot) => {
			if (!snapshot.empty) {
				const localTributes: tribute[] = [];
				snapshot.docs.forEach((doc) =>
					localTributes.push(doc.data() as tribute)
				);
				setTributes([...localTributes]);
				setTimeout(() => {
					document
						.getElementById("bottom")
						?.scrollIntoView({ behavior: "smooth" });
				}, 500);
			}
		});
	}, []);
	return (
		<main>
			<section>
				<div className="h-screen w-screen bg-purple-900 flex justify-center items-center">
					<h1>In loving memory</h1>
				</div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="absolute top-0 left-0 h-screen w-screen bg-gradient-to-b from-transparent to-black"
				></motion.div>
			</section>
			<section className="max-w-5xl p-4 md:p-0 mx-auto -mt-36 z-10 relative pb-20">
				<motion.h2
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="text-xl mx-auto text-purple-400 font-semibold"
				>
					Tributes & Prayers
				</motion.h2>

				<ul className="mt-6 flex flex-col gap-4">
					{tributes.map(({ value }, i) => (
						<motion.li
						key={i}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1, delay: 0.5 + 0.1 * i }}
							className="bg-zinc-900 py-4 px-6 rounded"
						>
							<pre>{value}</pre>
						</motion.li>
					))}

					{tributes.length == 0 && (
						<motion.li
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1, delay: 0.8 }}
							className=""
						>
							No Tributes yet
						</motion.li>
					)}
					<li id="bottom"></li>
				</ul>
			</section>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 1 }}
				className="fixed w-full left-0 bottom-0 z-20"
			>
				<div className="max-w-5xl mx-auto border-t border-purple-900/30 pt-1 px-2 md:px-0 flex items-center">
					<textarea
						autoFocus
						disabled={loading}
						placeholder="Write a tribute..."
						className="resize-none outline-none w-full p-2 pb-0 bg-black rounded"
						onChange={(e) => setValue(e.target.value)}
						value={value}
					></textarea>
					<button
						onClick={() => {
							if (value) {
								setLoading(true);
								addDoc(tributesRef, { value, createdAt: new Date() })
									.then(() => {
										setLoading(false);
										setValue("");
									})
									.catch(() => {
										setLoading(false);
									});
							}
						}}
						className="p-2"
					>
						<PaperAirplaneIcon className="h-6" />
					</button>
				</div>
			</motion.div>
		</main>
	);
};

export default Home;
