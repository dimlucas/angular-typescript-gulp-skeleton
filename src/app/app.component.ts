import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: 'app.component.html'
})
export class AppComponent{
    greetingMsg: string = "Hello World";

    ngOnInit(){
        //Init
    }
}