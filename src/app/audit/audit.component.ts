import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserList, User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })

export class AuditComponent implements OnInit {
    dtOptions: DataTables.Settings = {};
   
    currentUser: User;
    users =new Array<UserList>();
    dtTrigger: Subject<any> = new Subject<any>();

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.dtOptions = {
            searching:false,
            paging:true,
            pagingType: 'full_numbers',
            pageLength: 2
        }
        this.loadAllUsers();
    }


    loadAllUsers() {
        this.userService.auditList(this.currentUser['_id'])
            .pipe(first())
            .subscribe(users =>{
                for(var i=0;i<users.length;i++){
                    this.users.push(new UserList(users[i]['_id'],users[i]['username'],users[i]['role'],users[i]['loginTime'],users[i]['logoutTime']));
                }
                this.dtTrigger.next();
            });
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
}