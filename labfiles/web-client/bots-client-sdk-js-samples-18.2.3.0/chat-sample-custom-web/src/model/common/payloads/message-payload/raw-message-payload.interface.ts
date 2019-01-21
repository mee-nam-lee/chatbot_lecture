/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IMessagePayload} from "./message-payload.interface";

/**
 * This is used when a component creates the channel-specific payload itself.
 */
interface IRawMessagePayload extends IMessagePayload{
    /**
     * The channel-specific payload to be sent.
     */
    payload: any,
}

export {IRawMessagePayload};