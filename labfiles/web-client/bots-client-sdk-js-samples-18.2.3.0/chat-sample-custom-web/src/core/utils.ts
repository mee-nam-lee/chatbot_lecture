/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {ISettings} from "./settings";

/**
 * This class contains widget helper methods
 */
class Utils {

    constructor(private settings: ISettings){}

    /**
     * Creates a deep clone of the provided object
     */
    clone(obj: any): any{
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Converts urls in text to the HTML links
     */
    linkify(inputText: string, embeddedVideo: boolean): string {
        let replacedText, replacePattern1, replacePattern2, replacePattern3;

        //URLs starting with http://, https://, or ftp://
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;

        replacedText = inputText.replace(replacePattern1, (match, $1, $2) => {
            let id = embeddedVideo ? this.getYouTubeVideoId($1) : null;
            if (id) {
                return '<iframe width="100%" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>'
            } else {
                return '<a href="' + $1 + '" target="_blank">' + $1 + '</a>';
            }
        });

        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        replacedText = replacedText.replace(replacePattern2, (match, $1, $2) => {
            let id = embeddedVideo ? this.getYouTubeVideoId('http://' + $2) : null;
            if (id) {
                return '<iframe width="100%" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>'
            } else {
                return $1 + '<a href="http://' + $2 + '" target="_blank">' + $2 + '</a>';
            }
        });

        return replacedText;
    }

    /**
     * extracts the youtube id from the link
     */
    getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return null;
        }
    }

    /**
     * adds the widget project name as the prefix to the css class
     */
    getCssClassWithPrefix(cssClass){
        return this.settings.name + '-' + cssClass;
    }

    /**
     * creates HTML button element
     */
    createButton(classNames?: string[]): HTMLButtonElement {
        let element:HTMLButtonElement = document.createElement('button');
        if(classNames){
            for(let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }

    /**
     * creates HTML anchor element
     */
    createAnchor(url?: string, text?: string, classNames?: string[]): HTMLAnchorElement {
        let element: HTMLAnchorElement = document.createElement('a');
        if(url){
            element.href = url;
        }
        if(text){
            element.innerText = text;
        } else if(url) {
            element.innerText = url;
        }
        if(classNames){
            for(let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }

    /**
     * creates HTML div element
     */
    createDiv(classNames?: string[]): HTMLDivElement {
        let element: HTMLDivElement =  document.createElement('div');
        if(classNames){
            for(let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }

    /**
     * creates HTML paragraph element
     */
    createParagraph(classNames?: string[]): HTMLParagraphElement {
        let element: HTMLParagraphElement =  document.createElement('p');
        if(classNames){
            for(let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }

    /**
     * creates HTML span element
     */
    createSpan(classNames?: string[]): HTMLSpanElement {
        let element: HTMLSpanElement =  document.createElement('span');
        if(classNames){
            for(let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }

    /**
     * creates HTML input element
     */
    createInput(classNames?: string[]): HTMLInputElement {
        let element:HTMLInputElement = document.createElement('input');
        if(classNames){
            for(let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }

    /**
     * creates HTML image element
     */
    createImage(url?: string, classNames?: string[]): HTMLImageElement {
        let element: HTMLImageElement = document.createElement('img');
        if(url){
            element.src = url;
        }
        if(classNames){
            for(let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }

    /**
     * creates HTML audio element
     */
    createAudio(url?: string, className?: string, autoplay?: boolean): HTMLAudioElement {
        let element: HTMLAudioElement = document.createElement('audio');
        if(url){
            element.src = url;
        }
        element.autoplay = typeof autoplay === 'undefined' ? false : autoplay;
        if(className){
            element.classList.add(this.getCssClassWithPrefix(className));
        }
        return element;
    }

    /**
     * creates HTML video element
     */
    createVideo(url?: string, className?: string, autoplay?: boolean): HTMLVideoElement {
        let element: HTMLVideoElement = document.createElement('video');
        if(url){
            element.src = url;
        }
        element.autoplay = typeof autoplay === 'undefined' ? false : autoplay;
        if(className){
            element.classList.add(this.getCssClassWithPrefix(className));
        }
        return element;
    }

    /**
     * creates HTML div element with the HTML as child elements
     */
    createHTML(html: string): HTMLDivElement {
        let div = this.createDiv();
        div.innerHTML = html;
        return div;
    }

    /**
     * creates HTML style element
     */
    createStyle(style: string): HTMLStyleElement {
        let element: HTMLStyleElement = document.createElement('style');
        element.type = 'text/css';
        element.appendChild(document.createTextNode(style));
        return element;
    }
}

export {Utils};
