/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IMessageComponent} from "./message-component.interface";
import {ActionType} from "./common/payloads/action-payload/action-payload.interface";

/**
 * The action event
 */
interface IActionEvent{
    /**
     * The type of the action
     */
    type: ActionType,
    /**
     * The label of the action
     */
    label: string,
    /**
     * The method return payload for the action
     * @return {Promise<any>}
     */
    getPayload: () => Promise<any>
}

/**
 * The message action event interface
 */
interface IMessageActionEvent extends IActionEvent{
    /**
     * The message component instance
     */
    messageComponent: IMessageComponent
}

export {IActionEvent, IMessageActionEvent};
