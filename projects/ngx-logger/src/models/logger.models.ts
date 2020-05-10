export type LogLevelString = "TRACE" | "FINE" | "DEBUG" | "INFO" | "WARN" | "ERROR";


export enum LogLevel {
    TRACE = 1000,
    FINE = 2000,
    DEBUG = 3000,
    INFO = 4000,
    WARN = 5000,
    ERROR = 6000
}

export namespace LogLevelEnum {
    export function toString(level: LogLevel): LogLevelString {
        switch (level) {
            case LogLevel.TRACE:
                return "TRACE";
            case LogLevel.FINE:
                return "FINE";
            case LogLevel.DEBUG:
                return "DEBUG";
            case LogLevel.INFO:
                return "INFO";
            case LogLevel.WARN:
                return "WARN";
            case LogLevel.ERROR:
                return "ERROR";
        }
        return null;
    }
}

export interface LogMessage {
    message: string;
}

export class HttpMessage implements LogMessage {

    public message: string;
    public session: any;

    public static create(message: string): HttpMessage {
        const msg = new HttpMessage();
        msg.message = message;
        return msg;
    }

}


