import * as React from "react";
import { DropZone } from "./DropZone";

interface DropZoneState {
    displayMessage: string;
}

interface WrapperProps {
    class?: string;
    mxform: mxui.lib.form._FormBase;
    style?: string;
}

interface DropZoneProps extends WrapperProps {
    displayMessage: string;
}

class HelloWorldContainer extends React.Component<DropZoneProps, DropZoneState> {
    constructor(props: DropZoneProps) {
        super(props);
        this.state = {
           displayMessage: ""
        };
    }

    componentDidMount() {
        this.setState({ displayMessage: this.props.displayMessage });
    }

    render() {
        return(
            <DropZone
                message={this.state.displayMessage}
            />
        );
    }
}

export { DropZoneProps, HelloWorldContainer as default };
