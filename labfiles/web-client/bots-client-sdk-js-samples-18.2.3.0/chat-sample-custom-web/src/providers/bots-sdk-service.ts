/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {IBotsService} from "./bots-service";
import {Logger} from "../core/logger";
import {BotsSDKMessage} from "../model/bots-sdk/bots-sdk-message";
import {IUserMessage} from "../model/common/user-message.interface";
import {IBotsSDK} from "./bots-sdk";
import {IMessage} from "../model/common/message";
import {IBotsSDKMessage} from "../model/bots-sdk/messages/message.interface";
import {IMessagePayload, PAYLOAD_TYPE} from "../model/common/payloads/message-payload/message-payload.interface";
import {IPostbackMessagePayload} from "../model/common/payloads/message-payload/postback-message-payload.interface";
import {ISettings} from "../core/settings";

declare const Bots: IBotsSDK;

/**
 * The service connect the widget with Bots server by Bots SDK
 */
export class BotsSDKService implements IBotsService{
    private _logger = new Logger('BotsSDKService');

    /**
     * The method called when message received by the service
     * @param {IMessage} message
     */
    onMessage = (message: IMessage): void => {};

    constructor(private config: ISettings) {}

    /**
     * Initialize the service
     * @return {Promise<any>}
     */
    init(): Promise<any> {
      return this
        .loadSdk()
        .then(this.initSdk.bind(this));
    }

    initSdk(): Promise<any> {
      return new Promise((resolve, reject) => {
        let element = this.createHiddenDiv();
        Bots.on('message', (message: IBotsSDKMessage) => {
          this._logger.info('a message was added to the conversation', message);
          const msg = Object.assign(new BotsSDKMessage(), message);
          this.onMessage(msg.toCommonMessage());
        });
        Bots.init({appId: this.config.appId, embedded: true}).then(() => {
          this._logger.info('ready');
          this.updateUser({
              "givenName":"John", 
              "surname":"Snow", 
              "email": "john.snow@winterfell.com", 
              "properties": { 
                  "smoochCustomVariable1":"Lord", 
                  "smoochCustomVariable2":"Commander"
              }
          });
          resolve();
        }).catch(error => {
            reject(error);
        });
        Bots.render(element);
      });
    }

  /**
   * Add SDK script to the page header element
   * @return {Promise<any>}
   */
  loadSdk(): Promise<any> {
    let name = 'Bots';
    return new Promise((resolve, reject) => {
      let initProps, renderProps, destroyProps, onEventProps = [],callbacks = [];
      window[name] = {
        init: (...props) => {
          initProps = props;
          let promise = {
            then: (callback) => {
              callbacks.push({
                type: 'then',
                next: callback
              });
              return promise;
            },
            catch: (callback) => {
              callbacks.push({
                type: 'catch',
                next: callback
              });
              return promise;
            }
          };
          return promise
        },
        on: (...props) => onEventProps.push(props),
        render: (...props) => renderProps = props,
        destroy: (...props) => destroyProps = props
      };
      window['__onWebMessengerHostReady__'] = (bots) => {
        if (delete window['__onWebMessengerHostReady__'], window[name] = bots, initProps) {
          for (let promise = bots.init.apply(bots, initProps), i = 0; i < callbacks.length; i++) {
            let callback = callbacks[i];
            promise = 'then' === callback.type ? promise.then(callback.next) : promise.catch(callback.next)
          }
        }
        if(renderProps){
          bots.render.apply(bots, renderProps);
        }
        if(destroyProps){
          bots.destroy.apply(bots, destroyProps);
        }
        for (let i = 0; i < onEventProps.length; i++) {
          bots.on.apply(bots, onEventProps[i])
        }
      };
      const request = new XMLHttpRequest;
      request.addEventListener('load', function() {
        try {
          let response;
          if ((response = "string" == typeof this.response ? JSON.parse(this.response) : this.response).url) {
            let script:HTMLScriptElement = document.createElement('script');
            script.async = true;
            script.src = response.url;
            script.onload = () => resolve();
            document.getElementsByTagName('head')[0].appendChild(script);
          }
        } catch (error) {
          reject(error);
        }
      });
      request.open('GET', this.config.sdkUrl + '/loader.json', !0);
      request.responseType = 'json';
      request.send()
    });
  };

    /**
     * This method creates hidden div to put in the hidden Bots SDK chat.
     * @return {HTMLDivElement}
     */
    createHiddenDiv(): HTMLDivElement {
        let element: HTMLDivElement =  document.createElement('div');
        element.id = 'chat_widget_web_bots_sdk_ui';
        element.style.display = 'none';
        document.body.appendChild(element);
        return element;
    }

    /**
     * The method loads chat history
     * @return {Promise<IMessage[]>}
     */
    loadChat(): Promise<IMessage[]> {
        let conversation = Bots.getConversation();
        let messages:IMessage[] = [];
        for(let i = 0; i < conversation.messages.length; i++){
            let message = conversation.messages[i];
            let botsSDKMessage = Object.assign(new BotsSDKMessage(), message);
            let commonMessage = botsSDKMessage.toCommonMessage();
            if(commonMessage) {
                messages.push(commonMessage);
            }
            if(i === conversation.messages.length - 1 && conversation['replyActions']){
                let payload: IMessagePayload = commonMessage['messagePayload'] ? commonMessage['messagePayload'] : commonMessage['body'].messagePayload;
                payload.globalActions = botsSDKMessage.convertSDKBotActionsToCommon(conversation['replyActions']);
            }
        }

        return Promise.resolve(messages);
    }

    /**
     * Send the message to the Chat Server
     * @param {IUserMessage} message
     */
    send(message: IUserMessage): void {
        this._logger.debug('send to channel', message);
        // TODO: if the message is postback, send as postback
        if (message.messagePayload.type === PAYLOAD_TYPE.POSTBACK) {
            let postback = message.messagePayload as IPostbackMessagePayload;
            if (postback.postback.id) {
                this._logger.debug('triggerPostback for action', postback.postback.id);
                Bots.triggerPostback(postback.postback.id);
            } else {
                // TODO: try to send as text message
            }
        } else {
            Bots.sendMessage(BotsSDKMessage.fromCommonMessage(message));
        }
    }

    /**
     * Update the user details
     */
    updateUser(userDetails): Promise<any> {
      return Bots.updateUser(userDetails)
      .catch((err)=> {
          console.error(err);
          return err;
      });
    }
}
