/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */


/**
 * The bots sdk action type
 */
type BotsSDKActionType = 'postback' | 'link' | 'webview' | 'reply' | 'locationRequest' | 'share';
const BOTS_SDK_ACTION_TYPE = {
    POSTBACK: 'postback',
    WEBVIEW: 'webview',
    REPLY: 'reply',
    LOCATION_REQUEST: 'locationRequest',
    SHARE: 'share',
    LINK: 'link'
};
export {BotsSDKActionType, BOTS_SDK_ACTION_TYPE};


/**
 * A link action will open the provided URI when tapped.
 */
interface IBotsSDKMessageAction{
    _id: string,
    /**
     * The button text.
     */
    text: string,
    /**
     * Type of the action
     */
    type: BotsSDKActionType,
    /**
     * Value indicating whether the action is the default action for a message item.
     */
    default: boolean,
    /**
     * Flat object containing any custom properties associated with the action.
     */
    metadata?: any,

}
export {IBotsSDKMessageAction};