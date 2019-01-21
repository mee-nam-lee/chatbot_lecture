/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {Component} from "../component";
import {Utils} from "../../core/utils";

/**
 *  <div class="footer">
 *      <div class="toolbar">
 *          {content}
 *      </div>
 *  </div>
 */
export class Footer extends Component {

    content: HTMLElement;

    constructor(utils: Utils, private className?: string) {
        super(utils);
        this.element = this._createElement();
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    protected _createElement(): HTMLElement {
        let footer = this.utils.createDiv(['footer']);
        let toolbar = this.utils.createDiv(['toolbar']);
        this.content = toolbar;

        footer.appendChild(toolbar);
        return footer;
    }

    getContentElement(): HTMLElement {
        return this.content;
    }

}