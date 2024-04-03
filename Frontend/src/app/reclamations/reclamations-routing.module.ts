import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReclamationListComponent} from "./reclamation-list/reclamation-list.component";
import {ArchivedReclamationsComponent} from "./archived-reclamations/archived-reclamations.component";
import {AddReclamationComponent} from "./add-reclamation/add-reclamation.component";

const routes: Routes = [
    { path: '',  component: ReclamationListComponent},
    { path: 'archived', component: ArchivedReclamationsComponent },
    { path: 'add', component: AddReclamationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationsRoutingModule {

}
