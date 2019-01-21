/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

/**
 * The bots sdk message role type
 */
type BotsSDKMessageRoleType = 'appUser' | 'appMaker';
const BOTS_SDK_MESSAGE_ROLE = {
    APP_USER: 'appUser',
    APP_MARKET: 'appMaker'
};
export {BotsSDKMessageRoleType, BOTS_SDK_MESSAGE_ROLE};

/**
 * The bots sdk message type
 */
type BotsSDKMessageType = 'text' | 'list' | 'location' | 'image' | 'file' | 'carousel';
const BOTS_SDK_PAYLOAD_TYPE = {
    TEXT: 'text',
    LIST: 'list',
    LOCATION: 'location',
    IMAGE: 'image',
    FILE: 'file',
    CAROUSEL: 'carousel',
};
export {BotsSDKMessageType, BOTS_SDK_PAYLOAD_TYPE};

/**
 * A base interface
 */
interface IBotsSDKMessage{
    /**
     * Message type
     */
    type: BotsSDKMessageType,
    /**
     * Message role
     */
    role?: BotsSDKMessageRoleType,
    /**
     * Url to the avatar for this message sender
     */
    avatarUrl?: string
}

export {IBotsSDKMessage};