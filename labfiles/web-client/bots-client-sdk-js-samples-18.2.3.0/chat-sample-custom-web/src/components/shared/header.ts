/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {Component} from "../component";
import {Utils} from "../../core/utils";

/**
 *  <div class="header">
 *      <left-button class="left"></left-button>
 *      <span class="header-title">{title}</span>
 *      <span class="header-sub-title">{sub title}</span>
 *      <right-button class="right"></right-button>
 *  </div>
 */
export class Header extends Component {

    constructor(utils: Utils,
                private title: string,
                private subTitle: string = null,
                private className: string = '',
                private rightButton: Component = null,
                private leftButton: Component = null) {
        super(utils);
        this.element = this._createElement();
    }

    render(element: HTMLElement): void {
        element.appendChild(this.element);
    }

    protected _createElement(): HTMLElement {
        let header = this.utils.createDiv(['header', this.className]);

        if (this.leftButton) {
            this.leftButton.addClass('left');
            header.appendChild(this.leftButton.element);
        }

        let titleElem = this.utils.createSpan(['header-title']);
        titleElem.innerText = this.title;
        header.appendChild(titleElem);

        if(this.subTitle) {
            let subTitleElem = this.utils.createSpan(['header-sub-title']);
            subTitleElem.innerText = this.subTitle;
            header.appendChild(subTitleElem);
        }

        if (this.rightButton) {
            this.rightButton.addClass('right');
            header.appendChild(this.rightButton.element);
        }
        return header;
    }
}