import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoleDto } from 'src/app/model/RoleDto';
import { RoleService } from 'src/app/service/role/role.service';
import swal from 'sweetalert2';

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

  editRole(role: RoleDto) {
    localStorage.setItem("roleId", role.roleId.toString());
    this.router.navigate(["role/details"]);
  }
  
  deleteRole(role: RoleDto) {
    swal.fire({
      title: 'Eliminar',
      text: '¿Estás seguro de que deseas eliminar este rol?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.roleService.removeRole(role.roleId)
          .subscribe(response => {
            console.log(response.status)
            if (response.status === 200) {
              this.role = this.role.filter(s => s !== role);
              swal.fire('Eliminado', 'El rol ha sido eliminado.', 'success');
            } else {
              swal.fire('Cancelado', 'No se eliminó el rol.', 'error');
            }
          })
      } else {
        swal.fire('Cancelado', 'No se eliminó el rol.', 'error');
      }
    });
  }

}
