/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IMessagePayload} from "./message-payload.interface";
import {ICardPayload} from "../card-payload.interface";

/**
 * The card message layout
 */
type Layout = 'horizontal' | 'vertical';
const LAYOUT = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
};
export {Layout, LAYOUT};

/**
 * It represents a set of choices displayed to the user, either horizontally (like a carousel) or vertically (like a list).
 */
interface ICardMessagePayload extends IMessagePayload{
    /**
     * Whether to display the cards horizontally or vertically.
     */
    layout: Layout,
    /**
     * The list of cards to be rendered.
     */
    cards: ICardPayload[],
}

export {ICardMessagePayload};
