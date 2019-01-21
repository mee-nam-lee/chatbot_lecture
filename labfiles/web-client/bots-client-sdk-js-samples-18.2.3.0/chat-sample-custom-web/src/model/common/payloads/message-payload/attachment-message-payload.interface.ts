/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IMessagePayload} from "./message-payload.interface";
import {IAttachmentPayload} from "../attachment-payload.interface";

/**
 * This represents the payload for an attachment.
 */
interface IAttachmentMessagePayload extends IMessagePayload{
    /**
     * The attachment to send.
     */
    attachment: IAttachmentPayload,
}

export {IAttachmentMessagePayload};