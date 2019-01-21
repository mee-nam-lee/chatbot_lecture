/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IComponent} from "../../../../model/component.interface";
import {IActionEvent} from "../../../../model/action-event.interface";
import {
    ActionType,
    IActionPayload
} from "../../../../model/common/payloads/action-payload/action-payload.interface";
import {Utils} from "../../../../core/utils";

/**
 *
 */
abstract class ActionComponent implements IComponent{
    onActionClick: (event: IActionEvent) => void;
    type: ActionType;
    label: string;
    imageUrl: string;

    disabled: boolean = false;
    htmlElement: HTMLElement;

    constructor(protected utils: Utils, payload: IActionPayload){
        this.type = payload.type;
        this.label = payload.label;
        this.imageUrl = payload.imageUrl;
    }

    render(): HTMLElement {
        this.htmlElement = this.utils.createAnchor();
        this.htmlElement.onclick = this.handleOnClick.bind(this);
        if(this.label){
            this.htmlElement.innerText = this.label;
        } else {
            let img = this.utils.createImage(this.imageUrl);
            this.htmlElement.appendChild(img);
        }
        return this.htmlElement;
    }

    handleOnClick(event: MouseEvent){
        if(this.onActionClick && !this.disabled) {
            let event: IActionEvent = {
                type: this.type,
                getPayload: this.getEventPayload.bind(this),
                label: this.label
            };
            this.onActionClick(event);
        }
    }

    abstract getEventPayload(): Promise<any>;

    disable(){
        this.disabled = true;
        this.htmlElement.classList.add(this.utils.getCssClassWithPrefix('disabled'));
    }
}


export {ActionComponent};