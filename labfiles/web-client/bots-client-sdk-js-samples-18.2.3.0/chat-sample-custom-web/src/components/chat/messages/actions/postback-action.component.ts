/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {Utils} from "../../../../core/utils";
import {ActionComponent} from "./action.component";
import {IPostbackActionPayload} from "../../../../model/common/payloads/action-payload/postback-action-payload.interface";

/**
 *
 */
class PostbackActionComponent extends ActionComponent{
    postback: any;

    constructor(utils: Utils, payload: IPostbackActionPayload){
        super(utils, payload);
        this.postback = payload.postback;
    }

    render(): HTMLElement {
        let link = <HTMLAnchorElement>super.render();
        link.classList.add(this.utils.getCssClassWithPrefix('action-postback'));
        return link;
    }

    getEventPayload(){
        return Promise.resolve(this.postback);
    }
}

export {PostbackActionComponent};