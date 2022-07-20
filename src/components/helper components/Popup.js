import React, { useState, useContext } from "react";

export default function Popup(props) {
	const [label, setLabel] = useState(0);

	return (
		<div
			id="popup"
			className="popup_container"
			style={{ top: `${props.startY}px`, left: `${props.startX}px` }}
		>
			<div style={{ padding: "0" }} className="title">
				Please select the class of current object.
			</div>

			<select
				name="label_select"
				id="label_select"
				value={props.state.colors[label]}
				onChange={(e) => {
					setLabel(props.state.colors.indexOf(e.target.value));
				}}
			>
				{props.state.colors.map((color, i) => {
					return (
						<option key={color} value={color}>
							Class {i}
						</option>
					);
				})}
			</select>
			<div className="buttons">
				<button
					className="cancel__btn"
					onClick={() => {
						props.dispatch({ type: "SET_POPUP", popup: false });
					}}
				>
					Cancel
				</button>
				<button
					className="Ok__btn"
					onClick={() => {
						if (label >= 0) {
							props.dispatch({ type: "SET_POPUP", popup: false });
							const rects = props.state.rectangles;
							rects[props.state.currentFileIndex].label = label;
							props.dispatch({ type: "SET_BOX_LABEL", rects: rects });
							//console.log(props.state.rectangles[props.state.currentFileIndex].label);
						} else {
							alert("Please select class and click OK");
						}
					}}
				>
					Ok
				</button>
			</div>
		</div>
	);
}
