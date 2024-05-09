import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-custom-notification',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './custom-notification.component.html',
  styleUrl: './custom-notification.component.scss'
})
export class CustomNotificationComponent {
    @Input() message: string = '';
    show: boolean = false;

    display(message: string, duration: number = 3000) {
        this.message = message;
        this.show = true;
        setTimeout(() => this.show = false, duration);
    }

}
