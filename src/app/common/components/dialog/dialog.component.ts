import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DialogService } from './dialog.service';
import { DialogOptions } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'ncov-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public dialog: DialogOptions;
  public colDiv: number;

  constructor(
    private readonly dialogService: DialogService,
    private readonly router: Router
  ) { }

  public navigateToPath(path: string): void {
    this.router.navigate([path]);
  }

  public ngOnInit() {
    this.dialogService.dialogProperties.subscribe((properties) => {
      this.dialog = properties;
      this.colDiv = 12 / this.dialog.actions.length;
    });
  }

  public closeDialog(action: string) {
    if (this.dialog.routePath) {
      this.navigateToPath(this.dialog.routePath);
    }
    this.dialog = null;
    this.dialogService.afterClose(action);
  }
}
