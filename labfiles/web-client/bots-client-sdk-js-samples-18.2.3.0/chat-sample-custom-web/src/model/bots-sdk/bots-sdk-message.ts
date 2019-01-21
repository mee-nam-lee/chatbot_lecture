/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

import {IMessagePayload, PAYLOAD_TYPE, PayloadType} from "../common/payloads/message-payload/message-payload.interface";
import {ITextMessagePayload} from "../common/payloads/message-payload/text-message-payload.interface";
import {ICardPayload} from "../common/payloads/card-payload.interface";
import {ICardMessagePayload, LAYOUT, Layout} from "../common/payloads/message-payload/card-message-payload.interface";
import {ACTION_TYPE, ActionType, IActionPayload} from "../common/payloads/action-payload/action-payload.interface";
import {IPostbackActionPayload} from "../common/payloads/action-payload/postback-action-payload.interface";
import {IUserMessage} from "../common/user-message.interface";
import {IMessage} from "../common/message";
import {USER_MESSAGE_TYPE} from "../common/message-to";
import {IBotMessage} from "../common/bot-message.interface";
import {BOT_MESSAGE_TYPE, BotMessageType} from "../common/message-from";
import {ATTACHMENT_TYPE, AttachmentType, IAttachmentPayload} from "../common/payloads/attachment-payload.interface";
import {IAttachmentMessagePayload} from "../common/payloads/message-payload/attachment-message-payload.interface";
import {ILocationMessagePayload} from "../common/payloads/message-payload/location-message-payload.interface";
import {ILocationPayload} from "../common/payloads/location-payload.interface";
import {Logger} from "../../core/logger";
import {
    BOTS_SDK_MESSAGE_ROLE,
    BOTS_SDK_PAYLOAD_TYPE,
    BotsSDKMessageRoleType, BotsSDKMessageType, IBotsSDKMessage
} from "./messages/message.interface";
import {IBotsSDKItem} from "./messages/list-message.interface";
import {IUrlActionPayload} from "../common/payloads/action-payload/url-action-payload.interface";
import {BOTS_SDK_ACTION_TYPE, IBotsSDKMessageAction} from "./messages/actions/action.interface";
import {BotsSDKPostbackMessageAction} from "./messages/actions/postback-action.interface";
import {BotsSDKLinkMessageAction} from "./messages/actions/link-action.interface";
import {ILocationActionPayload} from "../common/payloads/action-payload/location-action-payload.interface";
import {BotsSDKReplyMessageAction} from "./messages/actions/reply-action.interface";
import {IBotsSDKTextMessage} from "./messages/text-message.interface";
import {IBotsSDKLocationMessage} from "./messages/location-message.interface";


/**
 * The bots sdk message
 */
export class BotsSDKMessage implements IBotsSDKMessage {
    private _logger = new Logger('BotsSDKMessage');

    text: string;
    type: BotsSDKMessageType;
    role?: BotsSDKMessageRoleType;
    actions?: IBotsSDKMessageAction[];
    // IBotsSDKListMessage, IBotsSDKCarouselMessage interface implementation
    items?: IBotsSDKItem[];
    // IBotsSDKFileMessage interface implementation
    mediaType?: string;
    // IBotsSDKImageMessage interface implementation
    mediaUrl?: string;
    // IBotsSDKLocationMessage interface implementation
    name?: string;
    coordinates?: { lat: number; long: number };

    /**
     * Convert bots sdk message to common model message
     * @return {IMessage}
     */
    toCommonMessage(): IMessage {
        let payload: IMessagePayload;
        switch(this.type){
            case BOTS_SDK_PAYLOAD_TYPE.TEXT:
                payload = <ITextMessagePayload> {
                    type: PAYLOAD_TYPE.TEXT as PayloadType,
                    text: this.text,
                    actions: this.convertSDKBotActionsToCommon(this.actions)
                };
                break;
            case BOTS_SDK_PAYLOAD_TYPE.LIST:
            case BOTS_SDK_PAYLOAD_TYPE.CAROUSEL:
                let cards: ICardPayload[] = [];
                for(let item of this.items){
                    cards.push({
                        title: item.title,
                        description: item.description,
                        imageUrl: item.mediaUrl,
                        actions: this.convertSDKBotActionsToCommon(item.actions)
                    });
                }
                payload = <ICardMessagePayload> {
                    type: PAYLOAD_TYPE.CARD as PayloadType,
                    layout: (this.type === BOTS_SDK_PAYLOAD_TYPE.LIST ? LAYOUT.VERTICAL : LAYOUT.HORIZONTAL) as Layout,
                    cards: cards,
                    globalActions: this.convertSDKBotActionsToCommon(this.actions)
                };
                break;
            case BOTS_SDK_PAYLOAD_TYPE.LOCATION:
                payload = {
                    type: PAYLOAD_TYPE.LOCATION as PayloadType,
                    location: {
                        title: this.text,
                        longitude: this.coordinates.long,
                        latitude: this.coordinates.lat
                    } as ILocationPayload,
                    actions: this.convertSDKBotActionsToCommon(this.actions)
                } as ILocationMessagePayload;
                break;
            case BOTS_SDK_PAYLOAD_TYPE.IMAGE:
                payload = {
                    type: PAYLOAD_TYPE.ATTACHMENT as PayloadType,
                    attachment: {
                        type: ATTACHMENT_TYPE.IMAGE as AttachmentType,
                        url: this.mediaUrl
                        // TODO: add this.text as caption
                    } as IAttachmentPayload,
                    actions: this.convertSDKBotActionsToCommon(this.actions)
                } as IAttachmentMessagePayload;
                break;
            case BOTS_SDK_PAYLOAD_TYPE.FILE:
                let attachmentType = ATTACHMENT_TYPE.FILE;
                if(['video/quicktime'].indexOf(this.mediaType) > -1){
                    attachmentType = ATTACHMENT_TYPE.VIDEO as AttachmentType;
                } else if(['audio/mpeg'].indexOf(this.mediaType) > -1){
                    attachmentType = ATTACHMENT_TYPE.AUDIO as AttachmentType;
                }
                payload = {
                    type: PAYLOAD_TYPE.ATTACHMENT as PayloadType,
                    attachment: {
                        type: attachmentType,
                        url: this.mediaUrl
                        // TODO: add this.text as caption
                    } as IAttachmentPayload,
                    actions: this.convertSDKBotActionsToCommon(this.actions)
                } as IAttachmentMessagePayload;
                break;
            default:
                this._logger.error('This Bots SDK message type is not implemented. ', this);
                break;

        }
        this._logger.debug('toCommonMessage', this, payload);
        if(this.role === BOTS_SDK_MESSAGE_ROLE.APP_USER){
            return <IUserMessage>{
                to: {
                    type: USER_MESSAGE_TYPE.USER,
                    id: ''
                },
                messagePayload: payload,
            };
        } else {
            return <IBotMessage>{
                from: {
                    type: BOT_MESSAGE_TYPE.BOT as BotMessageType
                },
                body: {
                    messagePayload: payload,
                }
            };
        }
    }

    /**
     * Convert the common model message to bots sdk message
     * @param {IUserMessage} message
     * @return {BotsSDKMessage}
     */
    static fromCommonMessage(message: IUserMessage): BotsSDKMessage {
        let botsSDKMessage: IBotsSDKMessage;
        let payload = message.messagePayload;
        switch(payload.type){
            case PAYLOAD_TYPE.TEXT:
                let txtPayload = payload as ITextMessagePayload;
                botsSDKMessage = {
                    type: BOTS_SDK_PAYLOAD_TYPE.TEXT as BotsSDKMessageType,
                    text: txtPayload.text
                } as IBotsSDKTextMessage;
                break;
            case PAYLOAD_TYPE.LOCATION:
                let locationPayload = payload as ILocationMessagePayload;
                botsSDKMessage = {
                    type: BOTS_SDK_PAYLOAD_TYPE.LOCATION as BotsSDKMessageType,
                    coordinates: {
                        long: locationPayload.location.longitude,
                        lat: locationPayload.location.latitude
                    }
                } as IBotsSDKLocationMessage;
                break;
        }
        return Object.assign(new BotsSDKMessage(), botsSDKMessage);
    }

    /**
     * Converts the bots sdk action to common message action
     * @param {IBotsSDKMessageAction[]} sdkActions
     * @return {IActionPayload[]}
     */
    convertSDKBotActionsToCommon(sdkActions: IBotsSDKMessageAction[]): IActionPayload[]{
        let actions: IActionPayload[] = [];
        if(sdkActions) {
            for (let sdkAction of sdkActions) {
                let action: IActionPayload;
                switch (sdkAction.type) {
                    case BOTS_SDK_ACTION_TYPE.POSTBACK:
                        let postbackAction = sdkAction as BotsSDKPostbackMessageAction;
                        action = <IPostbackActionPayload>{
                            type: ACTION_TYPE.POST_BACK as ActionType,
                            label: postbackAction.text,
                            postback: { payload: postbackAction.payload, id: postbackAction._id }
                        };
                        break;
                    case BOTS_SDK_ACTION_TYPE.LINK:
                        let linkAction = sdkAction as BotsSDKLinkMessageAction;
                        action = {
                            type: ACTION_TYPE.URL as ActionType,
                            label: linkAction.text,
                            url: linkAction.uri
                        } as IUrlActionPayload;
                        break;
                    case BOTS_SDK_ACTION_TYPE.LOCATION_REQUEST:
                        action = {
                            type: ACTION_TYPE.LOCATION as ActionType,
                            label: sdkAction.text,
                        } as ILocationActionPayload;
                        break;
                    case BOTS_SDK_ACTION_TYPE.REPLY:
                        let replyAction = sdkAction as BotsSDKReplyMessageAction;
                        action = <IPostbackActionPayload>{
                            type: ACTION_TYPE.POST_BACK as ActionType,
                            label: replyAction.text,
                            postback: { payload: replyAction.payload, id: replyAction._id }
                        };
                        break;
                    default:
                        this._logger.error('Not supported BOTS SDK action. ', sdkAction);
                        break;
                }
                if(action) {
                    actions.push(action);
                }
            }
        }
        return actions;
    }
}