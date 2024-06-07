import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { tributesQuery } from "../contexts/DB";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

type tribute = { value: string; name: string; createdAt: Date };

const Tributes = () => {
	const [tributes, setTributes] = useState<tribute[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		onSnapshot(tributesQuery, (snapshot) => {
			if (!snapshot.empty) {
				const localTributes: tribute[] = [];
				snapshot.docs.forEach((doc) =>
					localTributes.push(doc.data() as tribute)
				);
				setTributes([...localTributes]);
				setLoading(false);
			}
		});
	});
	return (
		<>
			<Link
				to={"/"}
				className="absolute top-4 left-4 z-50 bg-purple-950 shadow h-10 w-10 text-white rounded-full flex items-center justify-center"
			>
				<ChevronLeftIcon className="h-6" />
			</Link>
			{loading ? (
				<div className="text-2xl font-bold flex justify-center items-center h-full absolute w-full animate-pulse">
					Loading...
				</div>
			) : (
				<Swiper
					centeredSlides
					slidesPerView={1.1}
					spaceBetween={16}
					loop
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					speed={3000}
					modules={[Autoplay]}
				>
					{tributes.map(({ value, name }, i) => (
						<SwiperSlide
							key={i}
							className="bg-zinc-900/50 h-max py-4 px-6 rounded my-auto max-h-[90vh] overflow-y-auto"
						>
							<h4 className="text-sm capitalize text-purple-600 mb-2 font-semibold">
								{name}
							</h4>
							<pre className=" whitespace-pre-wrap">{value}</pre>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	);
};

export default Tributes;
