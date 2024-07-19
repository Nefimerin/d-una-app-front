import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoleDto } from 'src/app/model/RoleDto';
import { RoleService } from 'src/app/service/role/role.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent {

  constructor(private roleService: RoleService, private router: Router) {

  }
  @Input('role') role!:RoleDto[];
  errors: string[] = [];

  ngOnInit(): void {
    this.roleService.findAll().subscribe((response) => {
      this.role = response;
    })
  }

}