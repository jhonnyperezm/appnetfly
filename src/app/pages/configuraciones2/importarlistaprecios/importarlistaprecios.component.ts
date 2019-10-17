import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ImportarlistapreciosService} from './importarlistaprecios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-importarlistaprecios',
  templateUrl: './importarlistaprecios.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ImportarlistapreciosService]
})
export class ImportarlistapreciosComponent implements OnInit {

  idLista: any;
  nombreLista: any;
  DataNewLista: any = [];
  DataListasPrecios: any = [];
  DataJsonClases: any = [];
  DataJsonClasesSel: any = [];
  ListaClases: any = [];
  searchStringCla: any;
  itempageCla = 5;
  searchStringArtCla: any;
  itempageArtCla = 5;
  registrosClases: any = [];

  tc :number=1;
  cla:number=1;

  @ViewChild('importarForm', {static: true})
  private importarForm: NgForm;

  @ViewChild('importarClaForm', {static: true})
  private importarClaForm: NgForm;

  constructor(public router: Router,
              public importarlistapreciosService: ImportarlistapreciosService,
              public toastr: ToastrService,
              private route: ActivatedRoute) {
    this.idLista = this.route.snapshot.params.idLista;
    this.nombreLista = this.route.snapshot.params.nombreLista;
    this.DataNewLista.caracteristica = 2;
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
    this.importarlistapreciosService.getListasPrecios().subscribe(
      data => {
        console.log(data);
        this.DataListasPrecios = data;
      }
    );
  }

  LoadClasesVenta() {
    this.importarlistapreciosService.getClasesVenta().subscribe(
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

  ImportarDatos(datosImport) {
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

    const importar = {
      listas: []
    };

    importar.listas.push({
      'id_lista': this.idLista,
      'id_lista_copiar': datosImport.id_lista_copiar,
      'caracteristica': datosImport.caracteristica,
      'tipo_valor': datosImport.tipovalor,
      'cantidad': datosImport.cantidad,
      'tipo_clase': datosImport.clase,
      'clases': lista.clase,
    });
    this.importarlistapreciosService.postImportar(importar.listas).subscribe(
      data => {
        if (data.text() === 'success') {
          this.router.navigate(['configuraciones2/listaprecios']);
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
        }
      }
    );
  }

  LimpiarListaClases() {
    this.ListaClases = [];
  }
}
