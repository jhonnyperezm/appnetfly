import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuraciones2',
  template: `
  <app-header></app-header>
  <main>
    <app-sidebar></app-sidebar>
    <div class="row miga">
      <div class="col-md-12">
        <xng-breadcrumb separator=">"></xng-breadcrumb>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <router-outlet></router-outlet>
      </div>
    </div>
  </main>
  <app-footer></app-footer>
  `,
  styles: []
})
export class Configuraciones2Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
