/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {MessageComponent, MessageSide} from "./message/message.component";
import {IMessageComponent} from "../../../model/message-component.interface";
import {AttachmentComponent} from "./attachments/attachment.component";
import {IAttachmentMessagePayload} from "../../../model/common/payloads/message-payload/attachment-message-payload.interface";
import {Utils} from "../../../core/utils";
import {ATTACHMENT_TYPE, IAttachmentPayload} from "../../../model/common/payloads/attachment-payload.interface";
import {ImageAttachmentComponent} from "./attachments/image-attachment.component";
import {VideoAttachmentComponent} from "./attachments/video-attachment.component";
import {AudioAttachmentComponent} from "./attachments/audio-attachment.component";
import {FileAttachmentComponent} from "./attachments/file-attachment.component";
import {ISettings} from "../../../core/settings";

/**
 *
 */
class AttachmentMessageComponent extends MessageComponent implements IMessageComponent{
    attachment: AttachmentComponent;

    constructor(utils: Utils, settings: ISettings, private payload: IAttachmentMessagePayload, side: MessageSide){
        super(utils, settings, payload, side);
        this.attachment = AttachmentMessageComponent.fromPayload(utils, settings, payload.attachment);
    }

    /**
     * Renders dom from component object
     * @param {HTMLElement} [messageContent] - message content
     * @return {HTMLElement}
     */
    render(messageContent?: HTMLElement): HTMLElement{
        // let span = this.utils.createSpan();
        // span.innerText = this.attachment.title;

        let div = this.utils.createDiv();
//        div.appendChild(super.renderMessage(span));
        div.appendChild(super.render());

        return div;
    }

    getContent(): HTMLElement {
        return this.attachment.render();
    }

    static fromPayload(utils: Utils, settings: ISettings, payload: IAttachmentPayload) : AttachmentComponent{
    switch(payload.type) {
        case ATTACHMENT_TYPE.IMAGE:
            return new ImageAttachmentComponent(utils, payload);
        case ATTACHMENT_TYPE.VIDEO:
            return new VideoAttachmentComponent(utils, settings, payload);
        case ATTACHMENT_TYPE.AUDIO:
            return new AudioAttachmentComponent(utils, settings, payload);
        case ATTACHMENT_TYPE.FILE:
            return new FileAttachmentComponent(utils, payload);
        default:
            throw Error('Payload contains wrong attachment type');
    }
}

}

export {AttachmentMessageComponent};