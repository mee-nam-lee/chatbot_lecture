/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {Component} from "../component";
import {Utils} from "../../core/utils";

export class Icon extends Component {

    constructor(utils: Utils,
                private imgSrc: string,
                private className: string = '') {
        super(utils);
        this.element = this._createElement();
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    protected _createElement(): HTMLElement {
        let i:HTMLElement = document.createElement('i');
        if(this.className){
            i.classList.add(this.utils.getCssClassWithPrefix(this.className));
        }
        i.classList.add(this.utils.getCssClassWithPrefix('icon'));
        i.style.backgroundImage = 'url(\'' + this.imgSrc + '\')';
        return i;
    }
}