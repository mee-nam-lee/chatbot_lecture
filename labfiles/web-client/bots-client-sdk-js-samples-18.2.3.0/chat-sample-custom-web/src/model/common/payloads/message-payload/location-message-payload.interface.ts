/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IMessagePayload} from "./message-payload.interface";
import {ILocationPayload} from "../location-payload.interface";
import {IActionPayload} from "../action-payload/action-payload.interface";

/**
 * The location message payload
 */
interface ILocationMessagePayload extends IMessagePayload{
    /**
     * The location.
     */
    location: ILocationPayload,
    /**
     * A list of actions related to the text.
     */
    actions?: IActionPayload[],
    /**
     * A list of global actions to be rendered.
     * How they are rendered is channel-specific.
     * For example, in Facebook they will be rendered as reply_options.
     */
    globalActions?: IActionPayload[]
}

export {ILocationMessagePayload};