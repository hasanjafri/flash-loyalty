import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {
  graphData = [];
  graphDataSub = new BehaviorSubject(this.graphData);

  constructor(private http: HttpClient) {}

  async pullGraphData() {
    const currentToken = localStorage.getItem('api_token');
    if (!currentToken) {
      console.log('yeyeyeyeyeye123123');
      return false;
    } else {
      const res = await this.http.get('http://localhost:5000/auth/loadTableData').toPromise();
      if (res['status'] === '200') {
        this.graphData = res['data'];
        this.graphDataSub.next(this.graphData);
        return true;
      } else {
        return false;
      }
    }
  }
}
