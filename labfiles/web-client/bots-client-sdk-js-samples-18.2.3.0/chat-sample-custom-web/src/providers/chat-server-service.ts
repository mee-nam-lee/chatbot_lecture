/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {ITextMessagePayload} from "../model/common/payloads/message-payload/text-message-payload.interface";
import {PAYLOAD_TYPE, PayloadType} from "../model/common/payloads/message-payload/message-payload.interface";
import {IPostbackActionPayload} from "../model/common/payloads/action-payload/postback-action-payload.interface";
import {IBotMessage} from "../model/common/bot-message.interface";
import {IUserMessage} from "../model/common/user-message.interface";
import {createBotMessage, createUserMessage, IMessage} from "../model/common/message";
import {IBotsService} from "./bots-service";
import {ReconnectingWebSocket} from "./web-socket/reconnecting-web-socket";
import {Logger} from "../core/logger";
import {ISettings} from "../core/settings";

/**
 * The service connect the widget with Chat Server by utilizing the ReconnectingWebSocket object.
 */
export class ChatServerService implements IBotsService{

    private _ws: ReconnectingWebSocket;
    private _logger = new Logger('ChatServerService');
    private _uri: string;

    /**
     * The method called when message received by the service
     * @param {IMessage} message
     */
    onMessage = (message: IMessage): void => {};

    constructor(private config: ISettings) {
        this._uri = this.config.uri + '?user=' + this.config.userId;
    }

    /**
     * Initialize the service
     * @return {Promise<any>}
     */
    init(): Promise<any> {
        return new Promise((resolve) => {
            this._ws = new ReconnectingWebSocket(this.config.webSocketReconnectInterval, this.config.webSocketTimeoutInterval, this._uri);
            this._ws.onopen = () => {
                resolve();
                this._logger.debug('ws.Open');
            };
            this._ws.onmessage = this.wsMessage.bind(this);
            this._ws.onclose = () => this._logger.debug('ws.Close');
            this._ws.onerror = event => this._logger.error("the socket had an error", event);
        });
    }

    /**
     * The method loads chat history
     * @return {Promise<IMessage[]>}
     */
    loadChat(): Promise<IMessage[]>{
        return Promise.resolve([]);
    }

    /**
     * Send the message to the Chat Server
     * @param {IUserMessage} message
     */
    send(message: IUserMessage): void {
        this._logger.debug('send message to chat server', message);
        if(this._ws.readyState === this._ws.OPEN){
            this._ws.send(JSON.stringify(message));
            if(message.messagePayload.type === PAYLOAD_TYPE.POSTBACK) {
                let userMessage = createUserMessage({
                    type: PAYLOAD_TYPE.TEXT as PayloadType,
                    text: (<ITextMessagePayload>message.messagePayload).text,
                } as ITextMessagePayload, this.config.channel);
                this.onMessage(userMessage);
            } else {
                this.onMessage(message);
            }
       } else {
            console.error('Can\'t send message, websoket not ready', message, this._ws.readyState);
        }
    }

    /**
     * Process message received from Chat Server
     * @param {MessageEvent} event
     */
    private wsMessage(event: MessageEvent): void{
        this._logger.debug('msg received: ', event.data);
        let msg: IBotMessage = JSON.parse(event.data);
        if(msg.error) {
            // Convert error message to common model text message
            msg = createBotMessage(msg.from, {
                type: PAYLOAD_TYPE.TEXT as PayloadType,
                text: 'Error: ' + msg.error.code + ' ' + msg.error.message
            } as ITextMessagePayload);
        } else if(msg.body && (msg.body.text || msg.body.choices)){
            // backward comparability with version 1.0
            // convert message from version 1.1 to common model
            let newMsg = createBotMessage(msg.from, {
                        type: PAYLOAD_TYPE.TEXT as PayloadType,
                        text: msg.body.text,
                        actions: []
                    } as ITextMessagePayload);
            if(msg.body.choices){
                for(let item of msg.body.choices){
                    newMsg.body.messagePayload.actions.push({
                        type: 'postback',
                        label: item,
                        postback: item
                    } as IPostbackActionPayload);
                }
            }
            msg = newMsg;
        } else if(msg.from && msg.to){
            // the message received from the person from another chat
            delete msg.from;
        }
        this.onMessage(msg);
    }
}
