import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-accountlocked',
  standalone: true,
  imports: [],
  templateUrl: './accountlocked.component.html',
  styleUrl: './accountlocked.component.scss'
})
export class AccountlockedComponent implements OnInit {
    remainingTime: number = 0;

    constructor() { }

    ngOnInit(): void {
        const storedTime = localStorage.getItem('lockedTime');
        if (storedTime) {
            const lockedDate = new Date(storedTime);
            const currentDate = new Date();
            const differenceInSeconds = Math.floor((currentDate.getTime() - lockedDate.getTime()) / 1000);
            this.remainingTime = Math.max(0, 3600 - differenceInSeconds); // 1 hour in seconds
            this.startCountdown();
        }
    }

    startCountdown() {
        const interval = setInterval(() => {
            this.remainingTime--;
            if (this.remainingTime <= 0) {
                clearInterval(interval);
                console.log('Countdown finished!');
            }
        }, 1000);
    }

    formatTime(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
    }

    padZero(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }

}

