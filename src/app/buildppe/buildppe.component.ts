import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ncov-buildppe',
  templateUrl: './buildppe.component.html',
  styleUrls: ['./buildppe.component.scss']
})
export class BuildppeComponent implements OnInit {

  constructor(private router: Router) { }

  public ngOnInit() {
  }

}
