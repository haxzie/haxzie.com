import React from 'react';

const IconButton = (props) => (
    <i className="material-icons icon-button" onClick={props.onClick || null}>{props.children}</i>
)

export default IconButton;