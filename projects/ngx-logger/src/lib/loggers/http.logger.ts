import { HttpMessage, LogLevel } from "../../models/logger.models";
import { ILogger } from "../../models/logger.interface";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { LoggerConfiguration } from "../../models/config.models";
import { AppenderConfiguration } from "../configuration";


export class HttpLogger implements ILogger {

    private config: AppenderConfiguration;
    private connectionUrl: string = null;
    private httpClient: HttpClient = null;
    private sessionId: string = null;

    initialize(config: AppenderConfiguration, globalConfig: LoggerConfiguration): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.config = config;

            if (!globalConfig.loggers.http.connectionUrl) {
                reject(new Error("HttpLogger needs connection URL!"));
            } else {
                this.connectionUrl = globalConfig.loggers.http.connectionUrl;
            }

            if (!globalConfig.loggers.http.httpClient) {
                reject(new Error("HttpLogger needs HttpClient dependency!"));
            } else if (!(globalConfig.loggers.http.httpClient instanceof HttpClient)) {
                reject(new Error("HttpLogger needs HttpClient dependency!"));
            } else {
                this.httpClient = globalConfig.loggers.http.httpClient;
            }
            resolve();
        });
    }

    log(level: LogLevel, message: string): Promise<void> {
        if (this.config.logLevel <= level && !this.config.disabled) {
            return new Promise<void>(resolve => {
                // TODO: Define more in detail request body

                const headers = new HttpHeaders();
                if (this.sessionId !== null) {
                    headers.set("X-Session-Id", this.sessionId);
                }
                this.httpClient
                    .post(this.connectionUrl, HttpMessage.create(message), {observe: "response", headers})
                    .subscribe((res: HttpResponse<any>) => {
                        this.sessionId = res.headers.get("X-Session-Id");
                        resolve();
                    }, (err: HttpErrorResponse) => {
                        // silent fail on error
                        resolve();
                    });
            });
        }
    }

}
