import * as React from "react";
// import * as ClassNames from "classnames";

interface DropZoneCardProps {
    id: string | undefined;
    name: string | number | boolean;
    status: string | number | boolean;
    description: string | number | boolean;
    subheader: string | number | boolean;
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
        <div className="card-header">
            <h4 className="card-title no-margin override">{props.name}</h4>
        </div>
        <div className="card-content">
            <b>{props.subheader}</b>
            <p>{props.description}</p>
        </div>
    </div>
);
