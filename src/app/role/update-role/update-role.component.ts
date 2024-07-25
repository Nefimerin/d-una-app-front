import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleDto } from 'src/app/model/RoleDto';
import { RoleService } from 'src/app/service/role/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent {

  roleForm !: FormGroup;
  errores !: string [];
  roleModel: RoleDto = new RoleDto('','',0)



  constructor(private roleService: RoleService, private frombuilder: FormBuilder, private router: Router) {
    this.roleForm = this.createFormRole();
  }

  ngOnInit(): void {
    const roleId = +localStorage.getItem('roleId')!;
    this.roleService.findRoleById(roleId).subscribe(
      response => {
        const responseData = response;
        if (responseData) {
          this.roleForm.patchValue({
            roleId: responseData.roleId,
            name: responseData.name,
            description: responseData.description,
          });
        }
      },
      error => {
        console.error('Error al obtener el rol:', error);
      }
    );
  }


  createFormRole() {
    return new FormGroup({
      roleId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    });
  }


  saveRole() {
    Object.assign(this.roleModel,this.roleForm.value);
    this.roleService.updateRole(this.roleModel).subscribe(response => {
        Swal.fire('Rol actualizado!', `Rol ${response.name} ha sido creado!`, 'success');
        this.router.navigate(['/role/list']);
      },
      err => {
        this.errores = err.error as string [];
        Swal.fire('Rol NO actualizado!', `Verifique los campos e intente nuevamente `, 'error');
      }
    );
  }


  get roleId() { return this.roleForm.get('roleId'); }
  get name() { return this.roleForm.get('name'); }
  get description() { return this.roleForm.get('description'); }


}
