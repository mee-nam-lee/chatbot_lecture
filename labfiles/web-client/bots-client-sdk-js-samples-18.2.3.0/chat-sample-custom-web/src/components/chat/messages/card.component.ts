/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {ActionComponent} from "./actions/action.component";
import {IMessageComponent} from "../../../model/message-component.interface";
import {IActionEvent} from "../../../model/action-event.interface";
import {ICardPayload} from "../../../model/common/payloads/card-payload.interface";
import {Utils} from "../../../core/utils";
import {ActionComponentFactory} from "../../../core/factories/action-component.factory";

/**
 *
 */
class CardComponent implements IMessageComponent{
    onActionClick: (event: IActionEvent) => void;
    title: string;
    description: string;
    imageUrl: string;
    url: string;
    actions: ActionComponent[] = [];

    constructor(private utils: Utils, payload: ICardPayload){
        this.title = payload.title;
        this.description = payload.description;
        this.imageUrl = payload.imageUrl;
        this.url = payload.url;
        if(payload.actions){
            for(let action of payload.actions){
                let actionComponent = ActionComponentFactory.fromActionPayload(utils, action);
                if(actionComponent) {
                    actionComponent.onActionClick = this.handleOnActionClick.bind(this);
                    this.actions.push(actionComponent);
                }
            }
        }
    }

    handleOnActionClick(event: IActionEvent){
        if(this.onActionClick){
            this.onActionClick(event);
        }
    }

    /**
     * Renders dom from component object
     <div class="card">
        <img src="imageUrl"/>
        <div class="card-content">
            <span class="card-title">{title}</span>
            <p>{description}</p>
        </div>
        <div class="card-actions">
            {actions}
        </div>
        <div class="clear"></div>
     </div>
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        let card = this.utils.createDiv(['card']);
        if(this.imageUrl){
            card.appendChild(this.utils.createImage(this.imageUrl));
        }

        let content = this.utils.createDiv(['card-content']);

        let title = this.utils.createSpan(['card-title']);
        title.innerText = this.title;
        content.appendChild(title);

        let desc = this.utils.createParagraph();
        desc.innerText = this.description;
        content.appendChild(desc);

        card.appendChild(content);

        if(this.actions.length > 0){
            let actions = this.utils.createDiv(['card-actions']);
            for(let action of this.actions){
                actions.appendChild(action.render());
            }
            card.appendChild(actions);
        }

        return card;
    }

    /**
     * Disable actions buttons
     */
    disableActions(){
        for(let action of this.actions){
            action.disable();
        }
    }
}

export {CardComponent};