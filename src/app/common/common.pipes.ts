import { Pipe, PipeTransform, NgModule } from '@angular/core';
import * as marked from 'marked';
import * as Prism from 'prismjs';

interface MarkedOptions {
  renderer: Object,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
}

/**
 * Usage: <div [innerHTML]="content|markdown"></div>
 */
@Pipe({name: 'markdown'})
export class MarkdownPipe implements PipeTransform {
    public transform(markdown: string, options?: MarkedOptions): string {
        if (markdown == null) return '';
        // const code = marked(markdown, options);
        // return Prism.highlight(code, Prism.languages.javascript);
        return marked(markdown, options);
    }

    public static setOptions(options: MarkedOptions): void {
        marked.setOptions(options);
    }
}

@Pipe({name: 'StringConcat'})
export class StringConcatPipe implements PipeTransform {
  transform(markdown: string = ''): string {
    return markdown.replace(/^\s+|\s+$/gm, '');
  }
}

const COMMON_PIPES = [
  MarkdownPipe,
  StringConcatPipe
];

@NgModule({
  declarations: COMMON_PIPES,
  exports: COMMON_PIPES
})
export class CommonPipesModule {}