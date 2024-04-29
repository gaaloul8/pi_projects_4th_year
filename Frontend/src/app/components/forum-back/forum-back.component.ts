import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api/messageservice';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppLayoutModule } from 'src/app/layout/app.layout.module';
import { Forum, ForumService, ForumStatus } from 'src/app/services/forum.service';


@Component({
  selector: 'app-forum-back',
  standalone: true,
  imports: [
        DialogModule ,
        TableModule,
        FileUploadModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        ToolbarModule,
        TableModule,
        HttpClientModule,
        CommonModule,
        CalendarModule,
        ReactiveFormsModule,
        DataViewModule
  ],
  templateUrl: './forum-back.component.html',
  styleUrl: './forum-back.component.scss'
})
export class ForumBackComponent implements OnInit{

  constructor(private renderer: Renderer2, private forumService: ForumService) { }
  ngOnInit(): void {
this.fetchForums();
this.forumStatusOptions = [
  { label: 'PENDING', value: ForumStatus.PENDING },
  { label: 'ACCEPTED', value: ForumStatus.ACCEPTED },
  { label: 'REJECTED', value: ForumStatus.REJECTED }
];
this.statuses = [
  { label: 'OPEN', value: false },
  { label: 'CLOSED', value: true },
];
  }

  forums: Forum[] = [];
  forumDialog: boolean = false;
  forum: Forum = {};
  ForumStatus: string[] = Object.values(ForumStatus);
  statuses: any[] = [];
  forumStatusOptions: any[] = [];
  showDropdown: boolean = false;
  submitted: boolean = false;
  deleteForumDialog: boolean = false;
  messageService : MessageService;
  selectedForumId: number;

  confirmDeleteForum() {
    this.forumService.deleteForum(this.selectedForumId).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Forum Deleted Successfully', life: 3000 });
      },
      (error) => {
        console.error('Error deleting forum:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete forum', life: 3000 });
      }
    );
    this.deleteForumDialog = false;
    window.location.reload();
  
  }
  confirmDelete(forumId: number){
    this.selectedForumId = forumId;
    this.deleteForumDialog = true;
  }
  editForum(forum: Forum) {
  
    this.showDropdown = true;
    this.forum = { ...forum };
    console.log(forum);
    this.forumDialog = true;
    this.forum.status = forum.status;
  }
  filterForumsByStatus(event) {
    const selectedType = event.value;
    this.forumService.searchForumByStatus(selectedType).subscribe(
      (forums) => {
        this.forums = forums;
      },
      (error) => {
        console.log('Error fetching forums:', error);
      }
    );
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

  async updateForum(){
    this.forum.forumOwner = { id_user: this.forum.forumOwner.id_user, role: this.forum.forumOwner.role }; 

    const newForum = await this.forumService.updateForum(this.forum.forumId,this.forum).toPromise();
    this.forumDialog = false; 
    window.location.reload();
  }
  fetchForums(): void {
    this.forumService.getAllForums().subscribe(
      (forums: Forum[]) => {
        this.forums = forums;
        console.log('Forums:', this.forums);
        
      },
      (error) => {
        console.log('Error fetching forums:', error);
      }
    );
  }
  

}
