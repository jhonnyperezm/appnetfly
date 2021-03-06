export class Alertas {
    confirmacion: string ;
    informacion: string ;
    edicion: string ;
    eliminacionarticulocompra: string;
    enviado: string;
    eliminacionarticuloorden: string ;
    cancelar: string;
    creacion: string;
    diligenciecampos: string ;
    devolucion: string ;
    guardar: string;
    cerrar: string;
    adicionar: string;
    correoelectronico: string;
    modificacion: string;
    crearymodificar: string;
    eliminar: string;
    campo: string;
    todosloscampos: string;
    correoexitoso: string;
    correofallido: string;
    valor: string;
    precio: string;
    pdf: string;
    pdferror: string;
    confirmamail: string;
    impuesto: string;
    fechas: string;
    pendiente: string;
    compraexitosa: string;
    pendientemodificado: string;
    errorcantidad: string;
    validaciondescuentos: string;
    devolucionmodificada: string;
    eliminarexitoso: string;
    verifiquecorreo: string;
    activacionexitosa: string;
    inactivacionexitosa: string;
    clienteexitoso: string;
    clientemodificado: string;
    puntocreadoexitoso: string;
    puntoactualizadoexitoso: string;
    articuloexitoso: string;
    articulomodificado: string;
  
    constructor() {
  
        this.confirmacion = 'Confirmado';
        this.informacion = 'Este es un mensaje informativo';
        this.edicion = 'Esta seguro de editar la información';
        this.eliminacionarticulocompra = 'Esta seguro desea eliminar el artículo de la compra';
        this.enviado = 'La informacion fue enviada correctamente';
        this.eliminacionarticuloorden = 'Esta seguro de eliminar el artículo de la  Orden de compra';
        this.cancelar = 'Esta seguro de salir sin guardar cambios';
        this.creacion = 'Registro almacenado correctamente';
        this.diligenciecampos = 'Por favor diligencie los campos faltantes';
        this.devolucion = 'Se ha generado la devolucion satisfactoriamente';
        this.pendiente = 'Se ha generado el pendiente satisfactoriamente';
        this.guardar = 'Se ha guardado correctamente';
        this.cerrar = 'Esta seguro de cerrar esta ventana';
        this.adicionar = 'Se ha adicionado correctamente';
        this.correoelectronico = 'Se ha enviado el correo electronico';
        this.modificacion = 'El Registro ha sido modificado con exito';
        this.crearymodificar = 'El Registro ha sido creado y modificado con exito';
        this.eliminar = 'Esta seguro que desea eliminar el registro';
        this.campo = 'Este campo es obligatorio';
        this.todosloscampos = 'Por favor diligencie todos los campos del formulario';
        this.correoexitoso = 'Correo fue enviado exitosamente';
        this.correofallido = 'No fue posible el envio del correo con los datos suministrados,' +
                              'por favor descargue el archivo y realice el envio directamente desde su correo';
        this.valor = 'Seleccione el valor referente al precio del articulo';
        this.precio = 'Ingrese el precio del articulo';
        this.pdf = 'Se genero el pdf de manera exitosa';
        this.pdferror = 'Error al generar el archivo pdf , por favor verifique que los datos se encuentren completos en su totalidad';
        this.confirmamail = 'Se Actualizo el estado de la orden';
        this.impuesto = 'Por favor seleccione un impuesto y tarifa';
        this.fechas = 'Por favor verifique las fechas seleccionadas , la fecha de entrega debe ser mayor o igual a la fecha de pedido';
        this.compraexitosa = 'La compra ha sido generada exitosamente';
        this.pendientemodificado = 'El pendiente fue modificado Exitosamente';
        this.errorcantidad = 'Ingrese la cantidad del articulo que desea comprar';
        this.validaciondescuentos = 'ingrese un valos correcto para el descuento por valor absoluto o porcentaje';
        this.devolucionmodificada = 'El pendiente fue modificado Exitosamente';
        this.eliminarexitoso = 'El registro fue eliminado exitosamente';
        this.verifiquecorreo = 'Verifique el correo electronico, la informacion digitada en ese campo no es valida';
        this.activacionexitosa = 'El registro se activo correctamente';
        this.inactivacionexitosa = 'El registro fue inactivado correctamente';
        this.clienteexitoso = 'El cliente se ha creado de manera exitosa';
        this.clientemodificado = 'El cliente se se ha modificado de manera exitosa';
        this.puntocreadoexitoso = 'El punto fue creado de manera exitosa';
        this.puntoactualizadoexitoso = 'El punto fue actualizado de manera exitosa';
        this.articuloexitoso = 'El articulo fue creado de manera exitosa';
        this.articulomodificado = 'El articulo fue modificado de manera exitosa';
      }
  }
  