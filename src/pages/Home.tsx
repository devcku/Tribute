import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { addDoc, onSnapshot } from "firebase/firestore";
import { tributesQuery, tributesRef } from "../contexts/DB";
import {
	PaperAirplaneIcon,
	PauseIcon,
	PlayIcon,
} from "@heroicons/react/20/solid";
import { images, song } from "../assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

type tribute = { value: string; name: string; createdAt: Date };
const Home = () => {
	const [tributes, setTributes] = useState<tribute[]>([]);

	const [nameOpen, setNameOpen] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [value, setValue] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [playing, setPlaying] = useState(false);

	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [music, _] = useState(new Audio(song));
	music.loop = true;

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

		// Set the date we're counting down to
		const countDownDate = new Date("June 8, 2024 00:00:00").getTime();

		// Update the count down every 1 second
		const x = setInterval(() => {
			// Get today's date and time
			const now = new Date().getTime();

			// Find the distance between now and the count down date
			const distance = countDownDate - now;

			// If the count down is finished, write some text
			if (distance > 0) {
				// Time calculations for days, hours, minutes and seconds
				setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
				setHours(
					Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				);
				setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
				setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
			} else {
				clearInterval(x);
				setDays(0);
				setHours(0);
				setMinutes(0);
				setSeconds(0);
			}
		}, 1000);
	}, []);
	return (
		<main>
			<button
				onClick={() => {
					setPlaying(!playing);

					!playing ? music.play() : music.pause();
				}}
				className="fixed top-4 right-4 h-max w-max z-50 text- text-purple-600"
			>
				{playing ? <PauseIcon className="h-6" /> : <PlayIcon className="h-6" />}
			</button>
			<motion.div
				initial={{ display: "none" }}
				animate={{ display: nameOpen ? "flex" : "none" }}
				transition={{ delay: nameOpen ? 0 : 0.3 }}
				className="fixed top-0 left-0 h-full w-full flex justify-center md:items-center z-50"
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: nameOpen ? 1 : 0 }}
					transition={{ duration: 0.3 }}
					className="absolute h-full w-full backdrop-blur-sm bg-black/30"
				></motion.div>
				<motion.div
					initial={{ opacity: 0, y: 0 }}
					animate={{ opacity: nameOpen ? 1 : 0, y: nameOpen ? 0 : "20px" }}
					transition={{ duration: 0.3 }}
					className="bg-zinc-900/50 md:shadow-lg border-t md:border-t-0 border-t-purple-900/60 backdrop-blur-lg z-10 flex flex-col px-4 md:py-2 py-4 md:rounded-md max-w-xl w-full h-1/2 md:h-auto md:mt-0 mt-auto"
				>
					<h3 className="md:text-3xl text-xl mb-1">Enter your full name</h3>
					<p className="md:mb-10  text-purple-800">
						This would be the name displayed alongside your tribute messages
					</p>
					<div className="h-full md:hidden"></div>
					<input
						placeholder="Mr/Mrs/Master/Sir"
						className="px-4 py-2 mb-4 bg-zinc-800 rounded w-full outline-none"
						type="text"
						autoFocus
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<div className="md:flex grid grid-cols-2 gap-4">
						<button
							onClick={() => {
								setNameOpen(false);
							}}
							className="md:w-1/3 py-2 bg-purple-900 "
						>
							Save
						</button>
						<button
							onClick={() => {
								setNameOpen(false);
								setName("");
							}}
							className="md:w-1/3 py-2 bg-zinc-800"
						>
							Cancel
						</button>
					</div>
				</motion.div>
			</motion.div>
			<section>
				<div className="absolute h-full w-full z-0">
					<Swiper
						loop
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						modules={[Autoplay, EffectFade]}
						effect={"fade"}
						className="h-full w-full"
					>
						{images.map((image) => (
							<SwiperSlide key={image}>
								<motion.img
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
									src={image}
									className="h-full bg-purple-900/30 w-full object-cover object-center"
									alt=""
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className="h-screen w-screen bg-purple-900/30 z-10 relative flex justify-center items-center">
					<motion.div
						initial={{ y: 0 }}
						animate={{ y: "10vh" }}
						transition={{ duration: 3 }}
					>
						<h1>In loving memory</h1>
					</motion.div>
				</div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="absolute top-0 left-0 h-screen w-screen z-20 bg-gradient-to-b from-transparent to-black"
				></motion.div>
			</section>
			<section className="max-w-5xl p-4 md:p-0 mx-auto -mt-36 z-30 relative">
				<h4 className="text-sm font-semibold text-purple-300">
					8th June, 2024
				</h4>
				<h3 className="md:text-xl font-semibold text-purple-600">
					Burial Ceremony
				</h3>
				<p className="text-xs md:text-base">
					In {days} Days, {hours} Hours, {minutes} Minutes, {seconds} Seconds
				</p>
				<hr className="my-10 border-purple-900/30" />
				<motion.h2
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="text-xl mx-auto font-semibold"
				>
					Tributes & Prayers
				</motion.h2>

				<ul className="mt-6 flex flex-col gap-4 pb-20">
					{tributes.map(({ value, name }, i) => (
						<motion.li
							key={i}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1, delay: 0.5 + 0.1 * i }}
							className="bg-zinc-900 py-4 px-6 rounded"
						>
							<h4 className="text-sm capitalize text-purple-600 mb-2 font-semibold">
								{name}
							</h4>
							<pre className=" whitespace-pre-wrap">{value}</pre>
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
				className="fixed w-full left-0 bottom-0 z-40"
			>
				<div className="max-w-5xl mx-auto border-t border-purple-900/60 bg-black  pt-1 px-2 md:px-0 flex items-center">
					<textarea
						disabled={loading}
						readOnly={!name}
						placeholder={`Write a tribute${name ? " as " + name : ""}...`}
						className="resize-none outline-none w-full p-2 pb-0 bg-black rounded"
						onChange={(e) => setValue(e.target.value)}
						value={value}
						onClick={() => {
							!name && setNameOpen(true);
						}}
					></textarea>
					<button
						onClick={() => {
							if (value) {
								setLoading(true);
								addDoc(tributesRef, { value, name, createdAt: new Date() })
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
