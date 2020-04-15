import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesRoutingModule } from './sites-routing.module';
import { SiteAddComponent } from './site-add/site-add.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { SitesListComponent } from './sites-list/sites-list.component';
import { SitesComponent } from './sites/sites.component';


@NgModule({
  declarations: [
    SiteAddComponent,
    SiteSettingsComponent,
    SitesListComponent,
    SitesComponent
  ],
  imports: [
    CommonModule,
    SitesRoutingModule
  ]
})
export class SitesModule { }
