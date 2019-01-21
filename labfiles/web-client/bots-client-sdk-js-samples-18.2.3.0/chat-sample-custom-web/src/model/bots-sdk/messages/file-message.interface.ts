/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

import {IBotsSDKMessage} from "./message.interface";

/**
 * A file type message is a message that is sent with a file attachment.
 */
interface IBotsSDKFileMessage extends IBotsSDKMessage{
    /**
     * The text content of the message. Optional only if actions are provided.
     */
    text?: string,
    /**
     * The media type is defined here, for example application/pdf. If mediaType is not specified, the media type will be resolved with the mediaUrl.
     */
    mediaType?: string;
    /**
     * The URL of the file attachment.
     */
    mediaUrl: string;
}

export {IBotsSDKFileMessage}