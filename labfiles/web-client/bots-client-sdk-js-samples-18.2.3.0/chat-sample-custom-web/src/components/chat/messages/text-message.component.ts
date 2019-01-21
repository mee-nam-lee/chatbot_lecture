/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {MessageComponent, MessageSide} from "./message/message.component";
import {IMessageComponent} from "../../../model/message-component.interface";
import {ITextMessagePayload} from "../../../model/common/payloads/message-payload/text-message-payload.interface";
import {Utils} from "../../../core/utils";
import {ISettings} from "../../../core/settings";

/**
 *
 */
class TextMessageComponent extends MessageComponent implements IMessageComponent{

    text: string;

    constructor(utils: Utils, settings: ISettings, payload: ITextMessagePayload, side: MessageSide){
        super(utils, settings, payload, side );
        this.text = payload.text;
    }

    getContent(): HTMLElement {
        let span = this.utils.createSpan();
        span.innerHTML = this.utils.linkify(this.text, this.settings.embeddedVideo);
        return span;
    }

}

export {TextMessageComponent};