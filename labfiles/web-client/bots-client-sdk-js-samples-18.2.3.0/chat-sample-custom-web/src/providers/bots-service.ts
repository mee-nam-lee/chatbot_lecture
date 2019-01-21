/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import {IUserMessage} from "../model/common/user-message.interface";
import {IMessage} from "../model/common/message";

/**
 * Bot service interface
 */
export interface IBotsService {
    /**
     * Initialize the service
     * @return {Promise<any>}
     */
    init(): Promise<any>;
    /**
     * The method loads chat history
     * @return {Promise<IMessage[]>}
     */
    loadChat(): Promise<IMessage[]>;
    /**
     * The method called when message received by the service
     * @param {IMessage} message
     */
    onMessage: (message: IMessage) => void;
    /**
     * Send the message to the Chat Server
     * @param {IUserMessage} message
     */
    send(message: IUserMessage): void;
}
