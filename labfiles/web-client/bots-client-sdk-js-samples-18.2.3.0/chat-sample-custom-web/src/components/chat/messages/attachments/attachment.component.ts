/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IComponent} from "../../../../model/component.interface";
import {IAttachmentPayload} from "../../../../model/common/payloads/attachment-payload.interface";

/**
 *
 */
abstract class AttachmentComponent implements IComponent{
    title: string;

    constructor(payload: IAttachmentPayload){
        this.title = AttachmentComponent.capitalize(payload.type);
    }

    abstract render(): HTMLElement

    static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export {AttachmentComponent};