import * as React from "react";
import { DropZone } from "./DropZone";

interface DropZoneState {
   phaseTitle: string;
   cardList: mendix.lib.MxObject[];
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
           cardList: []
        };
    }

    componentWillReceiveProps() {
        mx.ui.action(
            this.props.dataSourceMf,
            {
                error: error => window.mx.ui.error(`Error while executing microflow ${this.props.dataSourceMf}: ${error.message}`),
                callback: (res: mendix.lib.MxObject[]) => this.setState({ cardList: res })
            }
        );
    }

    componentDidMount() {
        this.setState({
            phaseTitle: this.props.phaseTitle
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

export { DropZoneContainerProps, DropZoneContainer as default };
