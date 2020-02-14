import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
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
