import { LogLevel } from "../../models/logger.models";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { SocketMessage } from "../../models/socket.models";
import { LoggerConfiguration } from "../../models/config.models";
import { ILogger } from "../../models/logger.interface";
import { AppenderConfiguration } from "../configuration";

export class WebsocketLogger implements ILogger {

    private config: AppenderConfiguration;
    private connectionUrl: string = null;
    private sessionId: string = null;

    private socket$: WebSocketSubject<any>;

    initialize(config: AppenderConfiguration, globalConfig: LoggerConfiguration): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.config = config;

            if (!globalConfig.loggers.websocket.connectionUrl) {
                throw new Error("WebsocketLogger needs connection URL!");
            } else {
                this.connectionUrl = globalConfig.loggers.websocket.connectionUrl;
            }

            if (!this.config.disabled) {
                this.socket$ = webSocket(this.connectionUrl);
                this.initSession();
                this.socket$.subscribe((message: any) => {
                    if (message.type === "SESSION_START") {
                        this.sessionId = message.message.sessionId;
                        resolve();
                    }
                }, err => {
                    reject(err);
                });
            }
        });
    }

    private initSession() {
        const socketMessage: SocketMessage = {
            type: "SESSION_REQUEST",
            message: null
        };
        this.socket$.next(socketMessage);
    }

    async log(level: LogLevel, message: string): Promise<void> {
        if (this.config.logLevel <= level && !this.config.disabled) {
            return new Promise<void>(resolve => {
                // TODO: Define more in detail request body
                const socketMessage: SocketMessage = {
                    type: "LOG",
                    message: {
                        message,
                        session: this.sessionId
                    }
                };
                this.socket$.next(socketMessage);
                resolve();
            });
        }
    }

}
