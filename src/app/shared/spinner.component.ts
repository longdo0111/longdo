import { Component, Input, OnInit } from "@angular/core";
import { SpinnerService } from "./spinner.service";

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})

export class OverlaySpinnerComponent{
    isLoading$ = this.spinnerService.loading$;
    constructor(public spinnerService: SpinnerService) {}
}