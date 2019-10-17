import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarios'
})
export class UsuariosPipe implements PipeTransform {


  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.usuario.toLowerCase().includes(query.toLowerCase()) ||
             data.nombre.toLowerCase().includes(query.toLowerCase()) ||
             data.nombre_cliente.toLowerCase().includes(query.toLowerCase()) ||
             data.nombre_rol.toLowerCase().includes(query.toLowerCase()) ||
             data.email.toLowerCase().includes(query.toLowerCase());
    });
  }

}
