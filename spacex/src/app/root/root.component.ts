import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../services/api-services.service';
import { LaunchData } from '../../interfaces/launch-interfaces';
import { LAUNCH_VALUE, LANDING_VALUE, YEARS_VALUE } from '../../constantData/constantValues';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(private service: ApiServicesService) { }

  developerName: any = "Bhupendra Singh"
  rocketData: any
  launchList: LaunchData[] = [];
  yearValues: any
  launchValues: any
  landingValues: any

  ngOnInit(): void {
    this.homePage();
    this.getValues();
  }

  /**
   * set default limit 8
   */
  limit: number = 20;

  /**
   * Call the homePage method for get the homepage data
   */
  homePage() {
    this.service.getMethod(this.limit).subscribe((Data: LaunchData[]) => {
      this.rocketData = Data;
    },
      error => {
        return error
      }
    )
  }

  getValues(){
    this.launchValues = LAUNCH_VALUE;
    this.landingValues = LANDING_VALUE;
    this.yearValues = YEARS_VALUE;
  }

}
