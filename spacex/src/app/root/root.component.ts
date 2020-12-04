import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServicesService } from '../services/api-services.service';
import { LaunchData } from '../../interfaces/launch-interfaces';
import { Filters } from '../../interfaces/launch-interfaces';
import { LAUNCH_VALUE, LANDING_VALUE, YEARS_VALUE } from '../../constantData/constantValues';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  [x: string]: any;

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
   * Get the query params from url
   */
  queryParameter() {
    this.route.queryParamMap.subscribe((params) => {
      this.appliedYear = params.get('year');
      this.isLanded = params.get('landing');
      this.isLaunched = params.get('launch');

      // Service call
      this.homePage();
    });
  }

  /**
   * set default limit 20
   */
  limit: number = 20;

  /**
   * @param {SelectedFilter} : get the value after click on event for year filter 
   */
  clickOnYear(SelectedFilter: Filters) {
    this.appliedYear = SelectedFilter.value;
    this.rootPage()
  }

  /**
   * @param {field} : get the properties of click event from constant data
   * @param {SelectedFilter} : get the value after click on event for launch filter
   */
  clickOnLaunch(field: string, SelectedFilter: Filters) {
    this.MappingFromClick(field, SelectedFilter);
    this.isLaunched = SelectedFilter.value;
    this.rootPage();
  }

  /**
   *@param {field} : get the properties of click event from constant data
   * @param {SelectedFilter} : get the value after click on event for land filter
   */
  clickOnLand(field: string, SelectedFilter: Filters) {
    this.MappingFromClick(field, SelectedFilter);
    this.isLanding = SelectedFilter.value;
    this.rootPage()
  }


  /**
   * @param field mapped values
   * @param Properties getting all the values
   */
  MappingFromClick(field: any, properties: any) {
    this[field].map((property: { isSelected: boolean; value: any; year: number }) => {

      // condition based on click event
      property.isSelected = property.value === properties.value ? !property.value : false;
    });

  }

  /**
   * Navigate to the root page to play around with the filters.
   */
  rootPage() {
    this.router.navigate(['/root'], {
      queryParams: {
        year: this.appliedYear,
        launch: this.isLaunched,
        landing: this.isLanding,
      },
    });
  }

  /**
   * Call the homePage method for get the data
   */
  homePage() {
    this.service.getMethod(this.appliedYear, this.isLaunched, this.isLanding, this.limit).subscribe((Data: LaunchData[]) => {
      this.rocketData = Data;
    },
      error => {
        return error
      }
    )
  }

  // get all the filter constant data
  getValues() {
    this.launchValues = LAUNCH_VALUE;
    this.landingValues = LANDING_VALUE;
    this.yearValues = YEARS_VALUE;
  }

}
