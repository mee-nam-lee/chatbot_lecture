/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {IComponent} from "../../model/component.interface";
import {Utils} from "../../core/utils";

/**
 *
 */
class StyleComponent implements IComponent{

    static STYLE: string = '{style}';

    constructor(private utils: Utils){

    }

    render(): HTMLElement {
        return this.utils.createStyle(StyleComponent.STYLE);
    }
}

export {StyleComponent};