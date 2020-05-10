import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


  // Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data.
  // They should focus on presenting data and delegate data access to a service.
  constructor(public messageService: MessageService) {
  } // The messageService property must be public because you're going to bind to it in the template.

  ngOnInit(): void {
  }

}
