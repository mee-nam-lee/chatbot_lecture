/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {Utils} from "../../../../core/utils";
import {ActionComponent} from "./action.component";
import {IUrlActionPayload} from "../../../../model/common/payloads/action-payload/url-action-payload.interface";

/**
 *
 */
class UrlActionComponent extends ActionComponent{
    url: string;

    constructor(utils: Utils, payload: IUrlActionPayload){
        super(utils, payload);
        this.url = payload.url;
    }

    render(): HTMLElement {
        let link = <HTMLAnchorElement>super.render();
        link.classList.add(this.utils.getCssClassWithPrefix('action-url'));
        link.target = '_blank';
        link.href = this.url;
        return link;
    }

    getEventPayload(){
        return Promise.resolve(this.url);
    }
}

export {UrlActionComponent};