import * as React from "react";
// import * as ClassNames from "classnames";

interface DropZoneCardProps {
    cardTitle: string;
    cardContent: string;
    handleOnDragStart: (event: React.DragEvent) => void;
}

export const DropZoneCard: React.SFC<DropZoneCardProps> = (props) => (
    <div id={"this-id"} className="draggable-card" draggable={true} onDragStart={props.handleOnDragStart}>
        <h4>{props.cardTitle}</h4>
        <p>{props.cardContent}</p>
    </div>
);
