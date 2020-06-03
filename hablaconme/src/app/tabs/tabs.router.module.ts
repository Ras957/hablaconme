import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: '../tab4/tab4.module#Tab4PageModule'
          }
        ]
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: '../tab5/tab5.module#Tab5PageModule'
          }
        ]
      },
      {
        path: 'tab6',
        children: [
          {
            path: '',
            loadChildren: '../tab6/tab6.module#Tab6PageModule'
          }
        ]
      },
      {
        path: 'tab7',
        children: [
          {
            path: '',
            loadChildren: '../tab7/tab7.module#Tab7PageModule'
          }
        ]
      },
      {
        path: 'tab8',
        children: [
          {
            path: '',
            loadChildren: '../tab8/tab8.module#Tab8PageModule'
          }
        ]
      },
      {
        path: 'tab9',
        children: [
          {
            path: '',
            loadChildren: '../tab9/tab9.module#Tab9PageModule'
          }
        ]
      },
      {
        path: 'tab10',
        children: [
          {
            path: '',
            loadChildren: '../tab10/tab10.module#Tab10PageModule'
          }
        ]
      },
      {
        path: 'tab11',
        children: [
          {
            path: '',
            loadChildren: '../tab11/tab11.module#Tab11PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
