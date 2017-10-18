import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../Service/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IBook } from '../Models/book';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
@Component({
    templateUrl: 'app/Components/book.component.html'

})
export class BookComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    books: IBook[];
    book: IBook;
    msg: string;
    indLoading: boolean = false;
    bookFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    listFilter: string;

    constructor(private fb: FormBuilder, private _bookService: BookService) { }

    ngOnInit(): void {
        this.bookFrm = this.fb.group({
            Id: [''],
            Name: ['', Validators.required],
            Author: [''],
            Publisher: ['', Validators.required],
            Price: ['', Validators.required]
        });
        this.LoadBooks();
    }

    LoadBooks(): void {
        this.indLoading = true;
        this._bookService.get(Global.BASE_BOOK_ENDPOINT)
            .subscribe(books => { this.books = books; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    addBook() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Book";
        this.modalBtnTitle = "Add";
        this.bookFrm.reset();
        this.modal.open();
    }

    editBook(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Book";
        this.modalBtnTitle = "Update";
        this.book = this.books.filter(x => x.Id == id)[0];
        this.bookFrm.setValue(this.book);
        this.modal.open();
    }

    deleteBook(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.book = this.books.filter(x => x.Id == id)[0];
        this.bookFrm.setValue(this.book);
        this.modal.open();
    }

    readBook(id: number) {
        this.dbops = DBOperation.read;
        this.SetControlsState(false);
        this.modalTitle = "Show Book";
        this.modalBtnTitle = "Show";
        this.book = this.books.filter(x => x.Id == id)[0];
        this.bookFrm.setValue(this.book);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.bookFrm.enable() : this.bookFrm.disable();
    }

    //Metod for Publisher-filter
    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._bookService.post(Global.BASE_BOOK_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadBooks();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                        
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._bookService.put(Global.BASE_BOOK_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadBooks();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

            case DBOperation.read:
                this._bookService.read(Global.BASE_BOOK_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully got.";
                            this.LoadBooks();
                        }
                        else {
                            this.msg = "There is some issue in get data, please contact to system administrator!"
                        }                        
                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

            case DBOperation.delete:
                this._bookService.delete(Global.BASE_BOOK_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadBooks();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
        }
    }
}