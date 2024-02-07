import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public isAuthenticated = false

  constructor(public modal: ModalService, public auth: AuthService) {
    this.auth.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status
    })
  }

  openModal($event: Event) {
    $event.preventDefault()
    console.log('toggle modal auth');

    this.modal.toggleModal('auth')
  }
}
