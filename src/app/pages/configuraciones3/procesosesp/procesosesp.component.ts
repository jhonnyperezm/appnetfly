import {Component, OnInit, ViewChild} from '@angular/core';
import {ProcesosespService} from './procesosesp.service';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

// import * as XLSX from 'XLSX';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

type AOA = any[][];
const PADDING = '000000';
declare const $;

@Component({
  selector: 'app-procesosesp',
  templateUrl: './procesosesp.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ProcesosespService, SidebarComponent]
})
export class ProcesosespComponent implements OnInit {
  p:number=1;
  DataImportar: any = [];
  DataFile: any;
  datosImportar: any = [];
  DataArrayClases: any = [];
  arrayClases: any = [];
  arrayUnidades: any = [];
  extensionCorrecta = false;
  ArticulosError: any = [];
  searchStringTArt: any;
  itempageTArt = 5;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;

  DataArrayArticulos: any = [];
  DataJsonArticulos: any = [];
  DataValArticulo: any = [];
  DataJsonFaltantes: string;
  DataJsonFaltantes2: any;
  DataCliente: any = [];
  codigopluanterior: any;

  // EXCEL
  // wopts: XLSX.WritingOptions = {bookType: 'xlsx', type: 'array'};
  // fileName = 'ExcelParaImportacion.xlsx';

  @ViewChild('ArticulosImportForm', {static: true})
  public ArticulosImportForm: NgForm;

  constructor(
    public procesosEspService: ProcesosespService,
    public toastr: ToastrService,
    public sidebarComponent: SidebarComponent) {
    this.LoadDataCliente();
    this.LoadClases();
    this.LoadUnidades();
    this.LoadUltimoCodigoPlu();
  }

  ngOnInit() {
  }

  LoadDataCliente() {
    this.procesosEspService.getDatosCliente().subscribe(
      data => {
        console.log(data[0]);
        this.DataCliente = data[0];
      }
    );
  }

  LoadClases() {
    this.procesosEspService.getClasesArticulo().subscribe(
      data => {
        console.log(data);
        this.DataArrayClases = data;
        for (const key of this.DataArrayClases) {
          for (const key2 of key.grupoVentaInvPojo) {
            this.arrayClases.push({
              'idClase': key.id,
              'nombreClase': key.nombre,
              'idGrupo': key2.id,
              'nombreGrupo': key2.nombre
            });
          }
        }
      }
    );
  }

  LoadUnidades() {
    this.procesosEspService.getUnidadesVenta().subscribe(
      data => {
        console.log(data);
        this.arrayUnidades = data;
      }
    );
  }

  LoadUltimoCodigoPlu() {
    this.procesosEspService.getUltimoCodigoPlu().subscribe(
      data => {
        console.log(data);
        this.codigopluanterior = data.text();
      }
    );
  }

  Descargar(): void {

    // const clases = {
    //   datos: []
    // };

    // const unidades = {
    //   datos: []
    // };

    // const articulos = {
    //   datos: []
    // };
    // clases.datos.push([['CLASES Y GRUPOS']], []);
    // clases.datos.push([['Id Clase'],
    //   ['Nombre Clase'],
    //   ['Id Grupo'],
    //   ['Nombre Grupo']
    // ]);

    // for (const key of this.arrayClases) {
    //   clases.datos.push([
    //     [key.idClase], // A1
    //     [key.nombreClase], // B1
    //     [key.idGrupo], // B1
    //     [key.nombreGrupo]
    //   ]);
    // }

    // unidades.datos.push([['UNIDADES DE VENTA']], []);
    // unidades.datos.push([['Id Unidad'],
    //   ['Nombre Unidad']
    // ]);
    // for (const key of this.arrayUnidades) {
    //   console.log(key);
    //   unidades.datos.push([
    //     [key.id],
    //     [key.nombre]
    //   ]);
    // }


    // if (this.DataCliente.manejaCodplu === true) {
    //   articulos.datos.push([['DATOS ARTICULOS'], [], [], ['Codigo Plu Anterior:'], [this.codigopluanterior]], []);
    //   articulos.datos.push([['Nombre articulo'],
    //     ['Codigo barras'],
    //     ['Venta'],
    //     ['Id Clase'],
    //     ['Id Grupo'],
    //     ['Codigo Plu'],
    //     ['Id Unidad Venta'],
    //     ['Precio']
    //   ]);
    // } else {
    //   articulos.datos.push([['DATOS ARTICULOS']], []);
    //   articulos.datos.push([['Nombre articulo'],
    //     ['Codigo barras'],
    //     ['Venta'],
    //     ['Id Clase'],
    //     ['Id Grupo'],
    //     ['Id Unidad Venta'],
    //     ['Precio']
    //   ]);
    // }
    // const wscols = [
    //   {wch: 15},
    //   {wch: 15},
    //   {wch: 15},
    //   {wch: 15},
    //   {wch: 15},
    //   {wch: 15},
    //   {wch: 15},
    //   {wch: 15}
    // ];
    // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(clases.datos);
    // const ws1: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(unidades.datos);
    // const ws2: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(articulos.datos);
    // ws['!cols'] = wscols;
    // ws1['!cols'] = wscols;
    // ws2['!cols'] = wscols;
    // // generate workbook and add the worksheet
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Clases');
    // XLSX.utils.book_append_sheet(wb, ws1, 'Unidades');
    // XLSX.utils.book_append_sheet(wb, ws2, 'Datos Articulo');
    // // save to file
    // XLSX.writeFile(wb, this.fileName);
    // /* this.array=''; */
  }


  onFileChange(evt, archivo) {
    // this.DataFile = evt;
    // console.log(evt);
    // console.log(archivo);
    // const extensiones_permitidas = new Array('.xlsx', '.xls');
    // let mierror = '';
    // $('.custom-file-label').html(evt.target.files[0].name);
    // if (!archivo) {
    //   // Si no tengo archivo, es que no se ha seleccionado un archivo en el formulario
    //   mierror = 'No has seleccionado ningún archivo';
    //   this.toastr.error('No has seleccionado ningún archivo', 'Error');
    // } else {
    //   // recupero la extensión de este nombre de archivo
    //   const extension = (archivo.substring(archivo.lastIndexOf('.'))).toLowerCase();
    //   // alert (extension);
    //   // compruebo si la extensión está entre las permitidas
    //   let permitida = false;
    //   for (let i = 0; i < extensiones_permitidas.length; i++) {
    //     if (extensiones_permitidas[i] == extension) {
    //       permitida = true;
    //       break;
    //     }
    //   }
    //   if (!permitida) {
    //     this.toastr.error('Comprueba la extensión de los archivos a subir.\nSólo se pueden subir archivos con extensiones: ' +
    //       extensiones_permitidas.join(), 'Error');
    //     /*  mierror = 'Comprueba la extensión de los archivos a subir.\nSólo se pueden subir archivos con extensiones: ' +
    //      extensiones_permitidas.join(); */
    //     this.extensionCorrecta = false;
    //   } else {
    //     this.extensionCorrecta = true;
    //     return 1;
    //   }
    // }
    // return 0;
  }

  SubirArticulos(evt) {
    // $('#Progress').modal({backdrop: 'static'});
    // console.log(this.DataImportar.nombre);
    // console.log(evt);
    // if (evt === undefined) {
    //   this.toastr.error('No has seleccionado ningún archivo', 'Error');
    // } else {
    //   const target: DataTransfer = <DataTransfer> (evt.target);
    //   if (target.files.length !== 1) {
    //     throw new Error('Cannot use multiple files');
    //   }
    //   // if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    //   const reader: FileReader = new FileReader();
    //   reader.onload = (e: any) => {
    //     /* read workbook */
    //     const bstr: string = e.target.result;
    //     const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

    //     /* grab first sheet */
    //     const wsname: string = wb.SheetNames[2];
    //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    //     /* save data */
    //     this.datosImportar = <AOA> (XLSX.utils.sheet_to_json(ws, {header: 1}));
    //     // console.log(this.data2);
    //     this.estructuraClientes(this.datosImportar);
    //   };
    //   reader.readAsBinaryString(target.files[0]);
    // }
  }

  estructuraClientes(datos) {
    console.log(datos);
    const art = {
      importar: []
    };
    for (let i = 3; i < datos.length; i++) {
      if (datos[i].length >= 1) {
        if (this.DataCliente.manejaCodplu === true) {
          art.importar.push(
            {
              'nombre': datos[i][0],
              'codBarras': datos[i][1],
              'venta': datos[i][2],
              'idClase': datos[i][3],
              'idGrupo': datos[i][4],
              'codigoPlu': datos[i][5],
              'idUnidadVenta': datos[i][6],
              'valorVenta': datos[i][7]
            });
        } else {
          art.importar.push(
            {
              'nombre': datos[i][0],
              'codBarras': datos[i][1],
              'venta': datos[i][2],
              'idClase': datos[i][3],
              'idGrupo': datos[i][4],
              'idUnidadVenta': datos[i][5],
              'valorVenta': datos[i][6]
            });
        }
      }
    }

    this.procesosEspService.subirArticulos(art.importar, this.DataCliente.manejaCodplu).subscribe(
      resul => {
        console.log(resul);
        this.ArticulosError = [];
        $('#Progress').modal('hide');
        if (resul.text() === 'verificar archivo') {
          Swal.fire({
            title: 'Verificar',
            text: 'El archivo excel contiene celdas vacias',
            type: 'error',
          });
        } else if (resul.text() === 'articulos repetidos archivo') {
          Swal.fire({
            title: 'Verificar',
            text: 'El archivo excel contiene articulos que ya existen',
            type: 'error',
          });
        } else if (resul.text() === 'hay articulos que no son de venta') {
          Swal.fire({
            title: 'Error',
            text: 'hay articulos que no son de venta',
            type: 'error',
          });
        } else if (resul.text() === 'error') {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrio un error importando los articulos',
            type: 'error',
          });
        } else if (resul.text() === 'success') {
          Swal.fire({
            title: 'Exitoso',
            text: 'La información se importo correctamente',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: resul.text(),
            type: 'error',
          });
        }
      },
      error => {
        $('#Progress').modal('hide');
        Swal.fire({
          title: 'Error: ' + error.status,
          text: 'Se produjo un error cuando se subia la información',
          type: 'error',
        });
      }
    );
  }

  LimpiarFormArtImport() {
    this.ArticulosImportForm.reset();
  }

  ValidarArticulos() {
    this.loader = true;
    this.LoadTabla = false;
    this.LoadError = false;
    this.procesosEspService.validarArticulos().subscribe(
      data => {
        this.DataArrayArticulos = data;
        this.DataJsonArticulos = [];
        for (const key of this.DataArrayArticulos) {
          this.DataJsonArticulos.push({
            id: key.id,
            nombre: key.nombre,
            inventario: key.manejaInventario,
            venta: key.manejaVenta,
            receta: key.manejaReceta
          });
        }
        this.loader = false;
        this.LoadTabla = true;
      });
  }

  validarCaracteristica(caracteristica, datosArticulo) {
    console.log(caracteristica);
    console.log(datosArticulo);
    this.DataValArticulo = datosArticulo;

    if (caracteristica === 2) {
      this.DataValArticulo.modulo = 2; // Modulo Inventario
    } else if (caracteristica === 1) {
      this.DataValArticulo.modulo = 3; // Modulo Ventas
    } else if (caracteristica === 3) {
      if (datosArticulo.venta === 'n/a' && datosArticulo.inventario === 'no') {
        this.DataValArticulo.modulo = 2;
      } else if (datosArticulo.venta === 'no' && datosArticulo.inventario === 'n/a') {
        this.DataValArticulo.modulo = 3;
      } else if (datosArticulo.venta === 'no' && datosArticulo.inventario === 'no') {
        this.DataValArticulo.modulo = 1;
      } else {
        this.DataValArticulo.modulo = 4;
      }
    } else {
      this.DataValArticulo.modulo = 1;
    }
    this.procesosEspService.validarArticuloCaracteristica(datosArticulo.id, caracteristica).subscribe(
      data => {
        console.log(data.text());
        /* let pos = data.text().replace('\n', '<br />');
        console.log(pos); */
        this.DataJsonFaltantes = data.text();
        this.DataJsonFaltantes2 = data.text();

      });
  }

}
