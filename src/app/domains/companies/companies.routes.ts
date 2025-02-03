import { Routes } from "@angular/router";

import { CompanyListComponent } from "./company-list/company-list.component";
import { CompanyProfileComponent } from "./company-profile/company-profile.component";

export const routes: Routes = [
  { path: '', component: CompanyListComponent },
  { path: ':id', component: CompanyProfileComponent },
];