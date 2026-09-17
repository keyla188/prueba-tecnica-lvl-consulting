import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-tooltip',
  styleUrl: './tooltip.css',
  templateUrl: './tooltip.html',
})
export class Tooltip {
  readonly text = input.required<string>();
}
