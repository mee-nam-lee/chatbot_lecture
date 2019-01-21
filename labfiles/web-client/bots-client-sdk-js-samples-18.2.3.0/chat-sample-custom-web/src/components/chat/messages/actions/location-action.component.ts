/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {Utils} from "../../../../core/utils";
import {ActionComponent} from "./action.component";
import {ILocationActionPayload} from "../../../../model/common/payloads/action-payload/location-action-payload.interface";

export type Position = {
    longitude: number,
    latitude: number
};

/**
 * Request browser for location, browser may in turn ask user for permission.
 * Location information is then sent to the Bot as a LocationMessagePayload.
 * If a location cannot be obtained from the browser, a pre-set location is sent to the Bot to allow testing to continue.
 */
class LocationActionComponent extends ActionComponent{

    constructor(utils: Utils, payload: ILocationActionPayload){
        super(utils, payload);
    }

    render(): HTMLElement {
        let link = <HTMLAnchorElement>super.render();
        link.classList.add(this.utils.getCssClassWithPrefix('action-location'));
        return link;
    }

    getCurrentPosition(): Promise<Position>{
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, (error) => {
                reject(error);
            });
        });
    }

    getEventPayload(): Promise<any> {
        return this.getCurrentPosition();
    }
}

export {LocationActionComponent};