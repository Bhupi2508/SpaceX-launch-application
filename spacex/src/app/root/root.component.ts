import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServicesService } from '../services/api-services.service';
import { LaunchData } from '../../interfaces/launch-interfaces';
import { LAUNCH_VALUE, LANDING_VALUE, YEARS_VALUE } from '../../constantData/constantValues';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(private service: ApiServicesService, private route: ActivatedRoute, private router: Router) { }

  developerName: any = "Bhupendra Singh"
  rocketData: any
  launchList: LaunchData[] = [];
  yearValues: any;
  launchValues: any
  landingValues: any
  year: any
  launch: any
  landing: any
  appliedYear: any
  isLanded: any
  isLaunched: any

  ngOnInit(): void {
    this.getValues();
    this.queryParameter()
  }

  /**
   * set default limit 8
   */
  limit: number = 20;

  /**
   * year filter
   */
  clickOnYear(yearSelected: LaunchData,) {
    this.year = yearSelected;
    this.launch = yearSelected;
    this.landing = yearSelected;
    this.homePage()
    this.rootPage()
    this.queryParameter()
  }

  /**
   * Get the query params from url
   */
  queryParameter() {
    this.route.queryParamMap.subscribe((params) => {
      this.appliedYear = params.get('year');
      this.isLanded = params.get('landing');
      this.isLaunched = params.get('launch');
      this.homePage();
    });
  }

  /**
 * Navigate to the root page to play around with the filters.
 */
  rootPage() {
    this.router.navigate(['/root'], {
      queryParams: {
        year: this.year,
        launch: this.isLaunched,
        landing: this.isLanded,
      },
    });
  }

  /**
   * Call the homePage method for get the homepage data
   */
  homePage() {
    this.service.getMethod(this.year, this.launch, this.landing, this.limit).subscribe((Data: LaunchData[]) => {
      this.rocketData = Data;
    },
      error => {
        return error
      }
    )
  }

  getValues() {
    this.launchValues = LAUNCH_VALUE;
    this.landingValues = LANDING_VALUE;
    this.yearValues = YEARS_VALUE;
  }

}
