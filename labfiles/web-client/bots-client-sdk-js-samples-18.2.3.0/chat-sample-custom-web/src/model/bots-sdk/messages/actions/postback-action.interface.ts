/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */


import {IBotsSDKMessageAction} from "./action.interface";

/**
 * A postback action will post the action payload to the server when tapped.
 */
interface BotsSDKPostbackMessageAction extends IBotsSDKMessageAction{
    /**
     * A string payload to help you identify the action context. You can also use metadata for more complex needs.
     */
    payload: string
}

export {BotsSDKPostbackMessageAction};