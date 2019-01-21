/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

/**
 * Represents location payload
 */
interface ILocationPayload{
    /**
     * A title for this location
     */
    title?: string,
    /**
     * A url for displaying a map of the location
     */
    url?: string,
    /**
     * The GPS coordinates longitude value.
     */
    longitude: number,
    /**
     * The GPS coordinates latitude value.
     */
    latitude: number
}

export {ILocationPayload};