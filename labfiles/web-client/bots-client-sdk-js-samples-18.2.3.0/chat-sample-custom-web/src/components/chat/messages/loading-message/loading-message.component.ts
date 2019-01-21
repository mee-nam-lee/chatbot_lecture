/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */


import {IComponent} from "../../../../model/component.interface";
import {MessageSide} from "../message/message.component";
import {Utils} from "../../../../core/utils";
import {SpinnerComponent} from "../../../loading/spinner.component";

/**
 *
 */
class LoadingMessageComponent implements IComponent{
    element: HTMLElement;

    constructor(private text: string, private side: MessageSide, private utils: Utils){
    }

    /**
     <div class="loading-message">
         <div class="message-bubble right | left">
            <div class="message-content">
                 {SpinnerComponent}
                <span>{text}</span>
            </div>
         </div>
         <div class="clear"></div>
     </div>
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        this.element = this.utils.createDiv(['loading-message', this.side]);

        let bubble = this.utils.createDiv(['message-bubble']);

        let content = this.utils.createDiv(['message-content']);

        content.appendChild(new SpinnerComponent(this.utils).render());
        let text = this.utils.createSpan();
        text.innerText = this.text;
        content.appendChild(text);

        bubble.appendChild(content);

        this.element.appendChild(bubble);

        this.element.appendChild(this.utils.createDiv(['clear']));
        return this.element;
    }

    remove(){
        this.element.remove();
    }
}

export {LoadingMessageComponent};