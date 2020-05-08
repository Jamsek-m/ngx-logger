import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppInitFactory } from "./factories";
import { Logger } from "../../projects/ngx-logger/src/public-api";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        {provide: APP_INITIALIZER, useFactory: AppInitFactory, multi: true, deps: [Logger, HttpClient]}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
