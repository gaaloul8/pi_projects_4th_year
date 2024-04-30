import { Component, OnInit } from '@angular/core';
import { ClubService,Club } from 'src/app/services/club.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Tag } from '../../interfaces/tag';


@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.scss'
})
export class ClubsComponent implements OnInit {
  clubs: Club[] = [];
  clubForm: FormGroup;
  clubDialog: boolean = false;
  submitted: boolean = false;
  club: Club = {};
  deleteClubDialog: boolean = false;
  selectedClubId: number;
  messageService: MessageService;
  showConfirmation:boolean = false;
  tagValues = Object.values(Tag);
  selectedImage: any;
  selectedClub: Club;
  selectedFile: File;
  
  

  constructor(private clubService: ClubService,private formbuilder:FormBuilder) {
    
  }
  ngOnInit(): void {
    this.onGetAllClubs();
    this.clubForm = this.formbuilder.group({
      image: [''], // Initialize clubForm with form controls
      clubName: ['' ],
      description: ['' ],
      membershipCount: [''],
      tag: ['']
    });
    
    
    
    
    
  }
  onGetAllClubs(): void {
    this.clubService.getAllClubs()
      .subscribe((response: Club[])=> {
        console.log('All clubs:', response);
        this.clubs = response;
      }, error => {
        console.error('Error fetching clubs:', error);
      });
  }
  /*addClub(): void {
    this.submitted = true;
    try {
        this.clubService.addClub(this.club).toPromise();
        console.log("Club created Successfully");
        this.clubDialog = false;
        window.location.reload();
    } catch (error) {
        console.error(error);

    }
}*/
addClub(): void {
  this.submitted = true;
  try {
    // Pass the selected file to the addClub method
    this.clubService.addClub(this.clubForm.value, this.selectedImage).toPromise();
    console.log("Club created Successfully");
    this.clubDialog = false;
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
 onImageSelected(event: any) {
   this.selectedImage=event.target.files[0];
 }


openNew() {
  this.club = {};
  this.submitted = false;
  this.clubDialog = true;
}
hideDialog() {
  this.clubDialog = false;
  this.submitted = false;
}

/*deleteClub(clubId: number): void {
  this.clubService.deleteClub(clubId).subscribe(
    () => {
      if (this.messageService) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Club Deleted Successfully', life: 3000 });
      }
      // Update the clubs array without reloading the page
      this.clubs = this.clubs.filter(club => club.clubId !== clubId);
      this.deleteClubDialog = false;
    },
    error => {
      console.error('Error deleting club:', error);
      if (this.messageService) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete club', life: 3000 });
      }
      this.deleteClubDialog = false;
    }
  );
}*/
deleteClub(clubId: number): void {
  this.clubService.deleteClub(clubId).subscribe(
    () => {
      // Remove the deleted club from the clubs array
      this.clubs = this.clubs.filter(club => club.clubId !== clubId);
      // Close the delete confirmation modal
      this.deleteClubDialog = false;
      // Optionally, you can display a success message here
      window.location.reload();
    },
    error => {
      console.error('Error deleting club:', error);
      // Optionally, you can display an error message here
      // Close the delete confirmation modal
      this.deleteClubDialog = false;
    }
  );
}





confirmDelete(clubId: number){
  this.selectedClubId = clubId;
  this.deleteClubDialog = true;
}
updateClub(club : Club) {
  this.showConfirmation= true;
  this.clubService.updateClub(club).subscribe(
      updatedClub => {
          console.log('Club updated:', updatedClub);
          // Réussite : Gérer la réponse mise à jour si nécessaire
      },
      error => {
          console.error('Error updating club:', error);
          // Erreur : Gérer les erreurs si nécessaire
      }
  );
}
//  editClub(clubEdit : Club) {
//    this.club = { ...clubEdit };
//    this.clubDialog = true;
//  }

editClub(club: Club) {
  this.selectedClub = club; // Set the selected club

  // Set the form values to the selected club's values
  this.clubForm.patchValue({
    clubName: club.clubName,
    description: club.description,
    membershipCount: club.membershipCount,
    tag: club.tag
    // Exclude 'image' control from being set
  });

  // Set the selected image
  this.selectedImage = club.image ? 'data:image/png;base64,' + club.image : '';

  this.clubDialog = true; // Open the dialog
}

/*onImageSelected(event: any) {
  console.log("Image selected:", event.target.files[0]);
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.selectedFile = file; // Store the selected file for uploading
  }
}*/


showDialogToAdd(): void {
  this.clubForm.reset();
  this.clubDialog = true;
}
confirmUpdate(): void {
  // Close the confirmation dialog
  this.showConfirmation = false;
  this.clubDialog = false;
  // Call the updateClubService to update the club
  this.clubService.updateClub(this.club).subscribe(
    updatedClub => {
      console.log('Club updated:', updatedClub);
      this.clubDialog = false;
      // Optionally, perform any other actions upon successful update
    },
    error => {
      console.error('Error updating club:', error);
      // Optionally, display an error message or perform any other error handling
    }
  );
}

cancelUpdate(): void {
  // Close the confirmation dialog
  this.showConfirmation = false;
  
}
generatePDF(): void {
  // Call the PDF generation endpoint
  this.clubService.generatePDF().subscribe(
      (response: Blob) => {
          // Create a blob URL for the PDF content
          const url = window.URL.createObjectURL(response);

          // Create an anchor element
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = 'clubs.pdf';

          // Prompt the user to save the file
          anchor.click();

          // Clean up
          window.URL.revokeObjectURL(url);
      },
      error => {
          console.error('Error generating PDF:', error);
          // Optionally, display an error message or handle the error
      }
  );
}






}