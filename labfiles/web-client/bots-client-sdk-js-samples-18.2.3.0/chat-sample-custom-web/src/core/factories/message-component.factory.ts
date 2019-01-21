/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import {Utils} from "../utils";
import {IMessage} from "../../model/common/message";
import {MESSAGE_SIDE, MessageComponent, MessageSide} from "../../components/chat/messages/message/message.component";
import {IMessagePayload, PAYLOAD_TYPE} from "../../model/common/payloads/message-payload/message-payload.interface";
import {IBotMessage} from "../../model/common/bot-message.interface";
import {IUserMessage} from "../../model/common/user-message.interface";
import {ITextMessagePayload} from "../../model/common/payloads/message-payload/text-message-payload.interface";
import {TextMessageComponent} from "../../components/chat/messages/text-message.component";
import {IAttachmentMessagePayload} from "../../model/common/payloads/message-payload/attachment-message-payload.interface";
import {AttachmentMessageComponent} from "../../components/chat/messages/attachment-message.component";
import {ICardMessagePayload} from "../../model/common/payloads/message-payload/card-message-payload.interface";
import {CardMessageComponent} from "../../components/chat/messages/card-message/card-message.component";
import {ILocationMessagePayload} from "../../model/common/payloads/message-payload/location-message-payload.interface";
import {LocationMessageComponent} from "../../components/chat/messages/location-message.component";
import {IRawMessagePayload} from "../../model/common/payloads/message-payload/raw-message-payload.interface";
import {RawMessageComponent} from "../../components/chat/messages/raw-message.component";
import {ISettings} from "../settings";

/**
 *
 */
class MessageComponentFactory {
    static fromMessage(utils:Utils, settings: ISettings, message: IMessage): MessageComponent{
        let side: MessageSide;
        let payload: IMessagePayload;
        if(message.from){
            side = MESSAGE_SIDE.LEFT as MessageSide;
            payload = (<IBotMessage>message).body.messagePayload;
        } else {
            side = MESSAGE_SIDE.RIGHT as MessageSide;
            payload = (<IUserMessage>message).messagePayload;
        }
        switch(payload.type){
            case PAYLOAD_TYPE.TEXT:
                return new TextMessageComponent(utils, settings, payload as ITextMessagePayload, side);
            case PAYLOAD_TYPE.ATTACHMENT:
                return new AttachmentMessageComponent(utils, settings, payload as IAttachmentMessagePayload, side);
            case PAYLOAD_TYPE.CARD:
                return new CardMessageComponent(utils, settings, payload as ICardMessagePayload, side);
            case PAYLOAD_TYPE.LOCATION:
                return new LocationMessageComponent(utils, settings, payload as ILocationMessagePayload, side);
            case PAYLOAD_TYPE.RAW:
                return new RawMessageComponent(utils, settings, payload as IRawMessagePayload, side);
            default:
                throw Error('Wrong message payload type:' + payload.type, );
        }
    }
}

export {MessageComponentFactory};