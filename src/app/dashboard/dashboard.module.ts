import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatsComponent } from './chats/chats.component';
import { ProjectsComponent } from './projects/projects.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { RequestsListComponent } from './friends/requests-list/requests-list.component';
import { SettingsComponent } from './settings/settings.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ProfileComponent,
    ChatsComponent,
    ProjectsComponent,
    FriendsComponent,
    FriendsListComponent,
    RequestsListComponent,
    SettingsComponent,
    ChatComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, ReactiveFormsModule],
})
export class DashboardModule {}
