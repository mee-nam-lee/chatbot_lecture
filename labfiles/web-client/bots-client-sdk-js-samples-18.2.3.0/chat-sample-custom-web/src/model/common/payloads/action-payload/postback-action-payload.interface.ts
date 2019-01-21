/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IActionPayload} from "./action-payload.interface";

/**
 * This action will send a pre-defined Postback back to the Bot if the user selects the action.
 */
interface IPostbackActionPayload extends IActionPayload{
    /**
     * The postback to be sent back if the action is selected
     */
    postback: any
}

export {IPostbackActionPayload};