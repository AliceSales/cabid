import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  selectedSegment: string = 'all';
  @ViewChild('searchBar') searchBar: IonSearchbar;
  showCameraIcon: boolean = true;
  constructor(private router: Router) { }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  redirect_to_details() {
    this.router.navigate(['/details']);
  }

  toggleCameraIcon() {
    this.showCameraIcon = !this.showCameraIcon;
  }

  clearSearch() {
    this.searchBar.value = '';
    this.toggleCameraIcon();
  }
}
