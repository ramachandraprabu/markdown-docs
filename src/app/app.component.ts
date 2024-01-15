
import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CODE_SNIPPETS } from './code-snippets';
import { Broadcaster } from './common/broadcaster';

declare var require: any;
declare var PR: any;

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'app';
  public activeDevice = 'android';
  public treeJson: any;
  public snippets: any;

  @ViewChild('markdown') markdown: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private broadcaster: Broadcaster) { }

  ngOnInit() {

    this.http.get('assets/data/tree-view.json')
      .subscribe(treeJson => this.treeJson = [treeJson]);
    
    // Showing the firts doc on page load
    this.snippets = CODE_SNIPPETS[Object.keys(CODE_SNIPPETS)[0]];
    setTimeout(_ => this.runPrettyPrint(), 10);

    this.broadcaster.on('select')
      .subscribe((item: any) => {
        if (item.type === 'file') {
          this.snippets = CODE_SNIPPETS[item.path];
          setTimeout(_ => this.runPrettyPrint(), 10);
        }
      })
  }

  public runPrettyPrint() {
    Array.from(document.querySelectorAll('pre')).forEach(pre => {
      pre.classList.add('prettyprint');
      PR.prettyPrint();
    })
  }

}