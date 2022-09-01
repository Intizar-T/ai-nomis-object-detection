import React from "react";
import { Rect, Transformer } from "react-konva";
import { useEffect } from "react";

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  stageWidth,
  stageHeight,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        name="rectangle"
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragMove={(e) => {
          const node = shapeRef.current;
          node.y(Math.max(node.y(), 3));
          node.y(Math.min(node.y(), stageHeight - node.height()));
          node.x(Math.max(node.x(), 3));
          node.x(Math.min(node.x(), stageWidth - node.width()));
        }}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),

            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            const tooSmall = newBox.width < 2.5 || newBox.height < 2.5;
            const tooLarge =
              newBox.x < 0 ||
              newBox.x + newBox.width > stageWidth ||
              newBox.y < 0 ||
              newBox.y + newBox.height > stageHeight;
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
