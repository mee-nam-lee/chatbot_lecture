/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {Component} from "../../component";
import {IconButton} from "../../shared/icon-button";
import {Footer} from "../../shared/footer";
import {Utils} from "../../../core/utils";

export class ChatFooterComponent extends Component {
    input: HTMLInputElement;

    constructor(utils: Utils, private onSend: Function, private sendButtonImgSrc: string, private inputPlaceholder: string) {
        super(utils);
        this.element = this._createElement();
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    protected _createElement(): HTMLElement {
        this.input = this.utils.createInput(['input']);
        this.input.onkeypress = this.onInputKeyPress.bind(this);
        this.input.placeholder = this.inputPlaceholder;
        let sendButton = new IconButton(this.utils, this.onClick.bind(this), this.sendButtonImgSrc);
        let footer = new Footer(this.utils);
        footer.appendContentChildElement(this.input);
        footer.appendContentChild(sendButton);
        return footer.element;
    }

    onInputKeyPress(event) {
        if (event.key === 'Enter' && this.input.value !== '') {
            this._onSend();
        }
    }

    onClick() {
        if (this.input.value !== '') {
            this._onSend();
        }
    }

    _onSend() {
        this.onSend(this.input.value);
        this.input.value = '';
    }
}