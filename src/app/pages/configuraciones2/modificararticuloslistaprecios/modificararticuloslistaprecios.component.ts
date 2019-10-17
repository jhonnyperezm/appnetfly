import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ModificararticuloslistapreciosService} from './modificararticuloslistaprecios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificararticuloslistaprecios',
  templateUrl: './modificararticuloslistaprecios.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificararticuloslistapreciosService]
})
export class ModificararticuloslistapreciosComponent implements OnInit {

  idLista: any;
  nombreLista: any;
  DataLista: any = [];
  DataJsonClases: any = [];
  searchStringCla: any;
  itempageCla = 5;

  ListaClases: any = [];
  DataListasPrecios: any = [];
  DataJsonClasesSel: any = [];
  registrosClases: any = [];
  searchStringArtCla: any;
  itempageArtCla = 5;
  DataModificada: any = [];
  searchStringArti: any;
  itempageArti = 5;
  DataArrayLP: any = [];
  DataJsonArticulos: any = [];
  registrosArticulos: any = [];
  valorVacio = false;

  tc :number=1;
  ta :number=1;
  cla:number=1;


  @ViewChild('importarForm', {static: true})
  private importarForm: NgForm;

  @ViewChild('importarClaForm', {static: true})
  private importarClaForm: NgForm;

  constructor(public router: Router,
              public modificararticuloslistapreciosService: ModificararticuloslistapreciosService,
              public toastr: ToastrService,
              private route: ActivatedRoute) {
    this.idLista = this.route.snapshot.params.idLista;
    this.nombreLista = this.route.snapshot.params.nombreLista;
    this.DataLista.baseOtraList = 0;
  }

  ngOnInit() {
    this.LoadListaPrecios();
    this.LoadClasesVenta();
  }

  Regresar() {
    this.router.navigate(['configuraciones2/listaprecios']);
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadListaPrecios() {
    this.modificararticuloslistapreciosService.getListasPrecios().subscribe(
      data => {
        console.log(data);
        this.DataArrayLP = data;
        this.DataListasPrecios = [];
        for (const key of this.DataArrayLP) {
          if (parseInt(key.id_lista_precios, 0) !== parseInt(this.idLista, 0)) {
            this.DataListasPrecios.push({
              'id_lista_precios': key.id_lista_precios,
              'nombre': key.nombre
            });
          }
        }
      }
    );
  }

  LoadClasesVenta() {
    this.modificararticuloslistapreciosService.getClasesVenta().subscribe(
      data => {
        console.log(data);
        for (const key of data) {
          this.DataJsonClases.push({
            'id': key.id,
            'nombre': key.nombre,
            'checked': false
          });
        }
      }
    );
  }

  onChange(data, isChecked: boolean) {
    if (isChecked === true) {
      const existe = this.DataJsonClasesSel.filter(x => parseInt(x.id, 0) === data.id);
      if (existe.length === 0) {
        this.DataJsonClasesSel.push(
          {
            'id': data.id,
            'nombre': data.nombre
          }
        );
      }
    } else {
      for (let i = 0; i < this.DataJsonClasesSel.length; i++) {

        let index;
        if (data.id === parseInt(this.DataJsonClasesSel[i].id, 0) && isChecked === false) {
          index = this.DataJsonClasesSel.indexOf(this.DataJsonClasesSel[i]);
          this.DataJsonClasesSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonClases.length; i++) {
      if (data.id === this.DataJsonClases[i].id) {
        this.DataJsonClases[i].checked = isChecked;
      }
    }
  }

  MostrarClasesSel() {
    for (const key of this.DataJsonClasesSel) {
      this.ListaClases.push({
        'id': this.registrosClases.length,
        'id_clase': key.id,
        'nombre': key.nombre,
      });
      this.registrosClases.push('clases1');
    }
  }

  QuitarClaseArticulo(datos) {
    for (let i = 0; i < this.ListaClases.length; i++) {
      let index = '';
      if (parseInt(datos.id, 0) === parseInt(this.ListaClases[i].id, 0)) {
        index = this.ListaClases.indexOf(this.ListaClases[i]);
        this.ListaClases.splice(index, 1);
      }
    }
  }

  Verificar(datosModificar) {

    this.DataModificada = [];
    console.log(datosModificar);
    const lista = {
      clase: []
    };

    for (const key of this.ListaClases) {
      lista.clase.push(
        {
          'id': key.id_clase
        }
      );
    }

    const cambioprecios = {
      listas: []
    };

    cambioprecios.listas.push({
      'id_lista': this.idLista,
      'base_otra_lista': datosModificar.baseOtraList,
      'id_lista_copiar': datosModificar.baseLista,
      'caracteristica': datosModificar.caracteristica,
      'tipo_valor': datosModificar.tipovalor,
      'cantidad': datosModificar.cantidad,
      'tipo_clase': datosModificar.clase,
      'clases': lista.clase
    });
    this.modificararticuloslistapreciosService.postCambioPrecios(cambioprecios.listas).subscribe(
      data => {
        this.DataModificada = data;
        this.DataJsonArticulos = [];
        console.log(this.DataModificada);
        for (const key of this.DataModificada) {
          this.DataJsonArticulos.push({
            'id': this.registrosArticulos.length,
            'id_articulo': key.id_articulo,
            'nombre': key.nombre,
            'valor_venta': key.valor_venta,
            'valor_venta_nuevo': key.valor_venta_nuevo,
          });
          this.registrosArticulos.push('registrosaArticulos1');
        }
        /* if (data.text() === 'success') {
          this.router.navigate(['/dashboard/listaprecios']);
          Swal.fire({
            title: 'Exitoso',
            text: 'La importación se realizo de manera exitosa',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'El proceso no se realizo correctamente',
            type: 'error',
          });
        } */
      }
    );

  }


  changeValue(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    if (editField === '') {
      this.toastr.info('El valor de venta no puede estar vacio', 'Verificar');
    } else if (parseInt(editField, 0) === 0) {
      this.toastr.info('El valor de venta no puede ser 0', 'Verificar');
    } else {
    }
  }

  updateProductoModal(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.DataJsonArticulos[id][property] = editField.trim();
  }

  ValidarArray() {
    const existe = this.DataJsonArticulos.filter(x => x.valor_venta_nuevo === '');
    if (existe.length === 0) {
      this.valorVacio = false;
    } else {
      this.valorVacio = true;
    }
  }

  Modificar(datos) {
    console.log(datos);
    const listas = {
      precios: []
    };
    for (const key of datos) {
      listas.precios.push({
        'id_articulo': key.id_articulo,
        'id_lista_precios': this.idLista,
        'valor_venta': key.valor_venta_nuevo
      });
    }
    this.modificararticuloslistapreciosService.updateListaPrecios(listas.precios, this.idLista).subscribe(
      data => {
        console.log(data);

        this.router.navigate(['configuraciones2/listaprecios']);
        if (data.text() === 'success') {
          Swal.fire({
            title: 'Lista precios',
            text: 'El proceso se realizo existosamente',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Lista precios',
            text: 'El proceso NO se realizo existosamente',
            type: 'error',
          });
        }
      }
    );
  }

  LimpiarListaClases() {
    this.ListaClases = [];
  }
}
