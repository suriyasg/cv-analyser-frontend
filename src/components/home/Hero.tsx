import React from "react";

function Hero() {
	return (
		<div className="flex flex-row w-full h-72 mt-6" id="hero">
			<div
				className="flex flex-col w-1/2 justify-center items-center"
				id="left-hero"
			>
				<div>
					<div className="font-extrabold text-4xl p-6">
						Analyze <br />
						Your CV. <br />
						Improve <br />
						Your Chances.
					</div>
					<div className="font-medium text-xl p-6 pt-0 text-gray-500">
						Upload your resume and job description to get an instant match
						score, skill insights, and improvement suggestions.
					</div>
				</div>
				<div>bullet points</div>
			</div>
			<div className="w-1/2 flex justify-center items-center" id="right-hero">
				<div>
					<img
						alt=""
						className="max-w-fit h-auto rounded-2xl"
						height={200}
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFvJh1qhgwLIvQFug9hVHuuNrg9NH7TMjimzD1BsiZLOeaBgmjArzYpWWOCncMFZk1ht_uIC_ZhCs4y1AvFYO5R-LIsRIpoNu87877ZTphm9yE3y6wavZ9NfsuR-tXuftUmjyldekCFRfuTA5e4UHU7rNtDZK_Ix7_myBvwTIICYQJep2smDkPYz5vq7nmjScrLQC4JBDFdytyi1hGcQzv0mIWu3vruqASdWHhvpd7m8kFQcKm9j6Ea1EvCsr4zE_b0-jMVK15vIWr"
						width={300}
					/>
				</div>
			</div>
		</div>
	);
}

export default Hero;
