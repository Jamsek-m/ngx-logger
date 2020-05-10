import { Component, OnInit } from "@angular/core";
import { Logger } from "../../projects/ngx-logger/src/public-api";
import { Log } from "../../projects/ngx-logger/src/lib/log.decorator";

@Log()
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

    constructor(private logger: Logger) {
    }

    public ngOnInit(): void {

        this.logger.info("Test message", AppComponent.name);
        this.logger.info("Test message2", AppComponent.name);
        this.logger.info("Test message3", AppComponent.name);
        this.logger.info("Test message4", AppComponent.name);
        this.logger.info("Test message5", AppComponent.name);
        this.logger.info("Test message6", AppComponent.name);

        this.testTracing("123");
    }

    private testTracing(test: string) {
        console.log(`Testing method tracing ${test}...`);
    }

}
