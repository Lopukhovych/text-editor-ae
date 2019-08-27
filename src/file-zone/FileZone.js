import React, {PureComponent} from 'react';

import getMockText from '../text.service';
import {getSynonyms} from '../helpers/synonyms';
import {getLocalStorage, setLocaleStorage} from '../helpers/localStorage';

import Popover from '../components/Popover';

import './FileZone.css';


class FileZone extends PureComponent {

    static getText() {
        return getMockText().then(function (result) {
            return result;
        });
    }

    static getParentNode() {
        let range = null;
        if (document.selection) {
            range = document.selection.createRange();
            return {range: range, parentNode: range.parentElement()};
        } else {
            const selection = window.getSelection();
            range = selection.getRangeAt(0);
            return {range: range, parentNode: selection.rangeCount > 0 ? range.startContainer.parentNode : null};
        }
    }

    static onKeyDown(event) {
        if (event.keyCode === 9) {
            document.execCommand('insertHTML', true, '&emsp;');
            event.preventDefault()
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            content: '',
            isPopoverOpen: false,
            synonyms: [],
            popoverPosition: [-1000, -1000],
            valuePosition: [0, 0],
            selectedNode: null
        };

        this.inputField = React.createRef();

        this.selectTextHandler = this.selectTextHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.closePopover = this.closePopover.bind(this);

        this.localStorageKey = 'content';
    }

    componentDidMount() {
        const savedContent = getLocalStorage(this.localStorageKey);
        if (savedContent) {
            this.inputField.current.innerHTML = savedContent;
            this.setState({
                content: savedContent,
            });
        } else {
            FileZone.getText()
                .then(result => {
                    this.inputField.current.innerHTML = result;
                    this.setState({
                        content: result
                    });
                });
        }

    }

    closePopover() {
        this.setState({
            isPopoverOpen: false,
        });
    }


    updateState(updatedContent) {
        setLocaleStorage(this.localStorageKey, updatedContent);
        this.setState({
            content: updatedContent,
            isPopoverOpen: false,
        });
    }

    updateContent(updatedText, start, stop) {
        const {selectedNode} = this.state;

        // Here must be not innerHTML, but I didn't find the right solution
        selectedNode.innerHTML = selectedNode.innerHTML.substr(0, start) + updatedText +
            selectedNode.innerHTML.substr(stop);

        this.updateState(this.inputField.current.innerHTML);
    }

    inputHandler() {
        this.updateState(this.inputField.current.innerHTML)
    }

    selectTextHandler() {
        const {range, parentNode} = FileZone.getParentNode();
        const oRect = range.getBoundingClientRect();
        const bufferText = range.toString();

        if (bufferText.length) {
            getSynonyms(bufferText)
                .then((data) => {
                    this.setState({
                        isPopoverOpen: true,
                        synonyms: data,
                        popoverPosition: [oRect.left - 70, oRect.top - 70],
                        valuePosition: [range.startOffset, range.endOffset],
                        selectedNode: parentNode
                    })
                })
        }
    }

    render() {
        const {
            isPopoverOpen,
            synonyms,
            popoverPosition,
            valuePosition,
        } = this.state;
        let popover = null;

        if (isPopoverOpen) {
            popover = <Popover
                closePopover={this.closePopover}
                synonyms={synonyms}
                setSynonym={(updatedText) => this.updateContent(updatedText, ...valuePosition)}
                position={popoverPosition}
            />
        }

        return (
            <div id="file-zone">
                <div
                    className=''
                    ref={this.inputField}
                    id="file" contentEditable={true}
                    onDoubleClick={(event) => this.selectTextHandler(event)}
                    onSelect={(event) => this.selectTextHandler(event)}
                    onInput={this.inputHandler}
                    onKeyDownCapture={FileZone.onKeyDown}
                />
                {popover}
            </div>
        );
    }
}

export default FileZone;
