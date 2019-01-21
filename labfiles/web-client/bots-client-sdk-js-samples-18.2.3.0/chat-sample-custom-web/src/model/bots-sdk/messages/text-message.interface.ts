/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import {IBotsSDKMessage} from "./message.interface";
import {IBotsSDKMessageAction} from "./actions/action.interface";

/**
 *  A text type message is a message that is sent with text and/or actions.
 */
interface IBotsSDKTextMessage extends IBotsSDKMessage {
    /**
     * The text content of the message. Optional only if actions are provided.
     */
    text: string,
    /**
     * Array of action buttons.
     */
    actions?: IBotsSDKMessageAction[],
}

export {IBotsSDKTextMessage};