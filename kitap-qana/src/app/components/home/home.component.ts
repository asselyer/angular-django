import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BookList } from 'src/app/models/book-list';
import { Book } from 'src/app/models/book';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {


  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    

  }

 
}