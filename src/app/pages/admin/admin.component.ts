import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router} from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  
  // console.log(this.firebaseService)
  constructor(private router: Router, private firestore: AngularFirestore, public firebaseService: FirebaseService) {
    
  }

  ngOnInit(): void {
    console.log(this.firebaseService.userData)
  }
}
