import React, {PureComponent} from 'react';

import './ControlPanel.css';

class ControlPanel extends PureComponent {
    static toggleBold() {
        document.execCommand("bold");
    }

    static toggleItalic() {
        document.execCommand("italic");
    }

    static toggleUnderline() {
        document.execCommand("underline");
    }

    render() {
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <button
                        className="format-action"
                        type="button"
                        onClick={ControlPanel.toggleBold}
                    >
                        <b>B</b>
                    </button>
                    <button
                        className="format-action"
                        type="button"
                        onClick={ControlPanel.toggleItalic}
                    >
                        <i>I</i>
                    </button>
                    <button
                        className="format-action"
                        type="button"
                        onClick={ControlPanel.toggleUnderline}
                    >
                        <u>U</u>
                    </button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
