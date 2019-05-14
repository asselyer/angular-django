import { RouterModule, Routes }   from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LibraryComponent } from './components/library/library.component';
import { AboutComponent } from './components/about/about.component';

export const appRoutes: Routes = [
    { path: '', 
      component: HomeComponent 
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'library',
      component: LibraryComponent
  
    },
    {
      path: 'about',
      component: AboutComponent
    },
  
  ];
  export default appRoutes;