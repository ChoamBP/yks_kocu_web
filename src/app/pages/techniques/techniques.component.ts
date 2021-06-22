import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.css'],
})
export class TechniquesComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {}

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
