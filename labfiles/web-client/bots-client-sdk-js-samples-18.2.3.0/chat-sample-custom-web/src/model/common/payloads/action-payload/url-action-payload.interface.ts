/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IActionPayload} from "./action-payload.interface";

/**
 * This action will request the underlying messaging service (eg. Facebook Messenger) to open a website in an in-app browser.
 */
interface IUrlActionPayload extends IActionPayload{
    /**
     * The url of the website to display.
     */
    url: string
}

export {IUrlActionPayload};