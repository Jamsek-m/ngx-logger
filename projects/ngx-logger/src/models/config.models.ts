import { LogLevelString } from "./logger.models";
import { HttpClient } from "@angular/common/http";

export interface LogAppenderConfiguration {
    level?: LogLevelString;
    disabled?: boolean;
}

export interface LogUrlProviderConfiguration extends LogAppenderConfiguration {
    connectionUrl: string;
}

export interface HttpProviderConfiguration extends LogUrlProviderConfiguration {
    httpClient: HttpClient;
    sessionInitializationUrl: string;
}

export interface SupportedLoggers {
    console?: LogAppenderConfiguration;
    websocket?: LogUrlProviderConfiguration;
    http?: HttpProviderConfiguration;
}

export interface LoggerConfiguration {
    level?: LogLevelString;
    disabled?: boolean;
    tracingEnabled?: boolean;
    loggers?: SupportedLoggers;
}
