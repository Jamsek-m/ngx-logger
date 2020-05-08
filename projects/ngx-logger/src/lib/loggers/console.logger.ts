import { ILogger } from "../../models/logger.interface";
import { LoggerConfiguration } from "../../models/config.models";
import { AppenderConfiguration } from "../configuration";
import { LogLevel } from "../../models/logger.models";


export class ConsoleLogger implements ILogger {

    private config: AppenderConfiguration;

    initialize(config: AppenderConfiguration, globalConfig: LoggerConfiguration): Promise<void> {
        return new Promise<void>(resolve => {
            this.config = config;
            resolve();
        });
    }

    log(level: LogLevel, message: string): Promise<void> {
        if (this.config.logLevel <= level && !this.config.disabled) {
            return new Promise<void>(resolve => {
                console.log(message);
                resolve();
            });
        }
    }

}
