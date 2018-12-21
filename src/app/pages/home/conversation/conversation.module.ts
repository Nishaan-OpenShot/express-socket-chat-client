import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSupportModule } from './../../../modules/form-support/form-support.module';
import { ConversationComponent } from './conversation.component';

@NgModule({
  declarations: [ConversationComponent],
  imports: [
    CommonModule,
    FormSupportModule
  ],
  exports: [
    ConversationComponent
  ]
})
export class ConversationModule { }
