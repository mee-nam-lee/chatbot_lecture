/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {Logger} from "./core/logger";
import {Utils} from "./core/utils";
import {StyleComponent} from "./components/style/style";
import {BotsDataService} from "./providers/bots-data-service";
import {ISettings} from "./core/settings";
import {IBotsService} from "./providers/bots-service";
import {WidgetComponent} from "./components/widget/widget.component";


/**
 * The main starter class that load all other objects
 */
export class Main {
    private _logger = new Logger('Main');

    onLoad() {
        this._logger.debug('onLoad', 'load chat widget');

        const botsDataService = new BotsDataService();

        const utils = new Utils(botsDataService.config);

        if (!botsDataService.config.useCustomStyle) {
            // load default styles
            let style = new StyleComponent(utils);
            document.head.appendChild(style.render());
        }

        botsDataService
            .init()
            .then(() => this.createWidget(utils, botsDataService.config, botsDataService.service));
    }

    createWidget(utils: Utils, settings: ISettings, dataService: IBotsService){
        const widgetComponent = new WidgetComponent(utils, settings, dataService);
        widgetComponent.appendToElement(document.body);
        if(settings.isOpen){
            widgetComponent.showChat();
        }
    }
}

// Attach chat widget loading to DOM ready event
const main = new Main();
if(document.addEventListener) {
    document.addEventListener('DOMContentLoaded', main.onLoad.bind(main), false);
} else {
    window.addEventListener('load', main.onLoad.bind(main), false )
}
