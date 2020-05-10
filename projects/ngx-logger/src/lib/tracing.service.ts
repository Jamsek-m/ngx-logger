import { Injectable } from "@angular/core";
import { Logger } from "./logger";

@Injectable({
    providedIn: "root"
})
export class TracingService {

    public static logger: Logger = null;

    constructor(private logger: Logger) {
        TracingService.logger = logger;
    }

    public initializeTracing(): void {
        // noop - needed for lazy loaded service to be registered
    }

}
