import { PipeTransform, Pipe } from '@angular/core';
import { IBook } from '../Models/book';

@Pipe({
    name: 'bookPublisherFilter'
})

export class BookPublisherFilterPipe implements PipeTransform {
    transform(value: IBook[], filter: string): IBook[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IBook) =>
            app.Publisher != null && app.Publisher.toLocaleLowerCase().indexOf(filter) != -1
            ): value;
    }
}