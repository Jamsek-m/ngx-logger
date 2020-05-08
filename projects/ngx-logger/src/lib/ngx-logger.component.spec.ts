import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NgxLoggerComponent } from "./ngx-logger.component";

describe("NgxLoggerComponent", () => {
    let component: NgxLoggerComponent;
    let fixture: ComponentFixture<NgxLoggerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgxLoggerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxLoggerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
