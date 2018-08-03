import * as React from "react";
import { DropZoneCard } from "./DropZoneCard";
import { CardListItem } from "./DropZoneContainer";
import "../ui/style.css";

export interface DropZoneProps {
    phaseTitle: string;
    cardList: CardListItem[];
    handleOnDragStart: (event: React.DragEvent) => void;
    handleOnDragEnter: (event: React.DragEvent) => void;
}

export const DropZone: React.SFC<DropZoneProps> = (props) => {
    const List = () => props.cardList.forEach(item => (
        <DropZoneCard
            cardTitle={item.name}
            cardContent={item.category}
            handleOnDragStart={props.handleOnDragStart}
        />
    ));
    return (
        <div className="main-div" onDragOver={props.handleOnDragEnter}>
            <h2>{props.phaseTitle}</h2>
            {List}
        </div>
    );
};
