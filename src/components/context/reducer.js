// a Reducer funtion that's utilized within the Context to update the state

const Reducer = (state, action) => {
	switch (action.type) {
		case "SET_BOX_LABEL":
			return {
				...state,
				rectangles: action.rects,
			}
		case "SET_LABELPROMPT":
			return {
				...state,
				labelPrompt: action.label,
			};
		case "INIT_LABELS":
			return {
				...state,
				labels: [...Array(action.length).keys()],
			};
		case "INIT_BOXES":
			const obj = {};
			for (let i = 0; i < action.length; i++) {
				obj[i] = [];
			}
			return {
				...state,
				boxes: obj,
			};
		case "INIT_RECTS":
			const rects = [];
			const hist = [];
			for(let i = 0; i < action.length; i++) {
				rects.push({
					x: 10,
					y: 10, 
					width: 100,
					height: 100, 
					id: i.toString(),
					label: "not labeled",
					stroke: 'black',
					strokeWidth: 4,
					hist: [
						{
							x: 10,
							y: 10, 
							width: 100,
							height: 100,
						}
					]
				})
			}
			return {
				...state,
				rectangles: rects,
			};
		case "UPDATE_RECTS":
			return {
				...state,
				rectangles: action.rects,
			};
		case "SET_FILES":
			return {
				...state,
				files: action.files,
			};
		case "SET_CURRENT_FILE_INDEX":
			return {
				...state,
				currentFileIndex: 0,
			};
		case "UPDATE_CURRENT_FILE_INDEX":
			return {
				...state,
				currentFileIndex: action.index,
			};
		case "ADD_BOX":
			const b = state.boxes[action.index];
			let c = JSON.stringify(b).indexOf(JSON.stringify(action.box));

			if (c === -1) {
				b.push(action.box);
			}

			return {
				...state,
				boxes: { ...state.boxes, currentFileIndex: b },
			};
		case "POP_BOX":
			const temp_arr = state.boxes[action.index];
			if (temp_arr.length > 0) {
				temp_arr.pop();
			}
			return {
				...state,
				boxes: [...state.boxes, temp_arr],
			};
		case "SET_BOXES":
			return {
				...state,
				boxes: { ...state.boxes, currentFileIndex: action.boxes },
			};
		case "SET_BOXDRAWN":
			return {
				...state,
				boxDrawn: action.boxDrawn,
			};
		case "SET_ORIGINAL_IMAGE_SIZE":
			return {
				...state,
				originalImageSize: action.size,
			};
		case "SET_STAGE_SIZE":
			return {
				...state,
				stageSize: action.size,
			};
		case "SET_STAGE":
		return {
			...state,
			stage: action.stage,
		};
		case "NEXT_FILE":
			return {
				...state,
				currentFileIndex:
					state.currentFileIndex < state.files.length - 1
						? state.currentFileIndex + 1
						: state.currentFileIndex,
			};
		case "PREV_FILE":
			return {
				...state,
				currentFileIndex:
					state.currentFileIndex > 0 ? state.currentFileIndex - 1 : state.currentFileIndex,
			};
		case "CHANGE_FILE":
			const arr = state.files;
			arr[action.index] = [state.files[action.index][0], action.file];
			return {
				...state,
				files: arr,
			};
		case "SET_SCREEN_SIZE":
			return {
				...state,
				screenSize: action.size,
			}
		case "SET_SELECTED_RECT_ID":
			return {
				...state,
				selectedRectId: action.id,
			}
		case "UPDATE_IMAGE_URLS":
			return {
				...state,
				imageURLs: action.URLs,
			}
		default:
			return state;
	}
};

export default Reducer;
