import { Component } from '@angular/core';

@Component({
  selector: 'seed-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        FutureFarmist NAAS Seed 1.6
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Seed';
}
