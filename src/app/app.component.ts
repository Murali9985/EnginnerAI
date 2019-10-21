import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataToDisplay;
  dataToDisplayTo;
  id: any;
  selectedIndex: any;
  authorData: any;
  subscribeTo;

  ngOnInit() {
    this.getData();

    this.subscribeTo = timer(0, 10000).pipe(switchMap(() => this.service.getData())).subscribe(response => {
      this.dataToDisplay = response,
        this.dataToDisplayTo = this.dataToDisplay.hits;
      console.log(this.dataToDisplayTo);
    })


    // this.subscribeTo = timer(0, 10000).pipe(
    //   switchMap(() => this.service.getData())
    // ).subscribe(resp => {
    //   console.log(resp)
    //   this.dataToDisplay = resp
    //   this.dataToDisplayTo = this.dataToDisplay.hits
    // });
    // ;
  }




  constructor(private ht: HttpClient, private service: DataService) {

  }

  getData() {
    this.ht.get('https://hn.algolia.com/api/v1/search_by_date?tags=story').subscribe(response => {
      this.dataToDisplay = response,
        this.dataToDisplayTo = this.dataToDisplay.hits;
      console.log(this.dataToDisplayTo);
    });
  }

  selectToShow(index, data) {
    this.authorData = data;
    this.selectedIndex = index;

    this.ht.post("http://localhost:3000/profile", data).subscribe(postedResponse => console.log(postedResponse))
    
  }

}
