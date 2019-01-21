/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {Component} from "../component";
import {IconButton} from "../shared/icon-button";
import {Utils} from "../../core/utils";
import {ISettings} from "../../core/settings";


export class ChatButtonComponent extends Component {

    content: HTMLElement;

    constructor(utils: Utils,
                private settings: ISettings,
                private onOpen: Function) {
        super(utils);
        this.element = this._createElement();
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    protected _createElement(): HTMLElement {
        let openButton = new IconButton(this.utils, this.onOpen.bind(this), this.settings.openIcon, 'chat-button');
        return openButton.element;
    }
}