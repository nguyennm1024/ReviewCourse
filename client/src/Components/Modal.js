import React, { Component } from 'react';

class Modal extends Component {
    render() {
        return (
            <div>
                <div className={"modal fade in"} role='dialog' style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="close" onClick={this.props.changeToggle}>&times;</button>
                                <h4 className="modal-title text-center">{this.props.title}</h4>
                            </div>

                            <div className="modal-body">
                                {this.props.component}
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-default" onClick={this.props.changeToggle}>OK</button>
                                <button
                                    className="btn btn-default"
                                    onClick={this.props.action}
                                >
                                    {this.props.actionName}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade in"></div>
            </div>
        );
    }
}
export default Modal;