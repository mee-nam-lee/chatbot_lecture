/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */

import {Utils} from "../core/utils";

/**
 * Base class for all components
 */
export abstract class Component {
    element: HTMLElement;
    orgDisplayStyle: string;

    constructor(protected utils: Utils){}

    abstract render(element: HTMLElement): void;

    /**
     * Add css class to the component element
     * @param {string} className
     */
    addClass(className: string): void {
        this.element.classList.add(this.utils.getCssClassWithPrefix(className));
    };

    /**
     * Hide/Show the component
     * @param {boolean} hide
     */
    hide(hide: boolean = true) {
        if (hide) {
            this.orgDisplayStyle = this.element.style.display;
            this.element.style.display = 'none';
        } else {
            this.element.style.display = this.orgDisplayStyle;
        }
    }

    /**
     * Remove the element from the DOM
     */
    remove() {
        this.element.remove();
    }

    /**
     * Add the component element as a last child to the parent element
     * @param {HTMLElement} parent
     */
    appendToElement(parent: HTMLElement) {
        parent.appendChild(this.element);
    }

    /**
     * Put current component element as the first child of provided element
     * @param {HTMLElement} parentElement to put as the first child to
     */
    prependToElement(parentElement: HTMLElement) {
        let firstChild = parentElement.firstChild;
        if (firstChild) {
            parentElement.insertBefore(this.element, firstChild);
        } else {
            parentElement.appendChild(this.element);
        }
    }

    /**
     * Add provided element as last child to the component element
     * @param {HTMLElement} child
     */
    appendContentChildElement(child: HTMLElement) {
        this.getContentElement().appendChild(child);
    }

    appendContentChild(child: Component) {
        this.getContentElement().appendChild(child.element);
    }

    getContentElement(): HTMLElement {
        return this.element;
    }
}