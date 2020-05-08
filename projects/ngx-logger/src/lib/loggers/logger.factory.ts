import { ILogger } from "../../models/logger.interface";
import { ConsoleLogger } from "./console.logger";
import { WebsocketLogger } from "./websocket.logger";
import { HttpLogger } from "./http.logger";

export class LoggerFactory {

    public static getInstance(loggerType: string): ILogger {
        switch (loggerType) {
            case "console":
                return new ConsoleLogger();
            case "websocket":
                return new WebsocketLogger();
            case "http":
                return new HttpLogger();
            default:
                throw new Error("Unrecognized type!");
        }
    }

}
