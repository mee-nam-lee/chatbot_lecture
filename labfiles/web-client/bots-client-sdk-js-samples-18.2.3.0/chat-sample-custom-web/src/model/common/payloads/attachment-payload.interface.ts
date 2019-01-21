/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

/**
 * The attachment type
 */
type AttachmentType = 'image' | 'video' | 'audio' | 'file';
const ATTACHMENT_TYPE = {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    FILE: 'file'
};
export {AttachmentType, ATTACHMENT_TYPE};

/**
 * The attachment payload
 */
interface IAttachmentPayload{
    /**
     * The attachment type
     */
    type: AttachmentType,
    /**
     * The attachment url
     */
    url: string;
}

export {IAttachmentPayload};