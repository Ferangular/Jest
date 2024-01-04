import {Component, ElementRef, ViewChild} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {CurrencyPipe, DatePipe, NgClass, NgOptimizedImage} from "@angular/common";
import {ProgressBarModule} from "primeng/progressbar";
import { MessageService, ConfirmationService } from 'primeng/api';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    TableModule,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    SliderModule,
    DatePipe,
    CurrencyPipe,
    ProgressBarModule,
    NgClass,
    ButtonModule,
    InputTextModule,
    NgOptimizedImage
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class DetailComponent {
  customers1: Customer[] = [];
  representatives: Representative[] = [];
  statuses: any[] = [];
  activityValues: number[] = [0, 100];

  loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;
  constructor() { }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string;
  status?: string;
  activity?: number;
  representative?: Representative;
}
export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}
