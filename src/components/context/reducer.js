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
			const newLabels = state.labels.concat(action.labels);
			return {
				...state,
				labels: newLabels,
			};
		case "INIT_RECTS":
			const rects = [];
			for(let i = 0; i < action.length; i++) {
				rects.push({
					x: 10,
					y: 10, 
					width: 100,
					height: 100, 
					id: i.toString(),
					label: "not labeled",
					stroke: 'black',
					strokeWidth: 3,
					hist: []
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
		case "SET_IMAGE_SIZE":
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
		case "SET_KEYWORD":
			return {
				...state,
				imageKeyword: action.keyword,
				//imageCount: action.count,
			}
		case "SET_COUNT":
			return {
				...state,
				//imageKeyword: action.keyword,
				imageCount: action.count,
			}
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
		// case "UPDATE_FILES":
		// 	return {
		// 		...state,
		// 		files: action.newFiles
		// 	}
		case "UPDATE_IMAGES_READY":
			return {
				...state,
				imagesReady: action.ready
			}
		default:
			return state;
	}
};

export default Reducer;
