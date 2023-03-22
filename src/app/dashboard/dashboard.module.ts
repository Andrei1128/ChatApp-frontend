import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { ConvComponent } from './conv/conv.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PeopleComponent } from './people/people.component';
import { RequestComponent } from './request/request.component';

@NgModule({
  declarations: [MainComponent, ConvComponent, PeopleComponent, RequestComponent],
  imports: [CommonModule, DashboardRoutingModule, ReactiveFormsModule],
})
export class DashboardModule {}
