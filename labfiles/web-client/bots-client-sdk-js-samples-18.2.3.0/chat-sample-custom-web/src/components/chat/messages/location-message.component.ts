/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */


import {MessageComponent, MessageSide} from "./message/message.component";
import {IMessageComponent} from "../../../model/message-component.interface";
import {ILocationMessagePayload} from "../../../model/common/payloads/message-payload/location-message-payload.interface";
import {UrlActionComponent} from "./actions/url-action.component";
import {ACTION_TYPE, ActionType} from "../../../model/common/payloads/action-payload/action-payload.interface";
import {IUrlActionPayload} from "../../../model/common/payloads/action-payload/url-action-payload.interface";
import {Utils} from "../../../core/utils";
import {ISettings} from "../../../core/settings";

/**
 *
 */
class LocationMessageComponent extends MessageComponent implements IMessageComponent{
    title?: string;
    url?: string;
    longitude: number;
    latitude: number;

    constructor(utils: Utils, settings: ISettings, payload: ILocationMessagePayload, side: MessageSide){
        super(utils, settings, payload, side);
        this.title = payload.location.title;
        this.url = payload.location.url;
        this.longitude = payload.location.longitude;
        this.latitude = payload.location.latitude;
    }

    /**
     * Renders dom from component object
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        if(this.actions.length === 0) {
            let payload: IUrlActionPayload = {
                type: ACTION_TYPE.URL as ActionType,
                label: 'Open Map',
                url: this.url || 'https://www.google.com/maps?z=12&t=m&q=loc:' + this.latitude + '+' + this.longitude
            };
            this.actions.push(new UrlActionComponent(this.utils, payload))
        }
        return super.render();
    }

    getContent(){
        let span = this.utils.createSpan();
        if(this.title) {
            span.innerText = this.title;
        }
        return span;
    }
}

export {LocationMessageComponent};