import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
  { path: '', component: OrderComponent, pathMatch: 'full' },
  { path: 'chat', component: ChatComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
