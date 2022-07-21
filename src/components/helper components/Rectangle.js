import React from 'react';
import { Rect, Transformer } from 'react-konva';
import { useEffect } from 'react';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, stageWidth, stageHeight }) => {
    const shapeRef = React.useRef();
    //const stage = shapeRef.current;
    //console.log(stage.width() + ", " + stage.height());
    
    const trRef = React.useRef();
    //console.log(shapeRef);
    useEffect(() => {
      if (isSelected) {
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
      //console.log(stageHeight + ", " + stageWidth);
    }, [isSelected]);
  
    return (
      <React.Fragment>
        <Rect
          name='rectangle'
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          
          onDragMove={(e) => {
            const node = shapeRef.current;
            node.y(Math.max(node.y(), 3));
            node.y(Math.min(node.y(), (stageHeight - node.height()-3)));
            node.x(Math.max(node.x(), 3));
            node.x(Math.min(node.x(), (stageWidth - node.width()-3)));
          }}
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={(e) => {
            //alert("transformer");
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
  
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              const node = shapeRef.current;
              const canvas = document.querySelector('canvas');
              const rectPos = canvas.getClientRects()[0];
              //console.log(newBox.x + newBox.width);
              const tooSmall = (newBox.width < 5 || newBox.height < 5);
              const tooLarge = (newBox.x < 0 || 
                                newBox.x + newBox.width > stageWidth ||
                                newBox.y < 0 ||
                                newBox.y + newBox.height > stageHeight)
              if (tooSmall || tooLarge) {
                return oldBox;
              }
              return newBox;
            }}
            rotateEnabled={false}
            keepRatio={false}
          />
        )}
      </React.Fragment>
    );
  };

  export default Rectangle;