import { Logger } from "../../projects/ngx-logger/src/public-api";
import { HttpClient } from "@angular/common/http";

export function AppInitFactory(logger: Logger, http: HttpClient) {
    return async () => {
        await logger.initialize({
            level: "DEBUG",
            loggers: {
                websocket: {
                    connectionUrl: "ws://localhost:3000/socket"
                },
                http: {
                    connectionUrl: "http://localhost:3000/logs",
                    httpClient: http
                }
            }
        });
    };
}
