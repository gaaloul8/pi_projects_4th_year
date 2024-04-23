import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ForgetComponent } from "./components/forget/forget.component";
import { ResetComponent } from "./components/reset/reset.component";
import {CompleteprofileComponent} from "./components/completeprofile/completeprofile.component";
import {TakeimageComponent} from "./components/takeimage/takeimage.component";
import {RegisterWithCardComponent} from "./components/register-with-card/register-with-card.component";
import {UserBackComponent} from "./components/user-back/user-back.component";

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            {path:'users',component:UserBackComponent},

        ]
    },
    { path: 'auth/reset-password/:resetToken', component: ResetComponent },

    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    {path:'welcome', component: WelcomeComponent},

    { path: 'register', component: RegisterComponent },
    {path:'complete', component: CompleteprofileComponent},
    {path:'registerWithcard',component:RegisterWithCardComponent},

    {path:'takeimage',component:TakeimageComponent},
    { path: 'login', component: LoginComponent },
    { path: 'forget', component: ForgetComponent },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
