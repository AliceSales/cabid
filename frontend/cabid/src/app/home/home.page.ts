import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  selectedSegment: string = 'all';
  constructor(private router: Router) { }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  redirect_to_details() {
    this.router.navigate(['/details']);
  }
}
