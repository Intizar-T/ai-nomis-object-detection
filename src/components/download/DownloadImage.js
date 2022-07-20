const DownloadImage = (state, uri) => {
    var link = document.createElement('a');
    link.download = state.currentFileIndex + ".png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);  
};

export default DownloadImage;