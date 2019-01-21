/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */


import {IBotsSDKMessageAction} from "./action.interface";

/**
 * A link action will open the provided URI when tapped.
 */
interface BotsSDKLinkMessageAction extends IBotsSDKMessageAction{
    /**
     * The action URI. This is the link that will be used in the clients when clicking the button.
     */
    uri: string
    /**
     * Extra options to pass directly to the channel API.
     */
    extraChannelOptions?: any
}

export {BotsSDKLinkMessageAction};