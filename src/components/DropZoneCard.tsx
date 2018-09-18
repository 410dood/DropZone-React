import * as React from "react";
// import * as ClassNames from "classnames";

interface DropZoneCardProps {
    id: string | undefined;
    name: string | number | boolean;
    status: string | number | boolean;
    description: string | number | boolean;
    handleOnDrag: (event: React.DragEvent) => void;
    handleOnDragStart: (event: React.DragEvent) => void;
    handleOnDragEnd: (event: React.DragEvent) => void;
}

export const DropZoneCard: React.SFC<DropZoneCardProps> = (props) => (
    <div
        id={props.id}
        className="draggable-card"
        draggable={true}
        onDragStart={props.handleOnDragStart}
        onDragEnd={props.handleOnDragEnd}
    >
        <h2>{props.name}</h2>
        <h4>{props.status}</h4>
        <p>{props.description}</p>
    </div>
);
