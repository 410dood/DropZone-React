import * as React from "react";
import { DropZoneCard } from "./DropZoneCard";

import "../ui/style.css";

export interface DropZoneProps {
    cardList: mendix.lib.MxObject[];
    statusEnumeration: string;
    caption: string;
    value: string;
    handleOnDrag: (event: React.DragEvent) => void;
    handleOnDragStart: (event: React.DragEvent) => void;
    handleOnDragOver: (event: React.DragEvent) => void;
    handleOnDragEnd: (event: React.DragEvent) => void;
    handleOnDragEnter: (event: React.DragEvent) => void;
    handleOnDragLeave: (event: React.DragEvent) => void;
    handleOnDrop: (event: React.DragEvent) => void;
}

export const DropZone: React.SFC<DropZoneProps> = (props) => {

    const cardList = () => {
        const cardsToDisplay = props.cardList
            .filter(card => card.get(props.statusEnumeration) === props.value)
            .map(card => (
                <DropZoneCard
                    key={card.getGuid()}
                    id={card.getGuid()}
                    name={card.get("Name")}
                    status={card.get("Status")}
                    description={card.get("Description")}
                    handleOnDrag={props.handleOnDrag}
                    handleOnDragStart={props.handleOnDragStart}
                    handleOnDragEnd={props.handleOnDragEnd}
                />
            ));
        return cardsToDisplay;
    };

    return (
        <div
            id={props.value}
            className="col dropzone"
            onDragEnter={props.handleOnDragEnter}
            onDragOver={props.handleOnDragOver}
            onDragLeave={props.handleOnDragLeave}
            onDrop={props.handleOnDrop}
        >
            <h2 className="column-title">{props.caption}</h2>
            {cardList()}
        </div >
    );
};
