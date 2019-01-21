/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {AttachmentComponent} from "./attachment.component";
import {IComponent} from "../../../../model/component.interface";
import {IAttachmentPayload} from "../../../../model/common/payloads/attachment-payload.interface";
import {Utils} from "../../../../core/utils";

/**
 *
 */
class FileAttachmentComponent extends AttachmentComponent implements IComponent{
    url: string;
    constructor(private utils: Utils, payload: IAttachmentPayload){
        super(payload);
        this.url = payload.url;
    }

    /**
     * Renders dom from component object
     <a class="attachment-file" href="url">url</a>
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        return this.utils.createAnchor(this.url, null, ['attachment-file']);
    }
}

export {FileAttachmentComponent};