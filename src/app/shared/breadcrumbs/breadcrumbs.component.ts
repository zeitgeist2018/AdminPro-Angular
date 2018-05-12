import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  private titlePrefix: string = 'AdminPro - ';
  public title: string;

  constructor(private _router: Router,
    private _title: Title,
    private _meta: Meta) {
    this.getRouteData()
      .subscribe(data => {
        // Title
        this.title = data.title;
        this._title.setTitle(this.titlePrefix + data.title);
        // Meta tags
        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.title
        };
        _meta.updateTag(metaTag);
      });
  }

  ngOnInit() {
  }

  getRouteData(): Observable<any> {
    return this._router.events
      .pipe(
        filter(event => {
          return event instanceof ActivationEnd;
        }),
        filter((activationEnd: ActivationEnd) => {
          return activationEnd.snapshot.firstChild === null;
        }),
        map(data => {
          console.log(data);
          return data.snapshot.data;
        })
      );
  }

}
