import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { ChatsComponent } from './chats/chats.component';
import { FriendsComponent } from './friends/friends.component';
import { RequestsListComponent } from './friends/requests-list/requests-list.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chats',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'chats', component: ChatsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'settings', component: SettingsComponent },
      {
        path: 'friends',
        component: FriendsComponent,
        children: [
          { path: '', component: FriendsListComponent },
          { path: 'requests', component: RequestsListComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
