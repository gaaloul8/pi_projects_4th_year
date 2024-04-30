import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../services/user-service.service";
import {Role, UserModel} from "../../models/userModel";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {DomSanitizer} from "@angular/platform-browser";
import {ChartData} from "chart.js";
import {ChartModule} from "primeng/chart";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@Component({

  selector: 'app-user-back',
  standalone: true,
    imports: [
        AsyncPipe,
        NgForOf,
        DialogModule,
        ButtonModule,
        RippleModule,
        TableModule,
        ToolbarModule,
        NgIf,
        NgOptimizedImage,
        ChartModule,
        FormsModule,
        InputTextModule
    ],
  templateUrl: './user-back.component.html',
  styleUrl: './user-back.component.scss'
})
export class UserBackComponent implements  OnInit{
    users: UserModel[];
    messageService: MessageService;
    deleteUserDialog: boolean = false;
    submitted: boolean = false;
    selectUserId: number;
    userDialog: boolean = false;
    totalUsers: number;
    totalClubs: number;

    usersByLevel: any;
    levels: string[];
    usersByLevelChartData: ChartData;
    totalUsersChartData: ChartData;
    searchTerm: string = '';



    user: UserModel = {};


    constructor(private userService: UserServiceService ,private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.users;
        this.getAllUsers();
        this.userService.getTotalUsers().subscribe(total => {
            this.totalUsers = total;
        });
        this.userService.getClubs().subscribe(total => {
            this.totalClubs = total;
        });
        this.userService.getUsersByLevel().subscribe(data => {
            this.usersByLevelChartData = {
                labels: Object.keys(data),
                datasets: [
                    {
                        data: Object.values(data),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                    }
                ]
            };
        });

    }


    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    getAllUsers(): void {
        this.userService.getAllUsers().subscribe(users => {
            this.users = users;
            if (this.users) {
                this.users.forEach(user => {
                    console.log(user.profilePicture);
                });
            } else {
                console.log("Users array is empty or undefined.");
            }
            console.log(users); // Log users array to inspect profilePicture field
        });
    }

    DeleteUser(id_user: number) {
        this.userService.deleteUser(id_user).subscribe(
            () => {
                if (this.messageService) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Deleted Successfully', life: 3000 });
                }

                this.getAllUsers();
            },
            (error) => {
                console.error('Error deleting event:', error);
                if (this.messageService) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete User', life: 3000 });
                }
            }
        );
        this.deleteUserDialog = false;
    }
    confirmDeleteUser(id_user: number) {
        this.selectUserId = id_user;
        this.deleteUserDialog = true;
        console.log('Dialog should be visible now');
    }
    PromoteUser(user: UserModel) {
        user.role = Role.ClubManager;
        this.userService.PromoteUser(user).subscribe(
            updatedUser => {
                console.log('User updated:', updatedUser);
                // Update the user's role locally
                //user.role = Role.ClubManager;
                console.log(user.id_user);
                console.log('Updated user:', user);
            },
            error => {
                console.error('User updating event:', error);
                console.log(user.role);
                console.log(Role.ClubManager);

            }
        );
        this.totalClubs=this.totalClubs+1;
    }
    filterUsers() {
        if (!this.searchTerm) {
            this.getAllUsers();
            return;
        }

        this.users = this.users.filter(user =>
            user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.identifiant.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.niveau.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    protected readonly Object = Object;
}
