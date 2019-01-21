/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import {IMessageFrom} from "./message-from";
import {IMessageTo, USER_MESSAGE_TYPE, UserMessageType} from "./message-to";
import {IBotMessage} from "./bot-message.interface";
import {IMessagePayload} from "./payloads/message-payload/message-payload.interface";
import {IUserMessage} from "./user-message.interface";

/**
 * Base interface for the messages
 */
interface IMessage{
    /**
     * The details of the message sender,
     * the property is required for the messages received by the widget
     */
    from?: IMessageFrom,
    /**
     * The details of the message recipient,
     * the property is required for the messages sent to the bot
     */
    to?: IMessageTo
}

export {IMessage}


/**
 * creates the user message from payload
 */
export const createUserMessage = (payload: IMessagePayload, channel: string): IUserMessage => {
  return {
    to:{
      type: USER_MESSAGE_TYPE.BOT as UserMessageType,
      id: channel
    },
    messagePayload: payload
  };
};

/**
 * creates the bot message from payload
 */
export const createBotMessage = (from: IMessageFrom, payload: IMessagePayload): IBotMessage => {
  return {
    from: from,
    body: {messagePayload: payload}
  };
};
