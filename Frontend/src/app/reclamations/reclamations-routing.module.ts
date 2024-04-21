import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReclamationListComponent} from "./reclamation-list/reclamation-list.component";
import {ArchivedReclamationsComponent} from "./archived-reclamations/archived-reclamations.component";
import {AddReclamationComponent} from "./add-reclamation/add-reclamation.component";
import {MyReclamationsComponent} from "./my-reclamations/my-reclamations.component";
import {ReclamationOverviewComponent} from "./reclamation-overview/reclamation-overview.component";
import {ReclamationAssignComponent} from "./reclamation-assign/reclamation-assign.component";
import {AssignedReclamationsComponent} from "./assigned-reclamations/assigned-reclamations.component";

const routes: Routes = [
    { path: '',  component: ReclamationListComponent},
    { path: 'archived', component: ArchivedReclamationsComponent },
    { path: 'add', component: AddReclamationComponent},
    { path: 'my', component: MyReclamationsComponent},
    { path: 'statistics', component: ReclamationOverviewComponent},
    { path: 'reclamation-assign/:id', component: ReclamationAssignComponent},
    { path: 'assigned', component: AssignedReclamationsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationsRoutingModule {

}
