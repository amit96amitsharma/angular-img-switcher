import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgSelectorRoutingModule } from './img-selector-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ImgSelectorRoutingModule
  ]
})

export class ImgSelectorModule { }
