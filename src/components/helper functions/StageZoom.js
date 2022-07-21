import React from "react";

const StageZoom = (e, stage, dir) => {
    const scaleBy = 1.05;
// stage.on('wheel', (e) => {
//     e.evt.preventDefault();
    //console.log(stage);
    const oldScale = stage.scaleX();
    const pointer = {
        x: stage.width() / 2,
        y: stage.height() / 2,
    }

    const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale, 
        y: (pointer.y - stage.y()) / oldScale,
    };

    let direction = null;
    if(dir === 0){
        direction = e.evt.deltaY > 0 ? 1 : -1;
    }
    else {
        direction = dir;
    }
    

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction

    if (e && e.evt.ctrlKey) {
        direction = -direction;
    }

    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
//   });
}

export default StageZoom;