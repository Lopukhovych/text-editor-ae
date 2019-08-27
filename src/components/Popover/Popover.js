import React, {PureComponent} from 'react';
import ControlPanel from "../../control-panel/ControlPanel";

import onClickOutside from "react-onclickoutside";

import './Popover.css';

class Popover extends PureComponent {

    // close modal if clicked outside
    handleClickOutside() {
        const {closePopover} = this.props;
        closePopover();
    };

    render() {

        const {synonyms, setSynonym, position} = this.props;
        const synonymList = synonyms
            && (<div className='synonym__list'>
                {synonyms.map((item, index) => <span onClick={() => setSynonym(item.word)}
                                                     key={index}>{item.word}</span>)}
            </div>);

        return (
            <div style={{left: `${position[0]}px`, top: `${position[1]}px`}} className='popover'>
                <ControlPanel/>
                {synonymList}
            </div>
        );
    };
}

export default onClickOutside(Popover);
