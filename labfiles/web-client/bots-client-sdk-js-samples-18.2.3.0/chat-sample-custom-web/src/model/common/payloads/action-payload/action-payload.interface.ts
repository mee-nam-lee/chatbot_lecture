/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

/**
 * The action payload type
 */
type ActionType = 'postback' | 'call' | 'url' | 'location';
export {ActionType};

const ACTION_TYPE = {
    POST_BACK: 'postback',
    CALL: 'call',
    URL: 'url',
    LOCATION: 'location'
};

/**
 * The action payload
 */
interface IActionPayload{
    /**
     * The action payload type
     */
    type: ActionType,
    /**
     * The label to display for the action.
     * At least one of label or imageUrl must be specified.
     */
    label?: string,
    /**
     * The image to display for the action.
     * At least one of label or imageUrl must be specified.
     */
    imageUrl?: string
}

export {IActionPayload, ACTION_TYPE};