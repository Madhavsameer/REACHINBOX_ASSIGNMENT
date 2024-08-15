import { useEffect, useState } from "react";
import axios from "axios";
import InboxView from "./InboxView";
import MainContainer from "./MainContainer";
import RightSection from "./RightSection";

function MainPage() {
	const [datas, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedThread, setSelectedThread] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					"https://hiring.reachinbox.xyz/api/v1/onebox/list",
					{
						headers: {
							Authorization: token,
						},
					}
				);
				setData(res.data.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 2500);

		return () => clearInterval(interval);
	}, []);

	const loadMail = (threadId) => {
		setSelectedThread(threadId);
	};

	// if (loading) {
	// 	return (
	// 		<div className="bg-[#ECEFF3] dark:bg-black dark:text-white text-[#5B5F66] flex h-screen w-full justify-center items-center">
	// 			Loading ...
	// 		</div>
	// 	);
	// }
	if (loading) {
		return (
			<div className="bg-[#ECEFF3] dark:bg-black dark:text-white text-[#5B5F66] flex h-screen w-full justify-center items-center">
				<div className="flex flex-col items-center">
					<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
					<div>Loading...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-[#ECEFF3] dark:bg-black text-white pt-16 flex w-full h-screen">
			<div className="w-1/4">
				<InboxView data={datas} loadMail={loadMail} />
			</div>
			<div className="w-2/4">
				<MainContainer selectedThread={selectedThread} />
			</div>
			<div className="w-1/4">
				<RightSection />
			</div>
		</div>
	);
}

export default MainPage;
