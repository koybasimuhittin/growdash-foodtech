import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export default function NewDiscountModal() {
	const [modalStep, setModalStep] = useState<number>(0)

	useEffect(() => {
		setModalStep(0)
	})

	const handleModalBack = () => {
		if (modalStep === 0) return
		setModalStep(modalStep - 1)
	}

	const steps = [
		{
			title: "Choose discount method",
			description: (
				<div className="flex flex-col gap-6">
					<Button
						onClick={() => setModalStep(2)}
						className="h-fit"
						variant={"outline"}
					>
						<div className="flex flex-col items-start justify-center p-2">
							<div className="text-lg">Manuel</div>
							<div className="text-left">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Pellentesque facilisis non metus vitae eleifend. Maecenas ut
								cursus massa. Curabitur id hendrerit est, eget porttitor enim.
								Mauris id lectus sed est condimentum rhoncus. Mauris id
								efficitur risus.
							</div>
						</div>
					</Button>
					<Button
						onClick={() => setModalStep(2)}
						className="h-fit"
						variant={"outline"}
					>
						<div className="flex flex-col items-start justify-center p-2">
							<div className="text-lg">Auto</div>
							<div className="text-left">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Pellentesque facilisis non metus vitae eleifend. Maecenas ut
								cursus massa. Curabitur id hendrerit est, eget porttitor enim.
								Mauris id lectus sed est condimentum rhoncus. Mauris id
								efficitur risus.
							</div>
						</div>
					</Button>
				</div>
			),
		},
	]

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>+Add Discount</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{steps[modalStep].title}</DialogTitle>
					<br />
					<DialogDescription>{steps[modalStep].description}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
