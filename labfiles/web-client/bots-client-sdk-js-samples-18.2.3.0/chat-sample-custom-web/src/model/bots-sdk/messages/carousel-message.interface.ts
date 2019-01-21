/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

import {IBotsSDKItem} from "./list-message.interface";
import {IBotsSDKMessage} from "./message.interface";

/**
 * Carousel messages are a horizontally scrollable set of items that may each contain text, an image, and action buttons.
 */
interface IBotsSDKCarouselMessage extends IBotsSDKMessage{
    /**
     * Array of message items. The array is limited to 10 items.
     * @required
     */
    items?: IBotsSDKItem[],
    /**
     * Settings to adjust the carousel layout.
     */
    displaySettings?: {
        imageAspectRatio: 'horizontal' | 'square'
    }
}

export {IBotsSDKCarouselMessage}