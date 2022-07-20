const DownloadText = (state) => {
    const currIndex = state.currentFileIndex;
    const currRect = state.rectangles[currIndex];
    const coord = {
        x: currRect.x,
        y: currRect.y,
        width: currRect.width,
        height: currRect.height,
        label: currRect.label
    }
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(coord)], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = currIndex + "_coordinates.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
};

export default DownloadText;