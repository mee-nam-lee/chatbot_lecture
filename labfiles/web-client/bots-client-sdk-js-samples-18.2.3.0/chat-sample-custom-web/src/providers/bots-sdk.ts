import { UserProfile } from "../model/common/user-message.interface";

/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

/**
 * Bots SDK interface
 */
interface IBotsSDK {
    on(eventName: string, method: (data: any) => void): void;

    init(settings: { appId: string; embedded: boolean }): Promise<any>;

    render(element: HTMLElement): void;

    getConversation(): {messages:any[]};

    sendMessage(message: any): void;

    updateUser(userDetails: UserProfile): Promise<any>;

    triggerPostback(actionId: string): void;

}

export {IBotsSDK};