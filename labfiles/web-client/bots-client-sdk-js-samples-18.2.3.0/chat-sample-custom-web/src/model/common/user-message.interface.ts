/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */



import {IMessagePayload} from "./payloads/message-payload/message-payload.interface";
import {IMessage} from "./message";

interface UserProfile {
    givenName: string,
    surname: string,
    age: number,
    email: string,
    properties: Object
}

/**
 * This represents a message sent from User → Bot.
 * Type	should be "user"
 */
interface IUserMessage extends IMessage {
    /**
     * Optional, but must match the WebSocket userId
     */
    userId?: string,

    /**
     * The raw channel-specific JSON payload.
     */
    messagePayload: IMessagePayload,

    /**
     * User profile info
     */
    userProfile?: UserProfile
}


export {IUserMessage, UserProfile};