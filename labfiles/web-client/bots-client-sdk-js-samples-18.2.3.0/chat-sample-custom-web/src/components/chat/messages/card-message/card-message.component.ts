/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */


import {MessageComponent, MessageSide} from "../message/message.component";
import {IMessageComponent} from "../../../../model/message-component.interface";
import {
    ICardMessagePayload,
    Layout
} from "../../../../model/common/payloads/message-payload/card-message-payload.interface";
import {CardComponent} from "../card.component";
import {Utils} from "../../../../core/utils";
import {ISettings} from "../../../../core/settings";

/**
 *
 */
class CardMessageComponent extends MessageComponent implements IMessageComponent{

    layout: Layout;
    cards: CardComponent[] = [];

    constructor(utils: Utils, settings: ISettings, payload: ICardMessagePayload, side: MessageSide){
        super(utils, settings, payload, side);
        this.layout = payload.layout;
        for(let card of payload.cards){
            this.cards.push(new CardComponent(this.utils, card));
        }
    }

    /**
     * Renders dom from component object
     <div class="card-message card-message-horizontal | card-message-vertical">
        <div class="card-message-content">
            <div class="card-message-cards">
                {cards}
            </div>
            <div class="message-actions">{actions}</div>
        </div>
        <div class="message-global-actions">{globalActions}</div>
     </div>
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        let message = this.utils.createDiv(['card-message', 'card-message-' + this.layout, this.side]);

        let content = this.utils.createDiv(['card-message-content']);

        let cards = this.utils.createDiv(['card-message-cards']);
        for(let card of this.cards){
            let cardComponent = card;
            cardComponent.onActionClick = this.handleOnActionClick.bind(this);
            cards.appendChild(cardComponent.render());
        }
        cards.appendChild(this.utils.createDiv(['clear']));
        content.appendChild(cards);

        message.appendChild(content);

        this.appendGlobalActions(message, this.actions);
        this.appendGlobalActions(message, this.globalActions);

        return message;
    }

    disableActions(){
        super.disableActions();
        for(let card of this.cards){
            card.disableActions();
        }
    }

}

export {CardMessageComponent};