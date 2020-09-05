import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoolInlineEditFieldModule } from '@angular-cool/inline-edit-field';
import { UiSwitchModule } from 'ngx-ui-switch';
import { SharedModule } from '../../shared/shared.module';
import { AbtestsRoutingModule } from './abtests-routing.module';
import { AbtestsActiveComponent } from './abtests-active/abtests-active.component';
import { AbtestsArchiveComponent } from './abtests-archive/abtests-archive.component';
import { VariantAddComponent } from './variant-add/variant-add.component';
import { AbtestAddComponent } from './abtest-add/abtest-add.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AbtestsActiveComponent,
    AbtestsArchiveComponent,
    VariantAddComponent,
    AbtestAddComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CoolInlineEditFieldModule,
    UiSwitchModule,
    SharedModule,
    AbtestsRoutingModule,
    ChartsModule
  ]
})
export class AbtestsModule { }
