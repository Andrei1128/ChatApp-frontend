import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conv',
  templateUrl: './conv.component.html',
  styleUrls: ['./conv.component.scss'],
})
export class ConvComponent implements OnInit {
  @Input() friend: any;
  constructor() {}
  ngOnInit(): void {}
}
