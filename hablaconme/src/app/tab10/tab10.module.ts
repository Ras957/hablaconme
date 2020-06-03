import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab10Page } from './tab10.page';
import { TranslateModule } from '@ngx-translate/core';
import { KeysPipe } from '../servicios/keys.pipe';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab10Page }]),
    TranslateModule.forChild()

  ],
  declarations: [Tab10Page, KeysPipe]
})
export class Tab10PageModule {}


