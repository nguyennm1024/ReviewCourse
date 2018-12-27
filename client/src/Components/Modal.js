import React, { Component } from 'react';

class Modal extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className={"modal fade in"} role='dialog' style={{ display: 'block' }}>
                        <div className={"modal-dialog " + this.props.size}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button className="close" onClick={this.props.changeToggle}>&times;</button>
                                    <h4 className="modal-title text-center">{this.props.title}</h4>
                                </div>

                                <div className="modal-body">
                                    {this.props.component_1}
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-default" onClick={this.props.action_1}>
                                        {this.props.actionName_1}
                                    </button>
                                    <button
                                        className="btn btn-default"
                                        onClick={this.props.action_2}
                                        disabled={this.props.isDisabledAction}
                                    >
                                        {this.props.actionName_2}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade in"></div>
                </div>
                {this.props.secondToggle ? this.props.component_2 : <div />}
            </div>
        );
    }
}
export default Modal;