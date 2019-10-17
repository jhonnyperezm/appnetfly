import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModificararticulosService {

  private baseUrlCliente = 'cliente/';
  private baseUrlArticulo = 'articulos/';
  private baseUrlPuntosArticulo = 'puntoArticulos/';
  private baseUrlClases = 'clases/';
  private baseUrlUnidad = 'unidad/';
  private baseUrlArticuloInv = 'articuloinventario/';
  private baseUrlArticuloGrupo = 'articulosGrupos/';
  private baseUrlPuntoArticuloMaxMin = 'PuntoArticulosMaxmin/';
  private baseUrlTablaConversion = 'TablaConversion/';
  private baseUrlArticuloInventarioBodega = 'articuloinventarioBodega/';
  private baseUrlArticuloUnidad = 'articulocomprasUnidadcompra/' ;
  private baseUrlClientePunto = 'clientePunto/';
  private baseUrlGrupos = 'grupoVentaInv/';
  private baseUrlMaximosMinimos = 'maximosMinimos/';
  private baseUrlArticuloPuntoMaxMin = 'PuntoArticulosMaxmin/';
  private baseUrlPuntoBodega = 'puntoBodega/';
  private baseUrlArticuloTablaConversion = 'articulocomprasConversion/';
  // private baseUrlCanalImpuesto = 'canalImpuesto/';
  private baseUrlListaPrecios = 'listaPrecios/';
  private baseUrlGrupoSeleccion = 'grupoSeleccion/';
  private baseUrlClienteCanal = 'clienteCanal/';
  private baseUrlArticulosGrupoSeleccion = 'articulosGrupoSeleccion/';
  private baseUrlArticuloInventario = 'articuloinventario/';
  private baseUrlArticuloVentaCanalImpuesto = 'articuloventaCanalImpuesto/';
  private baseUrlArticuloListaPrecios = 'articulosListaPrecios/';
  private baseUrlArticuloVentaUndAlternas = 'articuloventaUnidadAlterna/';
  private baseUrlArticuloGrupoSelCant = 'articulosGrupoSeleccionCantidad/';
  private baseUrlArticuloReceta = 'articuloreceta/';
  private baseUrlArticuloRecetaPuntos = 'articulorecetaPuntos/';
  private baseUrlArticuloRecetaCanales = 'articulorecetaCanal/';
  private baseUrlArticuloRecetaIngredientes = 'articulorecetaIngredientes/';
  private baseUrlArticuloEmpaque = 'articuloempaque/';
  private baseUrlArticuloEmpaqueArticulos = 'articuloempaqueArticulos/';
  private baseUrlGruposEmpaque = 'gruposEmpaque/';
  private baseUrlGruposEmpaqueArticulos = 'gruposEmpaqueArticulos/';
  private baseUrlArticulos = 'articulos/';
  private baseUrlClientesImpuesto = 'clienteImpuesto/';
  private baseUrlCanalCliente = 'clienteCanal/';
  private baseUrlImpuestoVenta = 'impuestosventas/';
  private baseUrlArticuloImpuestoVenta = 'articulosImpuestosventas/';
  private baseUrlImpuestoVentaCanal = 'impuestosventasCanal/';
  private baseUrlArticuloUndPresentacion = 'articuloUnidadesPresentacion/';

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
  getDatosArticulo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticulo + 'findArticulosById/' + idArticulo, this.options)
    .pipe(map(res => res.json()));
    return response;
  }

  getPerteneceGrupo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticulosGrupoSeleccion + 'findArticulosGrupoSeleccionByIdArt/' +
    idArticulo, this.options).pipe(map(res => res.json()));
    return response;
  }
  getPuntosArticulo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlPuntosArticulo + 'findPuntosByIdArticulo/' + idArticulo, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDatosArticuloInv(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticuloInv + 'findArticulosInventarioById/' + idArticulo, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDatosArticuloGrupo(idArt, tipo) {
    const response = this.http.get(this.path + this.baseUrlArticuloGrupo + 'findArticulosByIdArtTipo/' + idArt + '/' + tipo, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDatosPuntoArticuloMaxMin(idArtInv) {
    const response = this.http.get(this.path + this.baseUrlPuntoArticuloMaxMin + 'findPuntosArticuloMaxMin/' + idArtInv, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDatosArticuloTablaConversion(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloTablaConversion + 'findArticuloComprasConversionIdClienteIdArt/'
     + idArt, this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosTablaConversion(idArtInv) {
    const response = this.http.get(this.path + this.baseUrlTablaConversion + 'findConversionByIdArtInv/' + idArtInv, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDatosArticuloInventarioUnidad(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloUnidad + 'findArticuloCompraUnidadCompra/' +
    idArt, this.options).pipe(map(res => res.json()));
    return response;
  }
  /* getDatosArticuloCanalVenta(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloVentaCanalImpuesto + 'findArticuloventaCanalImpuestoById/' +
    idArt, this.options).pipe(map(res => res.json()));
    return response;
  } */
  getDatosArticuloImpuestosVenta(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloImpuestoVenta + 'findArticulosImpuestosventas/' +
    idArt, this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosArticuloListaPrecios(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloListaPrecios + 'findArticulosListaPreciosById/' +
    idArt, this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosArticuloUndAlternas(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloVentaUndAlternas + 'findArticuloventaUnidadAlternaById/' +
    idArt, this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosArticuloUndPresentacion(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloUndPresentacion + 'findArticuloUnidadesPresentacionByArticulo/' +
    idArt, this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosArticuloGrupoSeleccionCant(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloGrupoSelCant + 'findArticulosGrupoSeleccionCantidadById/' +
    idArt, this.options).pipe(map(res => res.json()));
    return response;
  }
 /*  getDatosArticuloReceta(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloReceta + 'findArticulorecetaByIdArt/' +
    idArt, this.options).pipe(map(res => res.json()));
    return response;
  } */
  getDatosPuntosArticuloReceta(idArtRec) {
    const response = this.http.get(this.path + this.baseUrlArticuloRecetaPuntos + 'findArticulorecetaPuntosById/' +
    idArtRec, this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosCanalesArticuloReceta(idArtRec) {
    const response = this.http.get(this.path + this.baseUrlArticuloRecetaCanales + 'findArticulorecetaCanalById/' +
    idArtRec, this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosIngredientesArticuloReceta(idArtRec) {
    const response = this.http.get(this.path + this.baseUrlArticuloRecetaIngredientes + 'findArticulorecetaIngredientesById/' +
    idArtRec, this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosArticuloInventarioBodega(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloInventarioBodega + 'findArticuloinventarioBodega/' +
    idArt, this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosArticuloEmpaque(idArt) {
    const response = this.http.get(this.path + this.baseUrlArticuloEmpaque + 'findArticuloempaqueByIdArt/' +
    idArt, this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosEmpaqueArticulos(idArtEmp) {
    const response = this.http.get(this.path + this.baseUrlArticuloEmpaqueArticulos + 'findArticuloempaqueArticuloById/' +
    idArtEmp, this.options).pipe(map(res => res.json()));
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
  getPuntosCliente() {
    const response = this.http.get(this.path + this.baseUrlClientePunto + 'findClientePuntoByIdCliente/true', this.options)
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
  getUnidadesPersonalizadas(unidadKardex) {
    const response = this.http.get(this.path + this.baseUrlTablaConversion +
    'findConversionByIdKardexCliente/' + unidadKardex, this.options).pipe(map(res => res.json()));
    return response;
  }
  createTablaConversion(DataList) {
    const response = this.http.post(this.path + this.baseUrlTablaConversion + 'createConversion', DataList, this.options);
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
 /*  getRecetasArticulo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticuloReceta + 'findArticulorecetaByIdArt/' + idArticulo + '/true',
    this.options).pipe(map(res => res.json()));
    return response;
  } */
  getRecetasArticulo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticuloReceta + 'findArticuloRecetaCanalIng/' + idArticulo + '/true',
    this.options).pipe(map(res => res.json()));
    return response;
  }
  getRecetasInactivasArticulo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticuloReceta + 'findArticuloRecetaCanalIng/' + idArticulo + '/false',
    this.options).pipe(map(res => res.json()));
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
    .map(res => res.json());
    return response;
  } */




  validarCodigoPlu(codPlu) {
    const response = this.http.get(this.path + this.baseUrlArticulo + 'validarCodigoPlu/' + codPlu, this.options);
    return response;
  }
  updateArticulo(DataJson) {
    const response = this.http.put(this.path + this.baseUrlArticulo + 'updateArticulo', DataJson, this.options);
    return response;
  }
  updatePuntoArticulo(idArt, DataList) {
    const response = this.http.put(this.path + this.baseUrlPuntosArticulo + 'updatePuntoArticulos/' + idArt, DataList, this.options);
    return response;
  }
  updateArticuloInventario(DataJson) {
    const response = this.http.put(this.path + this.baseUrlArticuloInv + 'updateArticuloInventario', DataJson, this.options);
  return response;
  }
  updateArticuloPuntoMaxMin(idArtInv, DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloPuntoMaxMin + 'updatePuntoArtMaxMin/' +
    idArtInv, DataList, this.options);
    return response;
  }
  updateArticuloInventarioBodegas(idArtInv, DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloInventarioBodega + 'updateArtInvBod/' +
    idArtInv, DataList, this.options);
    return response;
  }
  updateArticuloGrupo(DataJson) {
    const response = this.http.put(this.path + this.baseUrlArticuloGrupo + 'updateArticuloGrupo',
    DataJson, this.options);
    return response;
  }
  createArticuloGrupo(DataJson) {
    const response = this.http.post(this.path + this.baseUrlArticuloGrupo + 'createArticulosGrupos',
    DataJson, this.options);
    return response;
  }
  updateArticuloConversion(DataList, idArt) {
    const response = this.http.put(this.path + this.baseUrlArticuloTablaConversion + 'updateArticuloComprasConversion/' + idArt,
     DataList, this.options);
    return response;
  }
  updateArticuloUnidadCompra(DataList, idArt) {
    const response = this.http.post(this.path + this.baseUrlArticuloUnidad + 'updateArtCompUnidadCompra/' + idArt,
    DataList, this.options);
    return response;
  }
  /* updateArticuloVentaCanal(DataList, idArt) {
    const response = this.http.put(this.path + this.baseUrlArticuloVentaCanalImpuesto + 'updateArticuloventaCanalImpuesto/' + idArt,
    DataList, this.options);
    return response;
  } */
  updateArticuloVentaCanal(DataList, idArt) {
    const response = this.http.post(this.path + this.baseUrlArticuloImpuestoVenta + 'updateArticulosImpuestosventas/' + idArt,
    DataList, this.options);
    return response;
  }
  updateArticuloListaPrecios(DataList, idArt) {
    const response = this.http.put(this.path + this.baseUrlArticuloListaPrecios + 'updateArticulosListaPrecios/' + idArt,
    DataList, this.options);
    return response;
  }
  updateArticuloVentaUnidadAlterna(DataList, idArt) {
    const response = this.http.put(this.path + this.baseUrlArticuloVentaUndAlternas + 'updateArticuloventaUnidadAlterna/' + idArt,
    DataList, this.options);
    return response;
  }
  updateArticuloGrupoSeleccionCant(DataList, idArt) {
    const response = this.http.put(this.path + this.baseUrlArticuloGrupoSelCant + 'updateArticulosGrupoSeleccionCantidad/' + idArt,
    DataList, this.options);
    return response;
  }
  updateArticuloReceta(DataJson, idArticulo) {
    const response = this.http.post(this.path + this.baseUrlArticuloReceta + 'updateArticuloRecetaByIdArt/' + idArticulo,
    DataJson, this.options);
    return response;
  }
  /* updateArticuloRecetaPuntos(DataList, idArtRec) {
    const response = this.http.put(this.path + this.baseUrlArticuloRecetaPuntos + 'updateArticulorecetaPuntos/' + idArtRec,
    DataList, this.options);
    return response;
  }
  updateArticuloRecetaCanal(DataList, idArtRec) {
    const response = this.http.put(this.path + this.baseUrlArticuloRecetaCanales + 'updateArticulorecetaCanal/' + idArtRec,
    DataList, this.options);
    return response;
  }
  updateArticuloRecetaIngredientes(DataList, idArtRec) {
    const response = this.http.put(this.path + this.baseUrlArticuloRecetaIngredientes + 'updateArticulorecetaIngrediente/' + idArtRec,
    DataList, this.options);
    return response;
  } */
  updateArticuloEmpaque(DataList, idArticulo) {
    const response = this.http.put(this.path + this.baseUrlArticuloEmpaque + 'updateArticuloempaque/' + idArticulo,
    DataList, this.options);
    return response;
  }
  updateArticuloEmpaqueArticulos(DataList, idArtEmp) {
    const response = this.http.put(this.path + this.baseUrlArticuloEmpaqueArticulos + 'updateArticuloempaqueArticulos/' + idArtEmp,
    DataList, this.options);
    return response;
  }



  createArticuloUnidadesPresentacion(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloUndPresentacion + 'createArticuloUnidadesPresentacion',
    DataList, this.options);
    return response;
  }

  postArticulo(data) {
    const response = this.http.post(this.path + this.baseUrlArticulo + 'createArticulo', data, this.options);
    return response;
  }
  createPuntoArticulo(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntosArticulo + 'createPuntoArticulos', DataList, this.options);
    return response;
  }
  createArticuloInventario(Data) {
    const response = this.http.post(this.path + this.baseUrlArticuloInventario + 'createArticuloInventario', Data, this.options);
    return response;
  }
  /* createArticuloGrupo(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloGrupo + 'createArticulosGrupos', DataList, this.options);
    return response;
  } */
  createArticuloPuntoMaxMin(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloPuntoMaxMin + 'createPuntoArtMaxMin', DataList, this.options);
    return response;
  }
  /* createTablaConversion(DataList) {
    const response = this.http.post(this.path + this.baseUrlTablaConversion + 'createConversion', DataList, this.options);
    return response;
  } */
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
    const response = this.http.post(this.path + this.baseUrlArticuloInventarioBodega + 'createArticuloInvBod', DataList, this.options);
    return response;
  }
  createArticuloVentaCanal(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloImpuestoVenta + 'createArticulosImpuestosventas',
    DataList, this.options);
    return response;
  }
  createArticuloListaPrecios(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloListaPrecios + 'createArticulosListaPrecios', DataList, this.options);
    return response;
  }
  createArticuloVentaUnidadAlterna(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloVentaUndAlternas + 'createArticuloventaUnidadAlterna',
    DataList, this.options);
    return response;
  }
  createArticuloGrupoSeleccionCant(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloGrupoSelCant +
      'createArticulosGrupoSeleccionCantidad', DataList, this.options);
    return response;
  }
  updateEstadoUnidadPresentacion(estado, id_tabla) {
    const response = this.http.put(this.path + this.baseUrlArticuloUndPresentacion + 'activarInactivarArticuloUnidadesPresentacion/'
    + id_tabla + '/' + estado, null, this.options);
    return response;
  }
  updateEstadoArticulo(estado, idArticuloNuevo) {
    const response = this.http.put(this.path + this.baseUrlArticulo + 'activarInactivarArticulos/'
    + idArticuloNuevo + '/' + estado, null, this.options);
    return response;
  }
  /*
  getUnidadesVenta() {
    const response = this.http.get(this.path + this.baseUrlUnidad + 'findUnidadVenta', this.options)
    .map(res => res.json());
    return response;
  }
   */
  /* createArticuloPuntoMaxMin(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloPuntoMaxMin + 'createPuntoArtMaxMin', DataList, this.options);
    return response;
  } */
  /* updateArticuloPuntoMaxMin(idArtInv, DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloPuntoMaxMin +
      'updatePuntoArtMaxMin/' + idArtInv, DataList, this.options);
    return response;
  }
  deletePuntoArticuloMaxMin(Id) {
    const response = this.http.delete(this.path + this.baseUrlArticuloPuntoMaxMin + 'deletePuntoArtMaxMin/' + Id, this.options);
    return response;
  } */
  /* getUnidadCompraArt(idArtInv, unidadKardex) {
    const response = this.http.get(this.path + this.baseUrlTablaConversion + 'findConversionByIdClienteIdArt/' + idArtInv +
     '/' + unidadKardex, this.options).map(res => res.json());
    return response;
  } */
  /* getUnidadCompra(unidadKardex) {
    const response = this.http.get(this.path + this.baseUrlTablaConversion + 'findConversionByIdCliente/' + unidadKardex, this.options)
    .map(res => res.json());
    return response;
  } */
  /*
   */
  /* createArticuloConversion(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloTablaConversion + 'createArticuloinventarioConversion',
     DataList, this.options);
    return response;
  } */
  /* createArticuloUnidadCompra(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloUnidad + 'createArticuloinventarioUnidadcompra',
    DataList, this.options);
    return response;
  }
  updateArticuloInventarioConversion(DataJson) {
    const response = this.http.put(this.path + this.baseUrlArticuloTablaConversion + 'updateArticuloinventarioConversion',
    DataJson, this.options);
    return response;
  }
  updateTablaConversion(DataJson) {
    const response = this.http.put(this.path + this.baseUrlTablaConversion + 'updateConversion', DataJson, this.options)
    .map(res => res.json());
    return response;
  }
  updateUnidadCompra(DataJson) {
    const response = this.http.put(this.path + this.baseUrlUnidad + 'updateUnidad', DataJson, this.options);
    return response;
  }
  deleteArtInvUnidadCompra(Id) {
    const response = this.http.delete(this.path + this.baseUrlArticuloUnidad + 'updateArticuloinventarioUnidadcompra/' + Id,
    this.options);
    return response;
  }
  deleteArticuloTablaConversion(Id) {
    const response = this.http.delete(this.path + this.baseUrlArticuloTablaConversion + 'deleteArticuloinventarioConversion/' + Id,
    this.options);
    return response;

  } */
  /* createArticuloInventarioBodegas(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloInventarioBodega + 'createArticuloInvBod', DataList, this.options);
    return response;
  } */
  /* deleteArticuloInvBodega(Id) {
    const response = this.http.delete(this.path + this.baseUrlArticuloInventarioBodega + 'deleteArticuloinventarioBodega/' + Id,
    this.options);
    return response;
  }
  updateArticuloInventarioGrupo(DataJson) {
    const response = this.http.put(this.path + this.baseUrlArticuloGrupo + 'updateArticuloInventarioGrupo', DataJson, this.options);
    return response;
  }
  updateArticuloUnidadCompra(idArtInv, DataJson) {
    const response = this.http.post(this.path + this.baseUrlArticuloUnidad + 'updateArtInvUnidadcompra/' + idArtInv,
    DataJson, this.options);
    return response;
  }
  updateArticuloConversion(idArtInv, DataJson) {
    const response = this.http.put(this.path + this.baseUrlArticuloTablaConversion + 'updateArtInvTablaConversion/' + idArtInv,
    DataJson, this.options);
    return response;
  }
  updateArticuloInventarioBodegas(idArtInv, DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloInventarioBodega +
      'updateArtInvBod/' + idArtInv, DataList, this.options);
    return response;
  } */
}
