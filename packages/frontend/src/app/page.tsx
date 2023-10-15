import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
	return (
		<div className="pt-4">
			<div className="relative w-screen h-auto aspect-[3.1]">
				<Image
					src="/cover.png"
					alt="hero"
					fill
					className="aspect-auto absolute top-20 left-0 w-full h-full"
				/>
				<div className="top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 absolute flex flex-col items-center justify-center">
					<p className="text-white text-3xl text-center tracking-wide ">
						Boost Restaurant Revenues <br /> with Dynamic Pricing
					</p>
					<Link href="/login">
						<Button className="bg-[#5e3061ff] hover:bg-[#734079ff] w-36 h-12 text-lg mt-2">
							Join Us
						</Button>
					</Link>
				</div>
			</div>
			<div className="bg-gradient-to-b from-black to-[#5e3061ff] w-screen h-80 relative">
				<Image
					src="/logo_white.png"
					width={100}
					height={100}
					alt="logo"
					className="absolute -top-10 left-1/4 transform -translate-x-1/2"
				/>
				<div className="flex flex-row gap-4 absolute bottom-20 left-1/4 transform -translate-x-1/6 gap-20">
					<div className="flex flex-col items-start justify-center h-full text-left">
						<p className="text-white text-4xl text-left tracking-wide underline">
							Problem
						</p>
						<p className="text-white text-lg text-left mt-4 w-80">
							&#8226; Menu Optimization
						</p>
						<p className="text-white text-lg text-left mt-2 w-80">
							&#8226; Fixed/Static Prices
						</p>
						<p className="text-white text-lg text-left mt-2 w-80">
							&#8226; Lost of Revenue
						</p>
					</div>
					<div className="flex flex-col items-start justify-center h-full text-left">
						<p className="text-white text-4xl text-left tracking-wide underline">
							Solution
						</p>
						<p className="text-white text-lg text-left mt-4 w-full">
							&#10003; Recommedations for optimizing your menu
						</p>
						<p className="text-white text-lg text-left mt-2 w-full">
							&#10003; Fixed/Static Prices
						</p>
						<p className="text-white text-lg text-left mt-2 w-full">
							&#10003; Maximize revenue with auto discounts
						</p>
					</div>
				</div>
			</div>
			<div className="p-4">
				<div className="relative bg-white w-screen h-auto aspect-[3.05] ">
					<Image
						src="/banner.png"
						alt="banner"
						fill
						className="aspect-auto absolute top-20 left-0 w-full h-full"
					/>
				</div>
			</div>
		</div>
	)
}
