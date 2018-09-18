import * as React from "react";
import { DropZone } from "./DropZone";

interface DropZoneState {
   cardList: any;
   enumerationOptions: EnumerationMap[] | undefined;
   draggedItem: HTMLDivElement | undefined;
   dropZone: HTMLDivElement | undefined;
}

interface WrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    mxform: mxui.lib.form._FormBase;
    style?: string;
}

interface DropZoneContainerProps extends WrapperProps {
    tasksEntity: string;
    dataSourceMicroflow: string;
    statusEnumeration: string;
}

export interface CardListItem {
    id: string;
    name: string;
    category: string;
    bgColor: string;
}

export interface EnumerationMap extends Object {
    key: string;
    caption: string;
}

class DropZoneContainer extends React.Component<DropZoneContainerProps, DropZoneState> {

    private subscriptionHandles: number[];

    constructor(props: DropZoneContainerProps) {
            super(props);
            this.state = {
                cardList: [],
                enumerationOptions: undefined,
                draggedItem: undefined,
                dropZone: undefined
            };
        }

    componentDidMount() {
        console.log("Props" , this.props);
        const tasksEntity = mx.meta.getEntity(this.props.tasksEntity);
        const options = tasksEntity.getEnumMap(this.props.statusEnumeration);
        this.setState({ enumerationOptions: options });
        console.log(this.state.enumerationOptions);
        mx.data.action({
            params: {
                actionname: this.props.dataSourceMicroflow
            },
            callback: (res) => this.setState({ cardList: res }, () => this.state.cardList.forEach((card: mendix.lib.MxObject) => this.resetSubscriptions(card)))
        });
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(mx.data.subscribe({
                callback: this.subscriptionCallback,
                guid: mxObject.getGuid()
            }));
        }
    }

    private subscriptionCallback() {
        console.log("this is the subsciption callback");
    }

    // Event handlers on the element being dragged
    handleOnDrag = (event: React.DragEvent<HTMLDivElement>) => {
        console.log(event);
    }

    handleOnDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const target = (event.target as HTMLDivElement);
        event.dataTransfer.setData("text/plain", target.id);
        target.style.opacity = "0.5";
    }

    handleOnDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        const target = (event.target as HTMLDivElement);
        target.style.opacity = "";
    }

    // Event handlers for drop zones
    handleOnDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        const target = event.currentTarget as HTMLDivElement;
        target.style.backgroundColor = "hsla(220, 100%,  44%,  0.5)";

    }

    handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    handleOnDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        const target = event.currentTarget as HTMLDivElement;
        target.style.backgroundColor = "";
    }

    handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
        const target = event.currentTarget as HTMLDivElement;
        target.style.backgroundColor = "";
        event.preventDefault();
        const cardID = event.dataTransfer.getData("text");
        mx.data.get({
            guid: cardID,
            callback: (mxObject: mendix.lib.MxObject) => this.changeStatus(mxObject, target.id) }
        );
    }

    changeStatus = (mxObject: mendix.lib.MxObject, value: string) => {
        mxObject.set(this.props.statusEnumeration, value);
        mx.data.commit({ mxobj: mxObject, callback: () => console.log("object commited") });
    }

    mapEnumerationValues = () => {
        if (this.state.enumerationOptions) {
            const mapedValues = this.state.enumerationOptions.map(option =>

                (
                    <DropZone
                        key={option.key}
                        cardList={this.state.cardList}
                        statusEnumeration={this.props.statusEnumeration}
                        value={option.key}
                        caption={option.caption}
                        handleOnDrag={this.handleOnDrag}
                        handleOnDragStart={this.handleOnDragStart}
                        handleOnDragEnd={this.handleOnDragEnd}
                        handleOnDragEnter={this.handleOnDragEnter}
                        handleOnDragOver={this.handleOnDragOver}
                        handleOnDragLeave={this.handleOnDragLeave}
                        handleOnDrop={this.handleOnDrop}
                    />
                ));
            return mapedValues;
        } else return null;

    }

    render() {
        return (
            <div className="row">
                {this.mapEnumerationValues()}
            </div>
        );
    }
}

export { DropZoneContainerProps, DropZoneContainer as default };
