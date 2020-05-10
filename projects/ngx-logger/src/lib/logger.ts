import { Injectable, Optional } from "@angular/core";
import { LogLevel, LogLevelEnum } from "../models/logger.models";
import { LoggerConfiguration } from "../models/config.models";
import { formatDate } from "./date.util";
import { overrideWithDefaults } from "./config.util";
import { Configuration } from "./configuration";
import { Router, RouterEvent } from "@angular/router";


@Injectable({
    providedIn: "root"
})
export class Logger {

    private static readonly dateFormatter = new Intl.DateTimeFormat("sl-SI", {
        hour12: false,
    });

    private config: Configuration = null;

    constructor(@Optional() private router: Router) {
    }

    public async initialize(config?: LoggerConfiguration): Promise<void> {
        config = overrideWithDefaults(config);
        if (config.disabled) {
            return;
        }
        try {
            this.config = await Configuration.create(config);
        } catch (err) {
            // TODO: better handle error
            console.error(err);
        }

        if (this.config && this.config.tracingEnabled) {
            if (!this.router) {
                console.error("Tracing requires registered RouterModule!");
            } else {
                this.router.events.subscribe((event: RouterEvent) => {
                    // TODO: trace router events
                    // console.log(event);
                });
            }
        }
    }

    public getLogLevel(): LogLevel {
        return this.config.logLevel;
    }

    public log(level: LogLevel, message: string, loggerName?: string): Promise<void[]> {
        return Promise.all(
            this.config.registeredLoggers.map(async logger => {
                const date = formatDate(new Date(), Logger.dateFormatter);
                const formattedLevel = LogLevelEnum.toString(level);
                const formattedLoggerName = loggerName ? " " + loggerName : "";
                const formattedMessage = `${date} [${formattedLevel}]${formattedLoggerName} - ${message}`;
                await logger.log(level, formattedMessage);
            })
        );
    }

    public trace(message: string, loggerName?: string): Promise<void[]> {
        if (this.getLogLevel() <= LogLevel.TRACE) {
            return this.log(LogLevel.TRACE, message, loggerName);
        }
    }

    public fine(message: string, loggerName?: string): Promise<void[]> {
        if (this.getLogLevel() <= LogLevel.FINE) {
            return this.log(LogLevel.FINE, message, loggerName);
        }
    }

    public debug(message: string, loggerName?: string): Promise<void[]> {
        if (this.getLogLevel() <= LogLevel.DEBUG) {
            return this.log(LogLevel.DEBUG, message, loggerName);
        }
    }

    public info(message: string, loggerName?: string): Promise<void[]> {
        if (this.getLogLevel() <= LogLevel.INFO) {
            return this.log(LogLevel.INFO, message, loggerName);
        }
    }

    public warn(message: string, loggerName?: string): Promise<void[]> {
        if (this.getLogLevel() <= LogLevel.WARN) {
            return this.log(LogLevel.WARN, message, loggerName);
        }
    }

    public error(message: string, loggerName?: string): Promise<void[]> {
        if (this.getLogLevel() <= LogLevel.ERROR) {
            return this.log(LogLevel.ERROR, message, loggerName);
        }
    }

}
