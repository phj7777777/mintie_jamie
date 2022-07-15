import {Component, OnInit, ViewChild, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Product} from 'src/app/shared/classes/product';

import {ModalService} from 'src/app/shared/services/modal.service';
import {ApiService} from 'src/app/shared/services/api.service';
import {UtilsService} from 'src/app/shared/services/utils.service';

import {introSlider, homeData} from '../data';
import {shopData} from '../../shop/shared/data';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {FirebaseService} from '../../../services/firebase.service';

declare var $: any;

@Component({
  selector: 'molla-index',
  templateUrl: './../../others/coming-soon/coming-soon.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  }, {updateOn: 'submit'});


  constructor(private firebaseService: FirebaseService, private router: Router) {

  }

  ngOnInit(): void {

  }

  get email() {
    return this.form.get('email').value;
  };


  async addEmail() {
    if (this.form.valid) {
      await this.firebaseService.addData('emails', this.email, {
        email: this.email
      });
      await Swal.fire({
        icon: 'success',
        title: 'Subscribe Successfully!',
        text: 'Thanks for your support! Will update you once launching!',
        showConfirmButton: false,
        timer: 3000
      });
      this.form.reset()
    }
  }


}
