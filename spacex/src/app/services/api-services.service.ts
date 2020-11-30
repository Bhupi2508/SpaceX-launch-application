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

  getMethod(year: string, limit: number) {
    let homeUrl = `${this.parentUrl}/launches?limit=${limit}`;

    //if year is present
    if (year) {
      homeUrl = homeUrl + `&launch_year=${year}`;
    }

    return this.http.get<LaunchData[]>(homeUrl)
  }

}
