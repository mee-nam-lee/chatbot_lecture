/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {ActionComponent} from "./action.component";
import {ICallActionPayload} from "../../../../model/common/payloads/action-payload/call-action-payload.interface";
import {Utils} from "../../../../core/utils";

/**
 *
 */
class CallActionComponent extends ActionComponent{

    phoneNumber: string;

    constructor(utils: Utils, payload: ICallActionPayload){
        super(utils, payload);
        this.phoneNumber = payload.phoneNumber;
    }

    render(): HTMLElement {
        let link = <HTMLAnchorElement>super.render();
        link.classList.add(this.utils.getCssClassWithPrefix('action-call'));
        link.href = 'tel:' + this.phoneNumber;
        return link;
    }

    getEventPayload() {
        return Promise.resolve(this.phoneNumber);
    }
}

export {CallActionComponent};