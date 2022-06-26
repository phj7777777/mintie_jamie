import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {FirebaseService} from 'src/app/services/firebase.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';



@Component({
  selector: 'molla-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  orders: any[] = [];

  // console.log(this.firebaseService)
  constructor(private router: Router, private firestore: AngularFirestore, public firebaseService: FirebaseService) {

  }

  async ngOnInit(): Promise<void> {
    this.firestore.collection('orders')
      .snapshotChanges()
      .subscribe(docs => {
        this.orders = [];
        // @ts-ignore
        docs.forEach(doc => {

          let id = doc.payload.doc.id;
          let data = doc.payload.doc.data();
          // @ts-ignore
          let info = {...data};
          let products = [];

          for (let product of info?.products) {

            let result = {'name': product.price_data.product_data.name, 'quantity': product.quantity};
            products.push(result);

          }
          this.orders.push({id, info, products});

        });

      });


  }


  async updateStatus(event, previousValue, value, id) {
    event.preventDefault();
    Swal.fire({
      title: 'Confirm to update order #' + id + ' status?',
      text: 'Update from status:' + previousValue + 'to status: ' + value,
      showConfirmButton: true,
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this.firebaseService.updateData('orders', id, {'delivery_status': value});
      } else {
        event.target.value = previousValue
      }
    });
  }

  async updateTrackingID( event : any, id) {
    event.preventDefault();
    Swal.fire({
      title: 'Confirm to update tracking ID?',
      text: 'Update to tracking ID: ' + event.target.value,
      showConfirmButton: true,
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this.firebaseService.updateData('orders', id, {'tracking_id': event.target.value});

      } else {

        event.target.value = null
      }
    });
  }

}
