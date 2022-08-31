const DEFAULT_STATE = {
	files: [],
	imageSize: { width: 0, height: 0 },
	currentFileIndex: 0,
	labels: [],
	labelPrompt: false,
	rectangles: [],
	screenSize: {width: window.innerWidth, height: window.innerHeight},
	selectedRectId: -1,
	imageURLs: [],
	stageSize: {width: 0, height: 0},
	stage: null,
	imageKeyword: "",
	imageCount: 0,
	imagesReady: false,
};

export default DEFAULT_STATE;
