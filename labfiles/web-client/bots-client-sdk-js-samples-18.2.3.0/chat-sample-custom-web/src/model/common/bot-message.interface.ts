/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */


import {IMessagePayload} from "./payloads/message-payload/message-payload.interface";
import {IMessage} from "./message";

/**
 * The message that was received from the bot
 */
interface IBotMessage extends IMessage {
    /**
     * The message's body, as received from the Bots server.
     */
    body: {
        /**
         * The WebSocket userId
         */
        userId?: string,
        /**
         * Message payload for version of body 1.1
         */
        messagePayload?: IMessagePayload,
        /**
         * Backward comparability with version 1.0
         */
        text?: string,
        /**
         * Backward comparability with version 1.0
         */
        choices?: string[]
    },

    /**
     * If an error is present, "from.type" must be "system".
     */
    error?:{
        /**
         * A numeric code that uniquely identifies the particular type of error.
         */
        code: number,
        /**
         * A textual description of the error.
         */
        message: string
    }
}

export {IBotMessage};
