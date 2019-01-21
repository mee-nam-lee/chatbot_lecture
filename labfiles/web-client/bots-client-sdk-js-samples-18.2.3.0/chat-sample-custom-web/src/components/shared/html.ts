/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {Component} from "../component";
import {Utils} from "../../core/utils";

/**
 *  <div>
 *      HTML
 *  </div>
 */
export class HTML extends Component {

    constructor(utils: Utils,
                private html: string,
                private className: string = null) {
        super(utils);
        this.element = this._createElement();
    }

    render(element: HTMLElement): void {
        element.appendChild(this.element);
    }

    protected _createElement(): HTMLElement {
        let div = this.utils.createDiv();
        if (this.className) {
            div.classList.add(this.utils.getCssClassWithPrefix(this.className));
        }
        div.innerHTML = this.html;
        return div;
    }

}