import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  selectedSegment: string = 'all';
  constructor(private router: Router) { }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  redirect_to_details() {
    this.router.navigate(['/details']);
  }

  redirect_to_home() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }
}
