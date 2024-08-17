import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleDto } from 'src/app/model/RoleDto';
import { RoleService } from 'src/app/service/role/role.service';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {
  roleForm !: FormGroup;
  errores !: string [];
  roleModel: RoleDto = new RoleDto('','',0)




  constructor(private roleService: RoleService, private frombuilder: FormBuilder, private router: Router) {
    this.roleForm = this.createFormRole();
  }

  createFormRole() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    });
  }


  saveRole() {
    Object.assign(this.roleModel,this.roleForm.value);
    this.roleService.saveRole(this.roleModel).subscribe(response => {
        Swal.fire('Rol registrado!', `Rol ${response.name} ha sido creado!`, 'success');
        this.router.navigate(['role/list']);
      },
      err => {
        this.errores = err.error as string [];
        Swal.fire('Rol NO registrado!', err.error.message, 'error');
      }
    );
  }

  get name() { return this.roleForm.get('name'); }
  get description() { return this.roleForm.get('description'); }

}
