/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import {IUserMessage} from "../model/common/user-message.interface";
import {IMessagePayload, PAYLOAD_TYPE} from "../model/common/payloads/message-payload/message-payload.interface";
import {ITextMessagePayload} from "../model/common/payloads/message-payload/text-message-payload.interface";
import {IActionPayload} from "../model/common/payloads/action-payload/action-payload.interface";
import {IBotMessage} from "../model/common/bot-message.interface";
import {BOT_MESSAGE_TYPE, BotMessageType} from "../model/common/message-from";
import {IPostbackMessagePayload} from "../model/common/payloads/message-payload/postback-message-payload.interface";
import {IPostbackActionPayload} from "../model/common/payloads/action-payload/postback-action-payload.interface";
import {ICallActionPayload} from "../model/common/payloads/action-payload/call-action-payload.interface";
import {ILocationActionPayload} from "../model/common/payloads/action-payload/location-action-payload.interface";
import {IUrlActionPayload} from "../model/common/payloads/action-payload/url-action-payload.interface";
import {ICardMessagePayload} from "../model/common/payloads/message-payload/card-message-payload.interface";
import {ICardPayload} from "../model/common/payloads/card-payload.interface";
import {IAttachmentMessagePayload} from "../model/common/payloads/message-payload/attachment-message-payload.interface";
import {IAttachmentPayload} from "../model/common/payloads/attachment-payload.interface";
import {ILocationMessagePayload} from "../model/common/payloads/message-payload/location-message-payload.interface";
import {ILocationPayload} from "../model/common/payloads/location-payload.interface";
import {IRawMessagePayload} from "../model/common/payloads/message-payload/raw-message-payload.interface";
import {IMessage} from "../model/common/message";
import {Logger} from "../core/logger";

/**
 *
 */
class ChatActions {
    onMessage: (message: IMessage) => void;
    logger = new Logger('ChatActions');
    constructor(onMessage: (message: IMessage) => void){
        this.onMessage = onMessage;
    }

    process(message: IUserMessage): boolean{
      this.logger.debug('process:', message);

      switch(message.messagePayload.type){
            case PAYLOAD_TYPE.TEXT:
                return this.processTextMessage(message);
            case PAYLOAD_TYPE.POSTBACK:
                return this.processPostbackMessage(message);
            case PAYLOAD_TYPE.LOCATION:
                return this.processLocationMessage(message);
            default:
                return false;
        }
    }

    processTextMessage(message: IUserMessage): boolean{
        let textMessage = message.messagePayload as ITextMessagePayload;
        if (textMessage.text === '@demo') {
            let payload = <IMessagePayload> {
                "type": "text",
                "text": "What is response type to show?",
                "actions": [
                    <IActionPayload>{
                        "type": "postback",
                        "label": "Text",
                        "postback": '@demo text'
                    },
                    <IActionPayload>{
                        "type": "postback",
                        "label": "Vertical Cards",
                        "postback": '@demo cards vertical'
                    },
                    <IActionPayload>{
                        "type": "postback",
                        "label": "Horizontal Cards",
                        "postback": '@demo cards horizontal'
                    },
                    <IActionPayload>{
                        "type": "postback",
                        "label": "Video Attachment",
                        "postback": '@demo video attachment'
                    },
                    <IActionPayload>{
                        "type": "postback",
                        "label": "Audio Attachment",
                        "postback": '@demo audio attachment'
                    },
                    <IActionPayload>{
                        "type": "postback",
                        "label": "Image Attachment",
                        "postback": '@demo image attachment'
                    },
                    <IActionPayload>{
                        "type": "postback",
                        "label": "File Attachment",
                        "postback": '@demo file attachment'
                    },
                    <IActionPayload>{
                        "type": "postback",
                        "label": "Location",
                        "postback": '@demo location'
                    },
                    <IActionPayload>{
                        "type": "postback",
                        "label": "Raw",
                        "postback": '@demo raw'
                    },
                    <IActionPayload>{
                        "type": "postback",
                        "label": "Request Location",
                        "postback": '@demo request location'
                    }
                ]
            };
            let message: IBotMessage = {
                from: {
                    type: BOT_MESSAGE_TYPE.USER as BotMessageType,
                },
                body: {
                    messagePayload: payload
                }
            };
            this.onMessage(message);
            return true;
        } else if(textMessage.text === '@clear'){
            let keys = Object.keys(localStorage);
            for(let i = 0; i < keys.length; i++){
                if(keys[i] === 'appId'){
                    continue;
                }
                localStorage.removeItem(keys[i]);
            }
            location.reload();
            return true;
        } else {
            return false;
        }
    }

    processPostbackMessage(message: IUserMessage): boolean{
        let postbackPayload = message.messagePayload as IPostbackMessagePayload;
        if(typeof postbackPayload.postback === 'string'){
            let payloads: IMessagePayload[];
            switch(postbackPayload.postback){
                case '@demo text':
                    payloads = [<ITextMessagePayload> {
                        type: "text",
                        text: "This is text demo",
                        actions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ],
                        globalActions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ]
                    }];
                    break;
                case '@demo cards horizontal':
                    payloads = [<ICardMessagePayload> {
                        type: 'card',
                        layout: 'horizontal',
                        cards: [ <ICardPayload>{
                            title: 'Card title',
                            description: 'Card description',
                            imageUrl: 'http://via.placeholder.com/350x150',
                            url: 'http://www.oracle.com',
                            actions: [
                                <IPostbackActionPayload>{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                <ICallActionPayload>{
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                <ILocationActionPayload>{
                                    type: "location",
                                    label: "Location"
                                },
                                <IUrlActionPayload>{
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
                        }, <ICardPayload>{
                            title: 'Card title',
                            description: 'Card description',
                            imageUrl: 'http://via.placeholder.com/350x150',
                            url: 'http://www.oracle.com',
                            actions: [
                                <IPostbackActionPayload>{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                <ICallActionPayload>{
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                <ILocationActionPayload>{
                                    type: "location",
                                    label: "Location"
                                },
                                <IUrlActionPayload>{
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
                        }

                        ],
                        globalActions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ]
                    }];
                    break;
                case '@demo cards vertical':
                    payloads = [<ICardMessagePayload> {
                        type: 'card',
                        layout: 'vertical',
                        cards: [ <ICardPayload>{
                            title: 'Card title',
                            description: 'Card description',
                            imageUrl: 'http://via.placeholder.com/350x150',
                            url: 'http://www.oracle.com',
                            actions: [
                                <IPostbackActionPayload>{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                <ICallActionPayload>{
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                <ILocationActionPayload>{
                                    type: "location",
                                    label: "Location"
                                },
                                <IUrlActionPayload>{
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
                        }, <ICardPayload>{
                            title: 'Card title',
                            description: 'Card description',
                            imageUrl: 'http://via.placeholder.com/350x150',
                            url: 'http://www.oracle.com',
                            actions: [
                                <IPostbackActionPayload>{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                <ICallActionPayload>{
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                <ILocationActionPayload>{
                                    type: "location",
                                    label: "Location"
                                },
                                <IUrlActionPayload>{
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
                        }

                        ],
                        globalActions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ]
                    }];
                    break;
                case '@demo image attachment':
                    payloads = [<IAttachmentMessagePayload> {
                        type: 'attachment',
                        attachment: <IAttachmentPayload>{
                            type: 'image',
                            url: 'http://via.placeholder.com/350x150'
                        },
                        actions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ],
                        globalActions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ]
                    }];
                    break;
                case '@demo audio attachment':
                    payloads = [<IAttachmentMessagePayload> {
                        type: 'attachment',
                        attachment: <IAttachmentPayload>{
                            type: 'audio',
                            url: 'https://html5tutorial.info/media/vincent.mp3'
                        },
                        actions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ],
                        globalActions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ]
                    }];
                    break;
                case '@demo video attachment':
                    payloads = [<IAttachmentMessagePayload> {
                        type: 'attachment',
                        attachment: <IAttachmentPayload>{
                            type: 'video',
                            url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
                        },
                        actions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ],
                        globalActions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ]
                    }];
                    break;
                case '@demo file attachment':
                    payloads = [<IAttachmentMessagePayload> {
                        type: 'attachment',
                        attachment: <IAttachmentPayload>{
                            type: 'file',
                            url: 'http://via.placeholder.com/350x150'
                        },
                        actions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ],
                        globalActions: [
                            <IPostbackActionPayload>{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            },
                            <ICallActionPayload>{
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            },
                            <ILocationActionPayload>{
                                type: "location",
                                label: "Location"
                            },
                            <IUrlActionPayload>{
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }
                        ]
                    }];
                    break;
                case '@demo location':
                    payloads = [<ILocationMessagePayload>{
                        type: 'location',
                        location: <ILocationPayload>{
                            title: 'Location title',
                            longitude: -79.388385,
                            latitude: 43.6435838
                        }

                    }];
                    break;
                case '@demo raw':
                    payloads = [<IRawMessagePayload>{
                        type: 'raw',
                        payload: {
                            property: 'value'
                        }
                    }];
                    break;
                case '@demo request location':
                    payloads = [<ITextMessagePayload>{
                        type: 'text',
                        text: "Please share your location.",
                        actions: [
                            <ILocationActionPayload>{
                                type: "location",
                                label: "@Share Location"
                            }
                        ],
                    }];
                    break;
            }
            if(payloads) {
                for (let payload of payloads) {
                    let message: IBotMessage = {
                        from: {
                            type: BOT_MESSAGE_TYPE.BOT as BotMessageType,
                        },
                        body: {
                            messagePayload: payload
                        }
                    };
                    this.onMessage(message);
                }
                return true;
            }
        } else {
            return false;
        }
    }

    processLocationMessage(message: IUserMessage): boolean{
        let messagePayload = message.messagePayload as ILocationMessagePayload;
        if(messagePayload.location.title === '@demo location'){
            let payload = <ILocationMessagePayload>{
                type: 'location',
                location: <ILocationPayload>{
                    title: 'Your location',
                    longitude: messagePayload.location.longitude,
                    latitude: messagePayload.location.latitude
                }

            };
            let message: IBotMessage = {
                from: {
                    type: BOT_MESSAGE_TYPE.BOT as BotMessageType,
                },
                body: {
                    messagePayload: payload
                }
            };
            this.onMessage(message);
            return true;
        } else {
            return false;
        }
    }
}

export {ChatActions};
