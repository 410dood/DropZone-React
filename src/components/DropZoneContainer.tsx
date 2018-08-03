import * as React from "react";
import { DropZone } from "./DropZone";

interface DropZoneState {
   phaseTitle: string;
   cardList: CardListItem[];
}

interface WrapperProps {
    class?: string;
    mxform: mxui.lib.form._FormBase;
    style?: string;
}

interface DropZoneProps extends WrapperProps {
    phaseTitle: string;
}

export interface CardListItem {
    id: string;
    name: string;
    category: string;
    bgColor: string;
}

class DropZoneContainer extends React.Component<DropZoneProps, DropZoneState> {

    constructor(props: DropZoneProps) {
        super(props);
        this.state = {
           phaseTitle: "",
           cardList: []
        };
    }

    componentWillReceiveProps() {
        this.setState({
            phaseTitle: this.props.phaseTitle,
            cardList: [
                {
                    id: "1",
                    name: "Learn Angular",
                    category: "wip",
                    bgColor: "yellow"
                },
                {
                    id: "2",
                    name: "React",
                    category: "wip",
                    bgColor: "pink"
                },
                {
                    id: "3",
                    name: "Vue",
                    category: "complete",
                    bgColor: "skyblue"}
                ]
        });
    }

    componentDidMount() {
        this.setState({
            phaseTitle: this.props.phaseTitle,
            cardList: [
                {
                    id: "1",
                    name: "Learn Angular",
                    category: "wip",
                    bgColor: "yellow"
                },
                {
                    id: "2",
                    name: "React",
                    category: "wip",
                    bgColor: "pink"
                },
                {
                    id: "3",
                    name: "Vue",
                    category: "complete",
                    bgColor: "skyblue"}
                ]
        });
    }

    handleOnDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const id = (event.target as HTMLDivElement).id;
        event.dataTransfer.setData("text/plain", id);
        console.log(id);
    }

    handleOnDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        const target = (event.target as HTMLDivElement);
        console.log(target);
    }

    render() {
        return(
            <DropZone
                phaseTitle={this.state.phaseTitle}
                cardList={this.state.cardList}
                handleOnDragStart={this.handleOnDragStart}
                handleOnDragEnter={this.handleOnDragEnter}
            />
        );
    }
}

export { DropZoneProps, DropZoneContainer as default };
