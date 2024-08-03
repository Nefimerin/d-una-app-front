import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponseDto } from 'src/app/model/UserResponseDto';
import { UserService } from 'src/app/service/user/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  @Input('users') users!: UserResponseDto[];
  errors: string[] = [];

  ngOnInit(): void {
    this.userService.findAllUsers().subscribe((response) => {
      this.users = response;
    }, err => {
      this.errors = err.error;
      console.error('Error al cargar usuarios:', this.errors);
    });
  }

  editUser(user: UserResponseDto) {
    localStorage.setItem("userId", user.id.toString());
    this.router.navigate(["users/details"]);
  }

  deleteUser(user: UserResponseDto) {
    swal.fire({
      title: 'Eliminar',
      text: '¿Estás seguro de que deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.userService.removeUser(user.id).subscribe(response => {
          if (response.status === 200) {
            this.users = this.users.filter(u => u !== user);
            swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          } else {
            swal.fire('Cancelado', 'No se eliminó el usuario.', 'error');
          }
        }, err => {
          swal.fire('Error', 'Ocurrió un error al eliminar el usuario.', 'error');
          console.error('Error al eliminar usuario:', err);
        });
      } else {
        swal.fire('Cancelado', 'No se eliminó el usuario.', 'error');
      }
    });
  }
}
