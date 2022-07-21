// Initially return the DEFAULT_STATE and later on return the changed state named "INITIAL_STATE"
// Within the ContextProvider function there is a useEffect hook that updates the state
// saved in the localStorage every time the app is re-rendered.

/* const localStorageData = localStorage.getItem("state");
const parsedState = localStorageData ? JSON.parse(localStorageData) : null;
console.log("-------from state.js--------")
console.log(parsedState) */

const DEFAULT_STATE = {
	startX: 0,
	startY: 0,
	isDrawing: false,
	didMouseMove: false,
	clickedArea: { box: -1, pos: "o" },
	boxes: {},
	files: [],
	mouseX: 0,
	mouseY: 0,
	originalImageSize: { width: 0, height: 0 },
	currentImageSize: { width: 0, height: 0 },
	currentFileIndex: 0,
	boxedImages: [],
	popup: false,
	tmpBox: null,
	labels: [],
	labelPrompt: false,
	rectangles: [],
	screenSize: {width: window.innerWidth, height: window.innerHeight},
	rectSelected: false,
	selectedRectId: -1,
	downloadAllPushed: false,
	imageURLs: [],
	stageSize: {width: 0, height: 0},
	stage: null,
};

/* const INITIAL_STATE = parsedState
	? {
			...parsedState,
	  }
	: DEFAULT_STATE; */

export default DEFAULT_STATE;
