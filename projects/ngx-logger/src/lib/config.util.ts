import { LogLevel } from "../models/logger.models";
import { LoggerConfiguration } from "../models/config.models";

export function getLogLevel(providedLevel: string, fallbackLevel: string = "INFO"): LogLevel {

    const fallback = LogLevel[fallbackLevel as keyof typeof LogLevel];
    if (!fallback) {
        throw new Error("Wrong key type!");
    }

    if (providedLevel) {
        const level = LogLevel[providedLevel as keyof typeof LogLevel];
        if (level) {
            return level;
        } else {
            // TODO: fix warn message
            console.warn("[ngx-logger] Unrecognized logger level! Defaulting to 'INFO'.");
            return fallback ? fallback : LogLevel.INFO;
        }
    } else {
        return fallback ? fallback : LogLevel.INFO;
    }
}

export function overrideWithDefaults(config: LoggerConfiguration): LoggerConfiguration {
    if (!config) {
        // Return default configuration
        return {
            level: "INFO",
            disabled: false,
            loggers: {
                console: {
                    level: "INFO",
                    disabled: false
                }
            }
        };
    }

    config.level = config.level ? config.level : "INFO";

    if (config.loggers) {

        if (config.loggers.console) {
            config.loggers.console.level = config.loggers.console.level ? config.loggers.console.level : config.level;
        } else {
            // If no console logger is specified, create default one
            config.loggers.console = {
                level: "INFO",
                disabled: false
            };
        }

        if (config.loggers.http) {
            config.loggers.http.level = config.loggers.http.level ? config.loggers.http.level : config.level;
        }

        if (config.loggers.websocket) {
            config.loggers.websocket.level = config.loggers.websocket.level ? config.loggers.websocket.level : config.level;
        }
    } else {
        config.loggers = {
            console: {
                level: "INFO",
                disabled: false
            }
        };
    }

    return config;
}
