import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresararticulosService {

  private baseUrlCliente = 'cliente/';
  private baseUrlClientePunto = 'clientePunto/';
  private baseUrlClases = 'clases/';
  private baseUrlGrupos = 'grupoVentaInv/';
  private baseUrlUnidad = 'unidad/';
  private baseUrlArticulo = 'articulos/';
  private baseUrlPuntoBodega = 'puntoBodega/';
  private baseUrlTablaConversion = 'TablaConversion/';
  private baseUrlPuntoArticulo = 'puntoArticulos/';
  private baseUrlArticuloInventario = 'articuloinventario/';
  private baseUrlArticuloGrupo = 'articulosGrupos/';
  private baseUrlMaximosMinimos = 'maximosMinimos/';
  private baseUrlArticuloPuntoMaxMin = 'PuntoArticulosMaxmin/';
  private baseUrlArticuloUnidad = 'articulocomprasUnidadcompra/';
  private baseUrlArticuloInvBodegas = 'articuloinventarioBodega/';
  private baseUrlArticuloTablaConversion = 'articulocomprasConversion/';
  // private baseUrlCanalImpuesto = 'canalImpuesto/';
  private baseUrlListaPrecios = 'listaPrecios/';
  private baseUrlGrupoSeleccion = 'grupoSeleccion/';
  private baseUrlClienteCanal = 'clienteCanal/';
  private baseUrlArticulosGrupoSeleccion = 'articulosGrupoSeleccion/';
  private baseUrlArticuloVentaCanal = 'articuloventaCanalImpuesto/';
  private baseUrlArticuloListaPrecios = 'articulosListaPrecios/';
  private baseUrlArticuloUnidadAlterna = 'articuloventaUnidadAlterna/';
  private baseUrlArticuloGruposSeleccionCant = 'articulosGrupoSeleccionCantidad/';
  private baseUrlArticuloReceta = 'articuloreceta/';
  private baseUrlArticuloRecetaPunto = 'articulorecetaPuntos/';
  private baseUrlArticuloRecetaCanal = 'articulorecetaCanal/';
  private baseUrlArticuloRecetaIngredientes = 'articulorecetaIngredientes/';
  private baseUrlHistricoIngredientes = 'historicoIngredientes/';
  private baseUrlArticuloEmpaque = 'articuloempaque/';
  private baseUrlArticuloEmpaqueArticulo = 'articuloempaqueArticulos/';
  private baseUrlGruposEmpaque = 'gruposEmpaque/';
  private baseUrlGruposEmpaqueArticulos = 'gruposEmpaqueArticulos/';
  private baseUrlArticulos = 'articulos/';
  private baseUrlClientesImpuesto = 'clienteImpuesto/';
  private baseUrlCanalCliente = 'clienteCanal/';
  private baseUrlImpuestoVenta = 'impuestosventas/';
  private baseUrlImpuestoVentaCanal = 'impuestosventasCanal/';
  private baseUrlArticulosImpuestosVenta = 'articulosImpuestosventas/';
  private baseUrlArticuloUnidadPresentacion = 'articuloUnidadesPresentacion/';


  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;
  idCliente: any;

  constructor(public http: Http,
    public rutasService: RutasService) {
      this.path = this.rutasService.getPath();
      this.rol = localStorage.getItem('rol');
      this.idCliente = localStorage.getItem('cli');
      if (this.idCliente === 1) {
        this.token = localStorage.getItem('token');
      } else {
        this.token = localStorage.getItem('tokenCliente');
      }
      this.headers = new Headers({
        'Content-Type': 'application/json',
        'token': this.token
    });
    this.options = new RequestOptions({ headers: this.headers });
    }
  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getPuntosCliente() {
    const response = this.http.get(this.path + this.baseUrlClientePunto + 'findClientePuntoByIdCliente/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getClasesCliente() {
    const response = this.http.get(this.path + this.baseUrlClases + 'findClasesInventario', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getGrupoPorClase(idClase) {
    const response = this.http.get(this.path + this.baseUrlGrupos + 'findGrupoByIdClaseTipo/' + idClase + '/' + 2 + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createClase(DataJson) {
    const response = this.http.post(this.path + this.baseUrlClases + 'createClase', DataJson, this.options);
    return response;
  }
  createGrupo(DataJson) {
    const response = this.http.post(this.path + this.baseUrlGrupos + 'createGrupo', DataJson, this.options);
    return response;
  }
  getImpuestosPorCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlClientesImpuesto + 'findClienteImpuestoByIdImpUsa/' + idCliente, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getCanalesPorCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlCanalCliente + 'findClienteCanalById/' + idCliente, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postImpuestoVenta(DataList) {
    const response = this.http.post(this.path + this.baseUrlImpuestoVenta + 'createImpuestosventas', DataList, this.options);
    return response;
  }
  getUnidadKardex() {
    const response = this.http.get(this.path + this.baseUrlUnidad + 'findUnidadKardex', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getUnidadAlterna() {
    const response = this.http.get(this.path + this.baseUrlUnidad + 'findUnidadAlterna', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createUnidadAlterna(DataJson) {
    const response = this.http.post(this.path + this.baseUrlUnidad + 'createUnidad', DataJson, this.options);
    return response;
  }
  createMaximoMinimo(DataJson) {
    const response = this.http.post(this.path + this.baseUrlMaximosMinimos + 'createMaxMin', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getUnidadCompra() {
    const response = this.http.get(this.path + this.baseUrlUnidad + 'findUnidadCompra', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getEquivalenciaTablaConversion(idUnidadKardex, idUnidadCompra) {
    const response = this.http.get(this.path + this.baseUrlTablaConversion + 'findConversionByIdKardexIdCompra/'
     + idUnidadKardex + '/' + idUnidadCompra, this.options).pipe(map(res => res.json()));
    return response;
  }
  createUnidadCompra(DataJson) {
    const response = this.http.post(this.path + this.baseUrlUnidad + 'createUnidad', DataJson, this.options);
    return response;
  }
  updateUnidadCompra(DataJson) {
    const response = this.http.put(this.path + this.baseUrlUnidad + 'updateUnidad', DataJson, this.options);
    return response;
  }
  getUnidadesPersonalizadas(unidadKardex) {
    const response = this.http.get(this.path + this.baseUrlTablaConversion +
    'findConversionByIdKardexCliente/' + unidadKardex, this.options).pipe(map(res => res.json()));
    return response;
  }
  getSitiosPunto(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoBodega + 'findBodegaByListPunto/', DataList, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  // VENTA
  getUltimoCodigoPlu() {
    const response = this.http.get(this.path + this.baseUrlArticulo + 'findUltimoCodPlu', this.options);
    return response;
  }
  getClasesVentaCliente() {
    const response = this.http.get(this.path + this.baseUrlClases + 'findClasesVenta', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getGrupoPorClaseVenta(idClase) {
    const response = this.http.get(this.path + this.baseUrlGrupos + 'findGrupoByIdClaseTipo/' + idClase + '/' + 1 + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  /* getImpuestoCanalPorCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlCanalImpuesto + 'findCanalImpuestoById/' + idCliente, this.options)
    .pipe(map(res => res.json()));
    return response;
  } */
  getImpuestosVenta(idClase, idGrupo) {
    const response = this.http.get(this.path + this.baseUrlImpuestoVenta + 'findImpuestosventasByIdClaseIdGrupo/'
    + idClase + '/' + idGrupo, this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestosVentaCanal(idImpuestoVentas) {
    const response = this.http.get(this.path + this.baseUrlImpuestoVentaCanal + 'findImpuestosventasCanalByIdImp/'
    + idImpuestoVentas, this.options).pipe(map(res => res.json()));
    return response;
  }
  getUnidadesVenta() {
    const response = this.http.get(this.path + this.baseUrlUnidad + 'findUnidadVenta', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getListaPrecios() {
    const response = this.http.get(this.path + this.baseUrlListaPrecios + 'findListaPrecios/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createListaPrecios(DataJson) {
    const response = this.http.post(this.path + this.baseUrlListaPrecios + 'createListaPrecios', DataJson, this.options);
    return response;
  }
  getTablaConversion(unidadKardex, unidadVenta) {
    const response = this.http.get(this.path + this.baseUrlTablaConversion + 'findConversionByIdKardexIdCompra/'
    + unidadKardex + '/' + unidadVenta, this.options).pipe(map(res => res.json()));
    return response;
  }
  getUnidadesAlternas() {
    const response = this.http.get(this.path + this.baseUrlUnidad + 'findUnidadAlternaVenta', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getUnidadesPresentacion() {
    const response = this.http.get(this.path + this.baseUrlUnidad + 'findUnidadPresentacion', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getGruposSeleccion() {
    const response = this.http.get(this.path + this.baseUrlGrupoSeleccion + 'findGruposSeleccion/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getCantArtGruposSeleccion(idGrupo) {
    const response = this.http.get(this.path + this.baseUrlArticulosGrupoSeleccion + 'countArtGrupoSeleccion/' + idGrupo, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createUnidad(DataJson) {
    const response = this.http.post(this.path + this.baseUrlUnidad + 'createUnidad', DataJson, this.options);
    return response;
  }
  // RECETA
  getArticulosReceta() {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findArticulosReceta', this.options).pipe(map(res => res.json()));
    return response;
  }
  getCanalesCliente() {
    const response = this.http.get(this.path + this.baseUrlClienteCanal + 'findClienteCanalByIdLogeado', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getArticulosInventario() {
    const response = this.http.get(this.path + this.baseUrlArticuloInventario + 'findArticulosInventario/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getUnidadesIngredientes() {
    const response = this.http.get(this.path + this.baseUrlUnidad + 'findUnidadKardex', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getRecetasImportar(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticuloReceta + 'findArticuloRecetaCanalIng/' + idArticulo + '/true',
    this.options).pipe(map(res => res.json()));
    return response;
  }
  // EMPAQUE
  getGruposEmpaque() {
    const response = this.http.get(this.path + this.baseUrlGruposEmpaque + 'findGruposEmpaque/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getArticulosEmpaque() {
    const response = this.http.get(this.path + this.baseUrlArticulo + 'findArticulosEmpaque', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postEmpaque(DataJson) {
    const response = this.http.post(this.path + this.baseUrlGruposEmpaque + 'createGruposEmpaque', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postArticulosEmpaque(DataList) {
    const response = this.http.post(this.path + this.baseUrlGruposEmpaqueArticulos + 'createGruposEmpaqueArticulos',
    DataList, this.options);
    return response;
  }
  importarGrupoEmpaque(grupoImportar, idGrupo) {
    const response = this.http.get(this.path + this.baseUrlGruposEmpaqueArticulos + 'importarGrupoEmpaqueArticulo/' + idGrupo
    + '/' + grupoImportar, this.options);
    return response;
  }
  getArticulosGrupo(idGrupo) {
    const response = this.http.get(this.path + this.baseUrlGruposEmpaqueArticulos + 'findGrupoEmpaqueArticuloById/' + idGrupo, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  updateEmpaque(DataJson) {
    const response = this.http.put(this.path + this.baseUrlGruposEmpaque + 'updateGruposEmpaque', DataJson, this.options);
    return response;
  }
  updateArticulosEmpaque(DataList, idGrupo) {
    const response = this.http.put(this.path + this.baseUrlGruposEmpaqueArticulos + 'updateGruposEmpaqueArticulos/' + idGrupo, DataList,
    this.options);
    return response;
  }
  /* getArticulosEmpaque() {
    const response = this.http.get(this.path + this.baseUrlArticulo + 'findArticulosEmpaque', this.options)
    .pipe(map(res => res.json()));
    return response;
  } */
  // ENVIO
  validarCodigoPlu(codPlu) {
    const response = this.http.get(this.path + this.baseUrlArticulo + 'validarCodigoPlu/' + codPlu, this.options);
    return response;
  }
  postArticulo(data) {
    const response = this.http.post(this.path + this.baseUrlArticulo + 'createArticulo', data, this.options);
    return response;
  }
  createPuntoArticulo(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoArticulo + 'createPuntoArticulos', DataList, this.options);
    return response;
  }
  createArticuloInventario(Data) {
    const response = this.http.post(this.path + this.baseUrlArticuloInventario + 'createArticuloInventario', Data, this.options);
    return response;
  }
  createArticuloGrupo(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloGrupo + 'createArticulosGrupos', DataList, this.options);
    return response;
  }
  createArticuloPuntoMaxMin(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloPuntoMaxMin + 'createPuntoArtMaxMin', DataList, this.options);
    return response;
  }
  createTablaConversion(DataList) {
    const response = this.http.post(this.path + this.baseUrlTablaConversion + 'createConversion', DataList, this.options);
    return response;
  }
  createArticuloConversion(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloTablaConversion + 'createArticuloCompraConversion',
     DataList, this.options);
    return response;
  }
  createArticuloUnidadCompra(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloUnidad + 'createArticuloCompraUnidadCompra',
    DataList, this.options);
    return response;
  }
  createArticuloInventarioBodegas(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloInvBodegas + 'createArticuloInvBod', DataList, this.options);
    return response;
  }
  /* createArticuloVentaCanal(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloVentaCanal + 'createArticuloventaCanalImpuesto',
    DataList, this.options);
    return response;
  } */
  createArticuloVentaCanal(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticulosImpuestosVenta + 'createArticulosImpuestosventas',
    DataList, this.options);
    return response;
  }
  createArticuloListaPrecios(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloListaPrecios + 'createArticulosListaPrecios', DataList, this.options);
    return response;
  }
  createArticuloVentaUnidadAlterna(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloUnidadAlterna + 'createArticuloventaUnidadAlterna',
    DataList, this.options);
    return response;
  }
  createArticuloUnidadesPresentacion(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloUnidadPresentacion + 'createArticuloUnidadesPresentacion',
    DataList, this.options);
    return response;
  }
  createArticuloGrupoSeleccionCant(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloGruposSeleccionCant +
      'createArticulosGrupoSeleccionCantidad', DataList, this.options);
    return response;
  }
  createArticuloReceta(DataJson) {
    const response = this.http.post(this.path + this.baseUrlArticuloReceta + 'createArticuloreceta', DataJson, this.options);
    return response;
  }
  createArticuloRecetaPuntos(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloRecetaPunto + 'createArticulorecetaPuntos', DataList, this.options);
    return response;
  }
  createArticuloRecetaCanal(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloRecetaCanal + 'createArticulorecetaCanal', DataList, this.options);
    return response;
  }
  createArticuloRecetaIngredientes(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloRecetaIngredientes +
      'createArticulorecetaIngredientes', DataList, this.options);
    return response;
  }
  createHistoricoIngredientes(DataList) {
    const response = this.http.post(this.path + this.baseUrlHistricoIngredientes +
      'createHistoricoIngredientes', DataList, this.options);
    return response;
  }
  createArticuloEmpaque(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloEmpaque + 'createArticuloempaque', DataList, this.options);
    return response;
  }
  /* createArticuloEmpaqueArticulos(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloEmpaqueArticulo + 'createArticulorempaqueArticulo',
    DataList, this.options);
    return response;
  } */
}
