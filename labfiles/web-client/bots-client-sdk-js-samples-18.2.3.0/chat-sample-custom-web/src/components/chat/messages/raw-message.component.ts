/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */



import {MessageComponent, MessageSide} from "./message/message.component";
import {IMessageComponent} from "../../../model/message-component.interface";
import {IRawMessagePayload} from "../../../model/common/payloads/message-payload/raw-message-payload.interface";
import {Utils} from "../../../core/utils";
import {ISettings} from "../../../core/settings";

/**
 *
 */
class RawMessageComponent extends MessageComponent implements IMessageComponent{

    payload: string;

    constructor(utils: Utils, settings: ISettings, payload: IRawMessagePayload, side: MessageSide){
        super(utils, settings, payload, side);
        this.payload = JSON.stringify(payload.payload);
    }

    getContent(){
        let span = this.utils.createSpan();
        span.innerText = this.payload;
        return span;
    }
}

export {RawMessageComponent};