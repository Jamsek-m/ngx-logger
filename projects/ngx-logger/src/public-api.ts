/*
 * Public API Surface of ngx-logger
 */

export { Logger } from "./lib/logger";
export {
    LogLevel,
    LogLevelString,
    LogLevelEnum
} from "./models/logger.models";
export {
    LoggerConfiguration,
    SupportedLoggers,
    LogAppenderConfiguration,
    LogUrlProviderConfiguration,
    HttpProviderConfiguration
} from "./models/config.models";
