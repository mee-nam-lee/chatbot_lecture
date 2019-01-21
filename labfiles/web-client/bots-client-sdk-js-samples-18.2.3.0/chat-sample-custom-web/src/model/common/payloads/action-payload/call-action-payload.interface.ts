/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IActionPayload} from "./action-payload.interface";

/**
 * This action will request the underlying messaging service (eg. Facebook Messenger) to call a specified phone number on the user's behalf.
 */
interface ICallActionPayload extends IActionPayload{
    /**
     * The phone number to call
     */
    phoneNumber: string
}

export {ICallActionPayload};