/**
 * Language Provider Helper Component
 * Used to Display Localised Strings
 */
import React from 'react'; 

// Injected message 
const formatMessage = (props) => {
    return(
        <span>{props.id}</span>
    )
}
export default formatMessage;