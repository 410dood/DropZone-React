import * as React from "react";
// import * as ClassNames from "classnames";

interface DropZoneCardProps {
    id: string | undefined;
    booked: string | number | boolean;
    description: string | number | boolean;
    handleOnDragStart: (event: React.DragEvent) => void;
    handleOnDragEnd: (event: React.DragEvent) => void;
}

export const DropZoneCard: React.SFC<DropZoneCardProps> = (props) => (
    <div id={props.id} className="draggable-card" draggable={true} onDragStart={props.handleOnDragStart} onDragEnd={props.handleOnDragEnd}>
        <input type="checkbox" checked={typeof props.booked === "boolean" ? props.booked : undefined} />
        <p>{props.description}</p>
    </div>
);
