import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import {Router} from '@angular/router';

@Component({
  selector: 'molla-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  Orders: any[] = [
    {
      "number": "001"
    },
    {
      "number": "002"
    },
    {
      "number": "003"
    },
    {
      "number": "004"
    }
  ]
  
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  data = [ 'a', 'b', 'c' ]
}
