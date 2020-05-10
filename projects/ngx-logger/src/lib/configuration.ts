/* tslint:disable:variable-name */
import { LogLevel } from "../models/logger.models";
import { ILogger } from "../models/logger.interface";
import { getLogLevel } from "./config.util";
import { ConsoleLogger } from "./loggers/console.logger";
import { HttpLogger } from "./loggers/http.logger";
import { WebsocketLogger } from "./loggers/websocket.logger";
import { LogAppenderConfiguration, LoggerConfiguration } from "../models/config.models";
import { LoggerFactory } from "./loggers/logger.factory";


export class AppenderConfiguration {

    private _logLevel: LogLevel;
    private _disabled: boolean;

    constructor(appenderConfig: LogAppenderConfiguration, globalConfig: LoggerConfiguration) {
        this._logLevel = getLogLevel(appenderConfig.level, globalConfig.level);
        this._disabled = !!appenderConfig.disabled;
    }

    public get logLevel(): LogLevel {
        return this._logLevel;
    }

    public get disabled(): boolean {
        return this._disabled;
    }

}

export class Configuration {

    private _logLevel: LogLevel;
    private _registeredLoggers: ILogger[] = [];
    private _tracingEnabled: boolean;

    public static async create(config: LoggerConfiguration): Promise<Configuration> {
        return new Promise(async (resolve, reject) => {
            const configuration = new Configuration();
            configuration.logLevel = getLogLevel(config.level);
            configuration.tracingEnabled = !!config.tracingEnabled;
            if (!config.disabled) {
                try {
                    await configuration.initLoggers(config);
                    resolve(configuration);
                } catch (err) {
                    reject(err);
                }
            }
        });
    }

    private async initLoggers(config: LoggerConfiguration): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.initLogger("console", config);
                await this.initLogger("http", config);
                await this.initLogger("websocket", config);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    private async initLogger(loggerType: string, config: LoggerConfiguration): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const logAppenderConfig: LogAppenderConfiguration = (config.loggers as any)[loggerType];
            if (logAppenderConfig && !logAppenderConfig.disabled) {
                const logger = LoggerFactory.getInstance(loggerType);
                const appenderConfig = new AppenderConfiguration(logAppenderConfig, config);
                try {
                    await logger.initialize(appenderConfig, config);
                    this._registeredLoggers.push(logger);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            } else {
                resolve();
            }
        });
    }

    public get logLevel(): LogLevel {
        return this._logLevel;
    }

    public set logLevel(level: LogLevel) {
        this._logLevel = level;
    }

    public get registeredLoggers(): ILogger[] {
        return this._registeredLoggers;
    }

    public set registeredLoggers(loggers: ILogger[]) {
        this._registeredLoggers = loggers;
    }

    public get tracingEnabled(): boolean {
        return this._tracingEnabled;
    }

    public set tracingEnabled(value: boolean) {
        this._tracingEnabled = value;
    }
}
