import { LoggerConfiguration } from "./config.models";
import { LogLevel } from "./logger.models";
import { AppenderConfiguration } from "../lib/configuration";


export interface ILogger {

    initialize(config: AppenderConfiguration, globalConfig: LoggerConfiguration): Promise<void>;

    log(level: LogLevel, message: string): Promise<void>;

}
