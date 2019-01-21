/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {Component} from "../component";
import {Utils} from "../../core/utils";
import {LoadingComponent} from "../loading/loading.component";
import {Header} from "../shared/header";
import {MESSAGE_SIDE, MessageSide} from "./messages/message/message.component";
import {
    PAYLOAD_TYPE,
    PayloadType
} from "../../model/common/payloads/message-payload/message-payload.interface";
import {IMessageActionEvent} from "../../model/action-event.interface";
import {LoadingMessageComponent} from "./messages/loading-message/loading-message.component";
import {ACTION_TYPE} from "../../model/common/payloads/action-payload/action-payload.interface";
import {ITextMessagePayload} from "../../model/common/payloads/message-payload/text-message-payload.interface";
import {ILocationMessagePayload} from "../../model/common/payloads/message-payload/location-message-payload.interface";
import {ILocationPayload} from "../../model/common/payloads/location-payload.interface";
import {createUserMessage, IMessage} from "../../model/common/message";
import {MessageComponentFactory} from "../../core/factories/message-component.factory";
import {Logger} from "../../core/logger";
import {ChatFooterComponent} from "./chat-footer-input/footer-input.component";
import {Icon} from "../shared/icon";
import {IPostbackMessagePayload} from "../../model/common/payloads/message-payload/postback-message-payload.interface";
import {ChatActions} from "../../providers/chat-actions";
import {ISettings} from "../../core/settings";
import {IBotsService} from "../../providers/bots-service";


export class ChatComponent extends Component {

    private _logger = new Logger('ChatComponent');

    static MESSAGES_ID = 'ochat_widget_messages';

    MESSAGE_SIDE = MESSAGE_SIDE;

    message: string;
    input: HTMLInputElement;
    scrollContent: HTMLElement;

    chatActions: ChatActions;

    constructor(utils: Utils,
                private settings: ISettings,
                private dataService: IBotsService,
                private loadingComponent: LoadingComponent) {
        super(utils);

        this.element = this._createElement();

        // loadingComponent.present('Please wait ...');
        // load history messages
        dataService
            .loadChat()
            .then(messages => {
                // free the main thread
                setTimeout(() => {
                    this.renderMessages(messages.slice());
                    this.scrollToBottom();
                    // loadingComponent.dismiss();
                    dataService.onMessage = this.onMessageReceived.bind(this);
                });
            });
        this.chatActions = new ChatActions(this.onMessageReceived.bind(this));
    }

    /**
     * Inherit form Component
     * @return {HTMLElement}
     */
    protected _createElement(): HTMLElement {
        const chat = this.utils.createDiv(['chat']);
        this.scrollContent = this.utils.createDiv(['scroll-content']);
        this.scrollContent.id = ChatComponent.MESSAGES_ID;
        chat.appendChild(this.scrollContent);

        const footer = new ChatFooterComponent(this.utils, this.sendMessage.bind(this), this.settings.sendIcon, this.settings.chatInputPlaceholder);
        footer.appendToElement(chat);

        let icon = this.settings.logoIcon ? new Icon(this.utils, this.settings.botIcon, 'avatar') : null;

        const header = new Header(this.utils, this.settings.chatTitle, this.settings.chatSubTitle, 'chat-title', null, icon);
        header.prependToElement(chat);
        return chat;
    }

    render(element): void {}

    remove() {
        super.remove();
        this.dataService.onMessage = () => {};
    }

    renderMessages(messages: IMessage[]) {
        for (let message of messages) {
            let messageComponent = MessageComponentFactory.fromMessage(this.utils, this.settings, message);
            messageComponent.onActionClick = this.onMessageActionClicked.bind(this);
            this.scrollContent.appendChild(messageComponent.render());
        }
    }

    onMessageActionClicked(event: IMessageActionEvent){
        event.messageComponent.disableActions();
        if(event.type === ACTION_TYPE.POST_BACK){
            event
                .getPayload()
                .then(payload => {
                    let message = createUserMessage(<IPostbackMessagePayload>{
                        type: PAYLOAD_TYPE.POSTBACK as PayloadType,
                        text: event.label,
                        postback: payload
                    }, this.settings.channel);
                    this.sendMessageToServer(message);
                });
        } else if(event.type === ACTION_TYPE.LOCATION){
            const messagesElement = document.getElementById(ChatComponent.MESSAGES_ID);
            let loading = new LoadingMessageComponent('Loading location', MESSAGE_SIDE.LEFT as MessageSide, this.utils);
            messagesElement.appendChild(loading.render());
            this.scrollToBottom();
            event
                .getPayload()
                .then(payload => {
                    loading.remove();
                    let message = createUserMessage(<ILocationMessagePayload>{
                        type: PAYLOAD_TYPE.LOCATION as PayloadType,
                        location: <ILocationPayload>{
                            title: event.label === '@Share Location' ? '@demo location' : undefined,
                            longitude: payload.longitude,
                            latitude: payload.latitude
                        }
                    }, this.settings.channel);
                    this.sendMessageToServer(message);
                });
        }
    }

    onMessageReceived(message: IMessage): void {
        this._logger.debug('onMessageReceived', message);
        this.renderMessages([message]);
        this.scrollToBottom();
    }

    sendMessage(text: string): void {
        let payload: ITextMessagePayload = {
            type: PAYLOAD_TYPE.TEXT as PayloadType,
            text: text
        };
        let message = createUserMessage(payload, this.settings.channel);
        this.sendMessageToServer(message);
    }

    sendMessageToServer(message){
        // Check if the message is chat action and application in debug mode
        if(!this.settings.isDebugMode || !this.chatActions.process(message)) {
            this.dataService.send(message);
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            let element = document.getElementById(ChatComponent.MESSAGES_ID);
            element.scrollTop = element.scrollHeight - 300;
        });
    }
}