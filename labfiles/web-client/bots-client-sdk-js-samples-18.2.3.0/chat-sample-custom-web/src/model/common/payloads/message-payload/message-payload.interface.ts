/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IActionPayload} from "../action-payload/action-payload.interface";

/**
 * The message payload type
 */
type PayloadType = 'text' | 'card' | 'attachment' | 'location' | 'raw' | 'postback';
const PAYLOAD_TYPE = {
    TEXT: 'text',
    CARD: 'card',
    ATTACHMENT: 'attachment',
    LOCATION: 'location',
    RAW: 'raw',
    POSTBACK: 'postback'
};
export {PayloadType, PAYLOAD_TYPE};

/**
 * The message payload
 */
interface IMessagePayload{
    /**
     * The payload type
     */
    type: PayloadType
    /**
     * A list of actions related to the attachment.
     */
    actions?: IActionPayload[],// TODO: remove this property for card-message-payload
    /**
     * A list of global actions to be rendered.
     * How they are rendered is channel-specific.
     * For example, in Facebook they will be rendered as reply_options.
     */
    globalActions?: IActionPayload[]
}

export {IMessagePayload};