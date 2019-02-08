import {Routes} from '@angular/router';
import { SelectgadgetsComponent } from './selectgadgets/selectgadgets.component';
import { ResultComponent } from './result/result.component';

export const approutes: Routes = [

 {path:'select',component:SelectgadgetsComponent},
 {path:'result',component:ResultComponent},
 {path:'',redirectTo:'/select',pathMatch:'full'}
]