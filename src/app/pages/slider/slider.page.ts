import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Swiper } from 'swiper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect_to_home() {
    this.router.navigate(['/home']);
  }

  nextSlide() {
    const swiper = this.swiperRef?.nativeElement.swiper as Swiper;
    swiper.slideNext();
  }
}
