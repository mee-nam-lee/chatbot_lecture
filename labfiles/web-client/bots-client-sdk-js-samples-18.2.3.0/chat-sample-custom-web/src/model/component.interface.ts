/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

/**
 * Interface for the widget components
 */
interface IComponent{
    /**
     * Convert the component to HTML elements
     * @return {HTMLElement}
     */
    render(): HTMLElement;
}

export {IComponent};
