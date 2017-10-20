import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDtoService } from '../Service/userDTO.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IUserDTO } from '../Models/userDTO';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/Components/userDTO.component.html'
})

@Injectable()
export class UserDtoComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;

    usersDto: IUserDTO[];
    userDto: IUserDTO;

    msg: string;
    indLoading: boolean = false;
    userFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;


    constructor(private fb: FormBuilder, private _userDtoService: UserDtoService) { }

    ngOnInit(): void {
        this.userFrm = this.fb.group({
            Id: [''],
            Email: [''],
            Password: [''],
            UserName: [''],
            Name: [''],
            Role: [''],
            IsBanned: [''],
        });

        this.LoadUsersDto();
    }

    LoadUsersDto(): void {
        this.indLoading = true;
        //this._userDtoService.getData()
         //   .subscribe(usersDto => { this.usersDto = usersDto; this.indLoading = false });
          //  error => this.msg = <any>error);
        this._userDtoService.get(Global.BASE_USER_DTO_ENDPOINT)
          .subscribe(usersDto => { this.usersDto = usersDto; this.indLoading = false; },
           error => this.msg = <any>error);
    }

}