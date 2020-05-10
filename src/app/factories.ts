import { Logger } from "../../projects/ngx-logger/src/public-api";
import { HttpClient } from "@angular/common/http";
import { TracingService } from "../../projects/ngx-logger/src/lib/tracing.service";

export function AppInitFactory(logger: Logger, tracing: TracingService, http: HttpClient) {
    return async () => {
        tracing.initializeTracing();
        await logger.initialize({
            level: "TRACE",
            loggers: {
                /*console: {
                    level: "FINE"
                },*/
                websocket: {
                    disabled: true,
                    connectionUrl: "ws://localhost:3000/socket"
                },
                http: {
                    disabled: true,
                    connectionUrl: "http://localhost:3000/logs",
                    sessionInitializationUrl: "http://localhost:3000/session",
                    httpClient: http
                }
            }
        });
    };
}
