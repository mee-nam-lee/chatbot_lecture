/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IActionPayload} from "./action-payload/action-payload.interface";

/**
 * A card represents a single card in the message payload.
 */
interface ICardPayload{
    /**
     * The title of the card, displayed as the first line on the card.
     */
    title: string,
    /**
     * The description of the card, displayed as second line on the card.
     */
    description?: string,
    /**
     * URL of the image that is displayed under the description.
     */
    imageUrl?: string,
    /**
     * URL of a website that is displayed as a hyperlink on the card that is opened when taping on the card.
     */
    url?: string,
    /**
     * A list of actions to be rendered for this card.
     */
    actions?: IActionPayload[]
}

export {ICardPayload};