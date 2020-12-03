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
  // yearValues: Array<Filters> = [];
  // launchValues: Array<Filters> = [];
  // landingValues: Array<Filters> = [];

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
  clickOnYear(field: string, LaunchSelected: Filters, action: string) {
    console.log("after clickOnUrl : ", field, "=> ", LaunchSelected, "=> ", action);

    this.MappingFromClick(field, LaunchSelected);
    console.log("after MappingFromClick : ", field, "=> ", LaunchSelected, "=> ", action);

    this.genericFilter(action, LaunchSelected)
    console.log("after genericFilter 1 : ", action, "=> ", LaunchSelected);

    // this.year = LaunchSelected;
    // this.launch = LaunchSelected;
    // this.landing = LaunchSelected;
    this.rootPage()
    // this.queryParameter()
  }


  /**
   * @param field mapped values
   * @param Properties getting all the values
   */
  MappingFromClick(field: any, properties: any) {
    this[field].map((property: { isSelected: boolean; value: any; year: number }) => {
      console.log("Property : ", property);
      console.log("Properties ===>> : ", properties);
      property.isSelected =
        property.value === properties.value ? !property.isSelected : false;
    });
  }

  /**
  * Updating the filter which is been sent from child component.
  * Navigate to a new page.
  * @param payload contains which property to update and the selection property.
  */
  genericFilter(action: string, LaunchSelected: Filters) {
    console.log("after genericFilter 2 ", action, "=> ", LaunchSelected);

    this.action = LaunchSelected
      ? LaunchSelected
      : undefined;

    console.log("action ", this.action);

    this.rootPage();
    // this.homePage();
  }

  /**
   * Get the query params from url
   */
  queryParameter() {
    this.route.queryParamMap.subscribe((params) => {
      console.log("year : ", this.params);

      this.appliedYear = params.get('year');
      console.log("year : ", this.appliedYear);

      this.isLanded = params.get('landing');
      console.log("landing : ", this.isLanded);

      this.isLaunched = params.get('launch');
      console.log("launch : ", this.isLaunched);

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
        launch: this.launch,
        landing: this.landing,
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
