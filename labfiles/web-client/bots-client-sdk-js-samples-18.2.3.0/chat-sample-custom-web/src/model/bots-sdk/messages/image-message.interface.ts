/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

import {IBotsSDKMessage} from "./message.interface";
import {IBotsSDKMessageAction} from "./actions/action.interface";

/**
 * An image type message is a message that is sent with an image, and, optionally, text and/or actions.
 */
interface IBotsSDKImageMessage extends IBotsSDKMessage {
    /**
     * The text content of the message. Optional only if actions are provided.
     */
    text?: string,
    /**
     * The media type is defined here, for example image/jpeg. If mediaType is not specified, the media type will be resolved with the mediaUrl.
     */
    mediaType?: string;
    /**
     * The image URL used for the image message.
     */
    mediaUrl: string;
    /**
     * Array of action buttons.
     */
    actions?: IBotsSDKMessageAction[]
}

export {IBotsSDKImageMessage}