import {
	ChevronRightIcon,
	PaperAirplaneIcon,
	PauseIcon,
	PlayIcon,
} from "@heroicons/react/20/solid";
import { addDoc, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { images, song } from "../assets";
import { tributesQuery, tributesRef } from "../contexts/DB";

type tribute = { value: string; name: string; createdAt: Date };
const Home = () => {
	const [tributes, setTributes] = useState<tribute[]>([]);

	const [nameOpen, setNameOpen] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [value, setValue] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [playing, setPlaying] = useState(false);

	const [days1, setDays1] = useState(0);
	const [hours1, setHours1] = useState(0);
	const [minutes1, setMinutes1] = useState(0);
	const [seconds1, setSeconds1] = useState(0);
	const [days2, setDays2] = useState(0);
	const [hours2, setHours2] = useState(0);
	const [minutes2, setMinutes2] = useState(0);
	const [seconds2, setSeconds2] = useState(0);
	const [days3, setDays3] = useState(0);
	const [hours3, setHours3] = useState(0);
	const [minutes3, setMinutes3] = useState(0);
	const [seconds3, setSeconds3] = useState(0);
	const [days4, setDays4] = useState(0);
	const [hours4, setHours4] = useState(0);
	const [minutes4, setMinutes4] = useState(0);
	const [seconds4, setSeconds4] = useState(0);
	const [days5, setDays5] = useState(0);
	const [hours5, setHours5] = useState(0);
	const [minutes5, setMinutes5] = useState(0);
	const [seconds5, setSeconds5] = useState(0);

	const [swipe, setSwipe] = useState<null | SwiperType>(null);

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
			}
		});

		// Set the date we're counting down to
		const countDownDate1 = new Date("June 2, 2024 00:00:00").getTime();
		const countDownDate2 = new Date("June 5, 2024 00:00:00").getTime();
		const countDownDate3 = new Date("June 7, 2024 00:00:00").getTime();
		const countDownDate4 = new Date("June 8, 2024 00:00:00").getTime();
		const countDownDate5 = new Date("June 9, 2024 00:00:00").getTime();

		// Update the count down every 1 second
		const createInterval = (
			countDownDate: number,
			setDays: Dispatch<SetStateAction<number>>,
			setHours: Dispatch<SetStateAction<number>>,
			setMinutes: Dispatch<SetStateAction<number>>,
			setSeconds: Dispatch<SetStateAction<number>>
		) => {
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
		};
		createInterval(
			countDownDate1,
			setDays1,
			setHours1,
			setMinutes1,
			setSeconds1
		);
		createInterval(
			countDownDate2,
			setDays2,
			setHours2,
			setMinutes2,
			setSeconds2
		);
		createInterval(
			countDownDate3,
			setDays3,
			setHours3,
			setMinutes3,
			setSeconds3
		);
		createInterval(
			countDownDate4,
			setDays4,
			setHours4,
			setMinutes4,
			setSeconds4
		);
		createInterval(
			countDownDate5,
			setDays5,
			setHours5,
			setMinutes5,
			setSeconds5
		);
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
				<div className="relative">
					<Swiper
						loop
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
						speed={1000}
						modules={[Autoplay]}
						onSwiper={(swiper) => setSwipe(swiper)}
						spaceBetween={16}
					>
						<SwiperSlide>
							<h4 className="text-sm font-semibold text-purple-300">
								2nd June, 2024
							</h4>
							<h3 className="md:text-xl font-semibold text-purple-600">
								Service of Songs
							</h3>
							<p className="text-xs md:text-base">
								At Our Saviour's Anglican Church, off One Rd, Via Agbani Rd,
								Enugu. <br /> In {days1} Days, {hours1} Hours, {minutes1}{" "}
								Minutes, {seconds1} Seconds
							</p>
						</SwiperSlide>
						<SwiperSlide>
							<h4 className="text-sm font-semibold text-purple-300">
								5th June, 2024
							</h4>
							<h3 className="md:text-xl font-semibold text-purple-600">
								Commendation Service
							</h3>
							<p className="text-xs md:text-base">
								At Christ Church, Uwani - 11am.
								<br />
								In {days2} Days, {hours2} Hours, {minutes2} Minutes, {seconds2}{" "}
								Seconds
							</p>
						</SwiperSlide>
						<SwiperSlide>
							<h4 className="text-sm font-semibold text-purple-300">
								7th June, 2024
							</h4>
							<h3 className="md:text-xl font-semibold text-purple-600">
								Crusade / Service of Songs
							</h3>
							<p className="text-xs md:text-base">
								At Isiafor Primary School Compound, St Paul's Church, Umueleke -
								4pm. <br />
								In {days3} Days, {hours3} Hours, {minutes3} Minutes, {seconds3}{" "}
								Seconds
							</p>
						</SwiperSlide>
						<SwiperSlide>
							<h4 className="text-sm font-semibold text-purple-300">
								8th June, 2024
							</h4>
							<h3 className="md:text-xl font-semibold text-purple-600">
								Burial Ceremony
							</h3>
							<p className="text-xs md:text-base">
								At St Paul's Anglican Church, Umueleke, Owerre, Ehime -Mbano -
								11am. <br /> In {days4} Days, {hours4} Hours, {minutes4}{" "}
								Minutes, {seconds4} Seconds
							</p>
						</SwiperSlide>
						<SwiperSlide>
							<h4 className="text-sm font-semibold text-purple-300">
								9th June, 2024
							</h4>
							<h3 className="md:text-xl font-semibold text-purple-600">
								Outing Service
							</h3>
							<p className="text-xs md:text-base">
							At St Paul's Church, Umueleke - 9am.		<br /> In {days5} Days, {hours5} Hours, {minutes5} Minutes, {seconds5}{" "}
								Seconds
							</p>
						</SwiperSlide>
					</Swiper>
					<button
						onClick={() => swipe?.slideNext()}
						className="absolute top-0 right-0 p-2 bg-purple-500/30 text-white rounded-full z-20"
					>
						<ChevronRightIcon className="h-6 w-6" />
					</button>
				</div>

				<hr className="my-10 border-purple-900/30" />
				<motion.h2
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="text-xl mx-auto font-semibold"
				>
					Tributes & Prayers ({tributes?.length})
				</motion.h2>

				<ul className="mt-6 flex flex-col gap-4 pb-20">
					{tributes.map(({ value, name }, i) => (
						<motion.li
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
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
										document
											.getElementById("bottom")
											?.scrollIntoView({ behavior: "smooth" });
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
