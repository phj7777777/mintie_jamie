import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from "sweetalert2";

@Component({
	selector: 'pages-coming-soon',
	templateUrl: './coming-soon.component.html',
	styleUrls: ['./coming-soon.component.scss']
})

export class ComingSoonPageComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
  });

  get email() {
    return this.form.get("email");
  };


  constructor() {

  }

  ngOnInit(): void {
  }


  async addEmail() {
    if (this.form.valid) {
      await Swal.fire({
        icon: 'success',
        title: 'Subscribe Successfully!',
        text: 'Thanks for your support! Will update you once launching!',
        showConfirmButton: false,
        timer: 3000
      });
    }
  }

}
