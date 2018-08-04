import * as React from "react";
import { DropZoneCard } from "./DropZoneCard";
import "../ui/style.css";

export interface DropZoneProps {
    phaseTitle: string;
    cardList: mendix.lib.MxObject[];
    handleOnDragStart: (event: React.DragEvent) => void;
    handleOnDragEnter: (event: React.DragEvent) => void;
}

export const DropZone: React.SFC<DropZoneProps> = (props) => {
    const list = props.cardList.map(mxObject => (
        <DropZoneCard
            description={mxObject.get("Description")}
            booked={mxObject.get("Booked")}
            handleOnDragStart={props.handleOnDragStart}
        />
    ));
    return (
        <div className="dropzone" onDragOver={props.handleOnDragEnter}>
            <h2>{props.phaseTitle}</h2>
            {list}
        </div>
    );
};
