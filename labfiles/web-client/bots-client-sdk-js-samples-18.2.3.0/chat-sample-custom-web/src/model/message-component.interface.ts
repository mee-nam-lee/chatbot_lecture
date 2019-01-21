/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {IMessageActionEvent} from "./action-event.interface";
import {IComponent} from "./component.interface";

/**
 * Interface for the widget message components
 */
interface IMessageComponent extends IComponent {
    /**
     * Event called when user clicked on the component action
     * @param {IMessageActionEvent} event
     */
    onActionClick: (event: IMessageActionEvent) => void;

    /**
     * Disable the actions when was clicked.
     */
    disableActions():void;
}

export {IMessageComponent};
