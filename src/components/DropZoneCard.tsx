import * as React from "react";
// import * as ClassNames from "classnames";

interface DropZoneCardProps {
    booked: string | number | boolean;
    description: string | number | boolean;
    handleOnDragStart: (event: React.DragEvent) => void;
}

export const DropZoneCard: React.SFC<DropZoneCardProps> = (props) => (
    <div id={"this-id"} className="draggable-card" draggable={true} onDragStart={props.handleOnDragStart}>
        <input type="checkbox" checked={typeof props.booked === "boolean" ? props.booked : undefined} />
        <p>{props.description}</p>
    </div>
);
