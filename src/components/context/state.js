const DEFAULT_STATE = {
	boxes: {},
	files: [],
	originalImageSize: { width: 0, height: 0 },
	currentFileIndex: 0,
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

export default DEFAULT_STATE;
