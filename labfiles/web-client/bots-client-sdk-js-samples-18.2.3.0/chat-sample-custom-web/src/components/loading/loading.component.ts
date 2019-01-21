/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {Component} from "../component";
import {SpinnerComponent} from "./spinner.component";
import {Utils} from "../../core/utils";

/**
 <div id="loading">
     <div class="backdrop"></div>
     <div class="loading-wrapper">
        {SpinnerComponent}
         <div class="content"></div>
     </div>
 </div>
 */
export class LoadingComponent extends Component {

    content: HTMLElement;

    constructor(utils: Utils) {
        super(utils);
        this.element = this._createElement();
        this.hide();
    }

    render(element): void {

    }

    _createElement(): HTMLElement {
        let loading = this.utils.createDiv(['loading']);
        loading.appendChild(this.utils.createDiv(['backdrop']));
        const wrapper = loading.appendChild(this.utils.createDiv(['wrapper']));
        wrapper.appendChild(new SpinnerComponent(this.utils).render());
        this.content = wrapper.appendChild(this.utils.createDiv(['content']));
        return loading;
    }

    present(message: string) {
        this.hide(false);
        this.setContent(message);
    }

    dismiss() {
        this.hide();
        this.setContent('');
    }

    getContentElement(): HTMLElement {
        return this.element;
    }

    setContent(message: string) {
        this.content.innerHTML = message;
    }
}