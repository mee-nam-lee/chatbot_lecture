/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import {Utils} from "../utils";
import {ACTION_TYPE, IActionPayload} from "../../model/common/payloads/action-payload/action-payload.interface";
import {ActionComponent} from "../../components/chat/messages/actions/action.component";
import {IPostbackActionPayload} from "../../model/common/payloads/action-payload/postback-action-payload.interface";
import {PostbackActionComponent} from "../../components/chat/messages/actions/postback-action.component";
import {ICallActionPayload} from "../../model/common/payloads/action-payload/call-action-payload.interface";
import {CallActionComponent} from "../../components/chat/messages/actions/call-action.component";
import {ILocationActionPayload} from "../../model/common/payloads/action-payload/location-action-payload.interface";
import {LocationActionComponent} from "../../components/chat/messages/actions/location-action.component";
import {IUrlActionPayload} from "../../model/common/payloads/action-payload/url-action-payload.interface";
import {UrlActionComponent} from "../../components/chat/messages/actions/url-action.component";
import {Logger} from "../logger";

/**
 *
 */
class ActionComponentFactory {
    static logger = new Logger('ActionComponentFactory');
    static fromActionPayload(utils: Utils, payload: IActionPayload): ActionComponent{
        switch(payload.type){
            case ACTION_TYPE.POST_BACK:
                return new PostbackActionComponent(utils, <IPostbackActionPayload>payload);
            case ACTION_TYPE.CALL:
                return new CallActionComponent(utils, <ICallActionPayload>payload);
            case ACTION_TYPE.LOCATION:
                return new LocationActionComponent(utils, <ILocationActionPayload>payload);
            case ACTION_TYPE.URL:
                return new UrlActionComponent(utils, <IUrlActionPayload>payload);
            default:
                ActionComponentFactory.logger.error('Payload contains wrong action type:' + payload.type);
                return null;
        }
    }
}

export {ActionComponentFactory};