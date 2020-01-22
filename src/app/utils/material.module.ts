import { NgModule } from '@angular/core';

import {
  MatTooltipModule,
  MatSidenavModule,
  MatButtonModule,
  MatGridListModule,
  MatSelectModule,
  MatMenuModule,
  MatInputModule,
  MatRadioModule,
  MatListModule,
  MatFormFieldModule,
  MatCardModule,
  MatCheckboxModule,
  MatTreeModule,
  MatIconModule,
  MatTabsModule,
  MatExpansionModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  // MatToolbarModule,
  // MatTabsModule,
  // MatIconModule,
  
  // MatButtonToggleModule,
  // MatProgressSpinnerModule,
  // MatProgressBarModule,
} from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

export const MATERIALS = [
  MatTooltipModule,
  MatSidenavModule,
  MatButtonModule,
  MatGridListModule,
  MatSelectModule,
  MatMenuModule,
  MatInputModule,
  MatRadioModule,
  MatListModule,
  MatFormFieldModule,
  MatCardModule,
  MatCheckboxModule,
  MatTreeModule,
  MatIconModule,
  MatTabsModule,
  MatExpansionModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatButtonToggleModule,

  MatChipsModule,
  MatDividerModule,
];

@NgModule({
  imports: [
    ...MATERIALS
  ],
  exports: [
    ...MATERIALS
  ],
})
export class MaterialModule {}
