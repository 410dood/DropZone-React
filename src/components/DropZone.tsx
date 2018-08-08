import * as React from "react";
import { DropZoneCard } from "./DropZoneCard";
import "../ui/style.css";

export interface DropZoneProps {
    phaseTitle: string;
    cardList: mendix.lib.MxObject[];
    handleOnDragStart: (event: React.DragEvent) => void;
    handleOnDragEnd: (event: React.DragEvent) => void;
    handleDragOver: (event: React.DragEvent) => void;
    handleOnDrop: (event: React.DragEvent) => void;
}

export const DropZone: React.SFC<DropZoneProps> = (props) => {
    const list = props.cardList.map(mxObject => (
        <DropZoneCard
            key={mxObject.getGuid()}
            id={mxObject.getGuid()}
            description={mxObject.get("Description")}
            booked={mxObject.get("Booked")}
            handleOnDragStart={props.handleOnDragStart}
            handleOnDragEnd={props.handleOnDragEnd}
        />
        ));
    return (
        <div id={props.phaseTitle.toLowerCase()} className="dropzone" onDragOver={props.handleDragOver} onDrop={props.handleOnDrop}>
            <h2>{props.phaseTitle}</h2>
            {list}
        </div>
    );
};
