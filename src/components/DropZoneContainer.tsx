import * as React from "react";
import { DropZone } from "./DropZone";

interface DropZoneState {
   phaseTitle: string;
   cardList: mendix.lib.MxObject[];
   filteredList: mendix.lib.MxObject[];
}

interface WrapperProps {
    class?: string;
    mxform: mxui.lib.form._FormBase;
    style?: string;
}

interface DropZoneContainerProps extends WrapperProps {
    phaseTitle: string;
    dataSourceMf: string;
}

export interface CardListItem {
    id: string;
    name: string;
    category: string;
    bgColor: string;
}

class DropZoneContainer extends React.Component<DropZoneContainerProps, DropZoneState> {
constructor(props: DropZoneContainerProps) {
        super(props);
        this.state = {
           phaseTitle: "",
           cardList: [],
           filteredList: []
        };
    }

componentWillReceiveProps() {
        mx.ui.action(
            this.props.dataSourceMf,
            {
                error: error => window.mx.ui.error(`Error while executing microflow ${this.props.dataSourceMf}: ${error.message}`),
                callback: (res: mendix.lib.MxObject[]) => this.setState({ filteredList: this.filterList(res), cardList: res })
            }
        );
    }

componentDidMount() {
    this.setState({
            phaseTitle: this.props.phaseTitle
        });
    }

filterList = (list: mendix.lib.MxObject[]) => {
    const value = this.props.phaseTitle === "Start" ? false : true;
    const filteredList = list.filter(item => item.get("Booked") === value);
    return filteredList;
}

handleOnDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
    const target = (event.target as HTMLDivElement);
    target.style.opacity = ".5";
    const id = (event.target as HTMLDivElement).id;
    event.dataTransfer.setData("id", id);
    console.log(id);
}

handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

handleOnDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = (event.target as HTMLDivElement);
    target.style.opacity = "";
    const id = target.id;
    if (event.dataTransfer.dropEffect !== "none") {
        this.setState({
            filteredList: this.state.filteredList.filter(item => item.getGuid() !== id)
        });
        console.log("Dragend: ", id);
    }
}

handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("id");
        const movedItem = this.state.cardList.find(item => item.getGuid() === data);
        if (movedItem) {
            this.setState({ filteredList: [ ...this.state.filteredList, movedItem ] });
        }
    }

render() {
        return(
            <DropZone
                phaseTitle={this.state.phaseTitle}
                cardList={this.state.filteredList}
                handleOnDragStart={this.handleOnDragStart}
                handleOnDragEnd={this.handleOnDragEnd}
                handleDragOver={this.handleDragOver}
                handleOnDrop={this.handleOnDrop}
            />
        );
    }
}

export { DropZoneContainerProps, DropZoneContainer as default };
