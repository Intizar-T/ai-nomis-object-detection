

const DownloadAllText = (state) => {
    let currRect = null, coord = null;
    const coordArr = [];
    for(let i = 0; i < state.files.length; i++) {
        currRect = state.rectangles[i];
        coord = {
            x: currRect.x,
            y: currRect.y,
            width: currRect.width,
            height: currRect.height,
            label: currRect.label,
            imageName: i
        };
        coordArr.push(coord);
    }
    
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(coordArr)], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "All_Image_Coordinates.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
};

export default DownloadAllText;