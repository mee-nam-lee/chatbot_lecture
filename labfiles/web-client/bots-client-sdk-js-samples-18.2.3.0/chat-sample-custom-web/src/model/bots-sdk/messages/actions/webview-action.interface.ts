/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

import {IBotsSDKMessageAction} from "./action.interface";

/**
 * When a webview actions is clicked/tapped, the provided URI will be loaded in a webview.
 */
interface BotsSDKWebviewMessageAction extends IBotsSDKMessageAction{
    /**
     * The webview URI. This is the URI that will open in the webview when clicking the button.
     */
    uri: string,
    /**
     * The webview fallback URI. This is the link that will be opened when not support webviews.
     */
    fallback: string,
    /**
     * Controls the webview height.
     */
    size?: 'compact' | 'tall' | 'full',
    /**
     * Extra options to pass directly to the channel API.
     */
    extraChannelOptions?: any
}

export {BotsSDKWebviewMessageAction};