/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import {IBotsSDKMessage} from "./message.interface";

/**
 * A location type message includes the coordinates (latitude and longitude) of a location. Typically sent in response to a Location Request.
 */
interface IBotsSDKLocationMessage extends IBotsSDKMessage {
    /**
     * The coordinates of the location.
     */
    coordinates?: {
        /**
         * A floating point value representing the latitude of the location
         */
        lat: number,
        /**
         * A floating point value representing the longitude of the location
         */
        long: number
    }
}

export {IBotsSDKLocationMessage};