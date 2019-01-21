/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

/**
 *
 */
type ModeType = 'chatServer' | 'botsSDK';
const MODE = {
  CHAT_SERVER: 'chatServer',
  BOTS_SDK: 'botsSDK'
};
export {ModeType, MODE};

/**
 *
 */
export interface ISettings {
    /**
     * replace by grunt with data from package.json
     */
    version: string;
    /**
     * replace by grunt with data from package.json
     */
    name: string;

    /**
     * The Bots Instance connection mode.
     */
    mode: ModeType,

    // Bots SDK mode
    /**
     * Application Id for BOT SDK in BOT SDK mode
     */
    appId?: string;
    /**
     * The url to the hosted sdk
     */
    sdkUrl?: string;

    // Chat Server mode
    /**
     * Chat server url for Chat Server Mode
     */
    uri?: string;
    /**
     * Channel identifier last GUID from WebHook URL for Chat Server Mode
     */
    channel?: string;
    /**
     * Unique user identifier
     */
    userId?: string;

    /**
     * Enable debug mode
     */
    isDebugMode: boolean;
    /**
     * Reconnect web socket's time to wait before attempting reconnect (after close)
     */
    webSocketReconnectInterval: number;
    /**
     * Reconnect web sockets's time to wait for WebSocket to open (before aborting and retrying)
     */
    webSocketTimeoutInterval: number;

    autoplayVideo: boolean;
    autoplayAudio: boolean;

        /**
     * Base64 or url to image for robot
     */
    botIcon: string;
    /**
     * Base64 or url to image for person
     */
    personIcon: string;
    /**
     * Base64 or url to image for chat logo
     */
    logoIcon: string;
    /**
     * Base64 or url to image for send button
     */
    sendIcon: string;
    /**
     * Base64 or url to image for open button
     */
    openIcon: string;

    /**
     * Text for chat title
     */
    chatTitle: string;
    /**
     * Text for chat subtitle
     */
    chatSubTitle: string;
    /**
     * Text for chat input placeholder
     */
    chatInputPlaceholder: string;

    position: any;
    useCustomStyle: boolean;
    /**
     * Convert links to youtube that in text to embedded video.
     */
    embeddedVideo: boolean;
    isOpen: boolean;
    embedded: boolean;

}

/**
 *
 */
export const defaultSettings = {
    version: '{version}',// replace by grunt with data from package.json
    name: '{name}',// replace by grunt with data from package.json

    mode: MODE.BOTS_SDK as ModeType,

    isDebugMode: false,
    webSocketReconnectInterval: 1000,
    webSocketTimeoutInterval: 5000,
    autoplayVideo: false,
    autoplayAudio: false,

    chatTitle: 'Oracle Bots Chat Widget',
    chatSubTitle: 'How can we help?',
    chatInputPlaceholder: 'Type a message...',
    position: {
        bottom: '20px',
        right: '20px'
    },
    useCustomStyle: false,
    embeddedVideo: true,
    isOpen: false,
    embedded: false,
    openIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192"><path d="M153.1 147.48c-2.79 27.994 13.49 37.514 13.49 37.514-30.568-6.085-50.807-19.514-63.567-31.78a112.546 112.546 0 0 1-27.155-4.808 114.556 114.556 0 0 0 24.5-17.873c42.36-2.333 75.68-26.757 75.68-56.547a40.177 40.177 0 0 0-2.09-12.756C185.246 70.94 192 83.26 192 96.668c0 21.032-14.23 41.015-38.9 50.813zm-63.76-24.215c-12.76 12.265-33 25.694-63.568 31.78 0 0 20.785-8.1 17.532-39.14-23.285-9.248-41.55-26.12-43.29-45.668-.1-1.164.344-2.337.344-3.518 0-31.333 36.864-59.714 82.333-59.714s80.834 28.38 80.834 59.713c0 29.786-31.824 54.213-74.185 56.545zM83.05 18.93c-38.6 0-69.9 22.06-69.9 48.663q0 1.5.133 2.987C14.757 87.18 28.82 99.152 48.588 107c9.066 20.435.427 31 .427 31 16.424-7.835 34.312-22.24 39.68-25.024 35.967-1.98 62.76-20.1 62.76-45.39 0-26.595-29.8-48.657-68.404-48.657z" fill="#454545" id="svg_407"/></svg>',
    sendIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38"><g transform="rotate(-180 19,19) "><g><svg width="19" height="38" viewBox="0 0 19 38" id="svg_5" x="0" y="0"><path data-name="banner arrow left" d="M19 0L0 19l19 19V0z" fill="#ffffff" id="svg_301"/></svg></g><g><svg width="19" height="38" viewBox="0 0 19 38" id="svg_7" x="19" y="0"><path data-name="banner arrow left" d="M0 0h19L0 18l19 20H0V0z" fill="#ffffff" id="svg_302"/></svg></g></g></svg>'
};
