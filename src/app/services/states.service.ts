import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  // routes = {
  //   menu: 'menu',
  //   game: 'game',
  //   players: 'players'
  // }

  private currentRouteSubject = new BehaviorSubject<string>('/');
  currentRoute$ = this.currentRouteSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {}

  init() {
    console.log('Current path:', this.router.url);

    this.currentRouteSubject.next(this.router.url);

    this.router.events
      .subscribe((event: any) => {
        // console.log('EVENT', event); // todos los eventos de router
        if (event instanceof NavigationEnd)
          this.currentRouteSubject.next(event.urlAfterRedirects);
      });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}

/*

<a [routerLink]="['/game']">Ir a Game</a>
<a [routerLink]="['/game']" [queryParams]="{level: 3}">Game nivel 3</a>

<a [routerLink]="['/menu']" routerLinkActive="active">Menú</a>

//* Con query params
this.router.navigate(['/menu'], { queryParams: { foo: 'bar' } });

//* Reemplazar la URL en el historial (sin crear una entrada nueva)
this.router.navigate(['/menu'], { replaceUrl: true });


if (someCondition) {
  this.router.navigate(['/menu']);
}

private location: Location

goBack() {
  this.location.back();
}
*/