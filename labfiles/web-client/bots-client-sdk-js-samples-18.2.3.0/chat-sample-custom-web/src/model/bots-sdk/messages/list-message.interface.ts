/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

import {IBotsSDKMessage} from "./message.interface";
import {IBotsSDKMessageAction} from "./actions/action.interface";

/**
 * Message Items
 */
interface IBotsSDKItem{
    /**
     * The image URL to be shown in the carousel/list item.
     */
    mediaUrl?: string,
    /**
     * The text description, or subtitle.
     */
    description?: string,
    /**
     * The title of the carousel item.
     */
    title: string,
    /**
     * If a mediaUrl was specified, the media type is defined here, for example image/jpeg. If mediaType is not specified, the media type will be resolved with the mediaUrl.
     */
    mediaType: string,
    /**
     * Array of action buttons. At least 1 is required, a maximum of 3 are allowed. link and postback and share actions are supported.
     */
    actions: IBotsSDKMessageAction[],
    /**
     * The size of the image to be shown in the carousel/list item
     */
    size: 'compact' | 'large'
}
export {IBotsSDKItem};

/**
 * List messages are a vertically scrollable set of items that may each contain text, an image, and action buttons.
 */
interface IBotsSDKListMessage extends IBotsSDKMessage{
    /**
     * Array of message items. The array is limited to 10 items.
     */
    items: IBotsSDKItem[]
    /**
     * Array of action buttons.
     */
    actions?: IBotsSDKMessageAction[],
}

export {IBotsSDKListMessage}