/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

import {Logger} from "../../core/logger";

/**
 *
 */
class ReconnectingWebSocket implements WebSocket {
    private _ws: WebSocket;
    private _url: string;
    private _protocols: string | string[];
    private _timedOut = false;
    private _readyState: number;
    private _forcedClose = false;

    private _reconnectInterval:number;
    private _timeoutInterval:number;

    get url(): string { return this._url; }
    get protocol(): string { return this._ws.protocol; }
    get bufferedAmount(): number { return this._ws.bufferedAmount; }
    get extensions(): string { return this._ws.extensions; }
    get readyState(): number { return this._ws ? this._ws.readyState : this._readyState; }
    get CLOSED(): number { return this._ws.CLOSED; }
    get CLOSING(): number { return this._ws.CLOSING; }
    get CONNECTING(): number { return this._ws.CONNECTING; }
    get OPEN(): number { return this._ws.OPEN; }

    get binaryType(): BinaryType { return this._ws.binaryType; }
    set binaryType(value: BinaryType) { this._ws.binaryType = value; }

    onclose = (event: Event): any => {};
    onerror = (event: Event): any => {};
    onmessage = (event: MessageEvent): any => {};
    onopen = (event: Event): any => {};
    onconnecting = () => {};

    private logger = new Logger('ReconnectingWebSocket');

    constructor(reconnectInterval: number, timeoutInterval: number, url: string, protocols?: string | string[]) {
        this.logger.debug('create websocket', 'reconnectInterval: ' + reconnectInterval, 'timeoutInterval: ' + timeoutInterval, url);
        this._url = url;
        this._protocols = protocols;
        this._readyState = WebSocket.CONNECTING;
        this.connect(false);
        this._reconnectInterval = reconnectInterval;
        this._timeoutInterval = timeoutInterval;
    }

    private connect(reconnectAttempt: boolean): void{
        this._ws = new WebSocket(this._url, this._protocols);
        this.logger.debug('connect', 'attempt connect', this._url);

        // Close the socket if it was not successfully connect after timeout interval
        let timeout = setTimeout(() => {
            this.logger.debug('connection timeout, close socket', this._url);
            this._timedOut = true;
            this._ws.close();
            this._timedOut = false;
        }, this._timeoutInterval);

        this._ws.onopen = (event:Event) => {
            clearTimeout(timeout);
            this.logger.debug('onopen', this._url);
            this._readyState = WebSocket.OPEN;
            reconnectAttempt = false;
            this.onopen(event);
        };

        this._ws.onclose = (event:CloseEvent) => {
            clearTimeout(timeout);
            this._ws = null;
            if (this._forcedClose) {
                this._readyState = WebSocket.CLOSED;
                this.onclose(event);
            } else {
                this._readyState = WebSocket.CONNECTING;
                this.onconnecting();
                if (!reconnectAttempt && !this._timedOut) {
                    this.logger.debug('onclose', this._url);
                    this.onclose(event);
                }
                setTimeout(() => {
                    this.connect(true);
                }, this._reconnectInterval);
            }
        };

        this._ws.onmessage = (event) => {
            this.logger.debug('onmessage', this._url, event.data);
            this.onmessage(event);
        };

        this._ws.onerror = (event) => {
            this.logger.debug('onerror', this._url, event);
            this.onerror(event);
        };
    }

    close(code?: number, reason?: string): void {
        if (this._ws) {
            this._forcedClose = true;
            this._ws.close();
        }
    }

    send(data: any): void {
        if (this._ws) {
            this.logger.debug('send', this._url, data);
            return this._ws.send(data);
        } else {
            throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
        }
    }

    addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, useCapture?: boolean): void {
        if(this._ws) {
            this._ws.addEventListener<K>(type, listener, useCapture);
        }
    }
    //
    // addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void {
    //     if(this._ws) {
    //         this._ws.addEventListener(type, listener, useCapture)
    //     }
    // }

    dispatchEvent(evt: Event): boolean{
        if(this._ws) {
            return this._ws.dispatchEvent(evt);
        } else {
            return false;
        }
    }
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void{
        if(this._ws) {
            this._ws.removeEventListener(type, listener, options);
        }
    }
}

export {ReconnectingWebSocket};
