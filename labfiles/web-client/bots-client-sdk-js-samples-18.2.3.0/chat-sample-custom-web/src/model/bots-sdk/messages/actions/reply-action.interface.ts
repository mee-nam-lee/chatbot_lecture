/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */


import {IBotsSDKMessageAction} from "./action.interface";

/**
 * A reply action will echo the user’s choice as a message.
 * You may optionally specify an iconUrl which will render as an icon for each option.
 */
interface BotsSDKReplyMessageAction extends IBotsSDKMessageAction{
    /**
     * A string payload to help you identify the action context. Used when posting the reply. You can also use metadata for more complex needs.
     */
    payload: string,
    /**
     * An icon to render next to the reply option
     */
    iconUrl?: string
}

export {BotsSDKReplyMessageAction};