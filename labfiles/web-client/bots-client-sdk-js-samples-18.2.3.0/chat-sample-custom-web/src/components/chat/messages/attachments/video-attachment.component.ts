/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {AttachmentComponent} from "./attachment.component";
import {IComponent} from "../../../../model/component.interface";
import {IAttachmentPayload} from "../../../../model/common/payloads/attachment-payload.interface";
import {Utils} from "../../../../core/utils";
import {ISettings} from "../../../../core/settings";

/**
 *
 */
class VideoAttachmentComponent extends AttachmentComponent implements IComponent{
    url: string;
    constructor(private utils: Utils, private settings: ISettings, payload: IAttachmentPayload){
        super(payload);
        this.url = payload.url;
    }

    /**
     * Renders dom from component object
     <video class="attachment-video">
        Your browser does not support embedded video. However you can <a href="url">download it</a>.
     </video>
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        let element = this.utils.createVideo(this.url, 'attachment-video', this.settings.autoplayVideo);
        element.controls = true;
        element.innerHTML = 'Your browser does not support embedded video. However you can <a href="' + this.url + '">download it</a>.';
        return element;
    }
}

export {VideoAttachmentComponent};