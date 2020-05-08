export type LogLevelString = "FINE" | "DEBUG" | "INFO" | "WARN" | "ERROR";


export enum LogLevel {
    FINE = 1000,
    DEBUG = 2000,
    INFO = 3000,
    WARN = 4000,
    ERROR = 5000
}

export namespace LogLevelEnum {
    export function toString(level: LogLevel): LogLevelString {
        switch (level) {
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


