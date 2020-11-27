import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../services/api-services.service'

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(private service: ApiServicesService) { }

  rocketData: any

  ngOnInit(): void {
    this.homePage();
  }

  /**
   * set default limit 8
   */
  limit: number = 4;

  /**
   * Call the homePage method for get the homepage data
   */
  homePage() {
    this.service.getMethod(this.limit).subscribe((Data: any) => {
      this.rocketData = Data
    },
      error => {
        return error
      }
    )
  }

}
