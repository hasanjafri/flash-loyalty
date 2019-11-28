import { AllCommunityModules } from "@ag-grid-community/all-modules";
import { Component } from "@angular/core";

@Component({
  selector: "app-view-vendors",
  templateUrl: "./view-vendors.component.html",
  styleUrls: ["./view-vendors.component.scss"]
})
export class ViewVendorsComponent {
  columnDefs = [
    { field: "name" },
    { field: "email" },
    { field: "last_active" }
  ];

  rowData = [
    {
      name: "Hasan",
      email: "hasan.jafri7@gmail.com",
      last_active: new Date().toDateString()
    },
    {
      name: "Safdar",
      email: "safdar.abbas@brighttechnologies.ca",
      last_active: new Date().toDateString()
    }
  ];

  modules = AllCommunityModules;

  onGridReady(event) {
    event.api.sizeColumnsToFit();
  }
}
