/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IActionPayload} from "./action-payload.interface";

/**
 * This action will request the underlying messaging server to ask the user for a location.
 */
interface ILocationActionPayload extends IActionPayload{}

export {ILocationActionPayload};