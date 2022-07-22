import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { 
	DialogBody, 
	DialogFooter, 
	DialogHeader, 
	Button, 
	Input, } from "@material-tailwind/react";


export default function ClassModal(props) {
	const [value, setValue] = useState(1);

	return (
		<Dialog open={true}>
			<DialogHeader>
				Enter number of classes
			</DialogHeader>
			<DialogBody>
				<Input
					variant="outlined"
					type="number"
					min={1}
					max={143}
					value={value}
					onChange={(e) => {
						setValue(e.target.valueAsNumber);
					}}
				/>
			</DialogBody>
			<DialogFooter>
				<Button
					onClick={() => {
						if (value > 0 && value < 143) {
							props.dispatch({ type: "INIT_LABELS", length: value });
							props.dispatch({ type: "SET_LABELPROMPT", label: false });
							//props.dispatch({ type: "SET_POPUP", popup: true });
						} else if (value <= 0) {
							setValue(0);
							alert("PLease enter valid number");
						} else {
							setValue(0);
							alert("Value is too big");
						}
					}}
				>
					OK
				</Button>
			</DialogFooter>
		</Dialog>
	);
}
