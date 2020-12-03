import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { LaunchData } from '../../interfaces/launch-interfaces'

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor(private http: HttpClient) { }

  private parentUrl = environment.parentUrl;

  getMethod(year: string, launch: string, landing: string, limit: number) {
    let homeUrl = `${this.parentUrl}/launches?limit=${limit}`;

    //if year is present
    if (year) {
      homeUrl = homeUrl + `&launch_year=${year}`;
    }

    //if launch filter is applicable
    if (launch) {
      const launches = launch === 'Yes' ? true : false;
      homeUrl = homeUrl + `&launch_success=${launches}`;
    }

    // if landing filter is applicable
    if (landing) {
      const landed = landing === 'Yes' ? true : false;
      homeUrl = homeUrl + `&land_success=${landed}`;
    }

    return this.http.get<LaunchData[]>(homeUrl)
  }

}
