/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {Component} from "../component";
import {Utils} from "../../core/utils";

export class Button extends Component {

    constructor(utils: Utils,
                private onClick: Function,
                private text: string,
                private className: string = '') {
        super(utils);
        this.element = this._createElement();
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    protected _createElement(): HTMLElement {
        let button = this.utils.createAnchor();
        button.innerText = this.text;
        button.onclick = () => this.onClick(button.innerText);
        button.classList.add(this.utils.getCssClassWithPrefix('button'));
        button.classList.add(this.utils.getCssClassWithPrefix(this.className));
        return button;
    }
}