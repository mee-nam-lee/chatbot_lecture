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
class AudioAttachmentComponent extends AttachmentComponent implements IComponent{
    url: string;
    constructor(private utils: Utils, private settings: ISettings, payload: IAttachmentPayload){
        super(payload);
        this.url = payload.url;
    }

    /**
     * Renders dom from component object
     <audio class="attachment-audio">
        Your browser does not support embedded audio. However you can <a href="url">download it</a>.
     </audio>
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        let audio = this.utils.createAudio(this.url, 'attachment-audio', this.settings.autoplayAudio);
        audio.controls = true;
        audio.innerHTML = 'Your browser does not support embedded audio. However you can <a href="' + this.url + '">download it</a>.';
        return audio;
    }
}

export {AudioAttachmentComponent};