import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  getPath() {
    // RUTA PARA  DESARROLLO LOCAL
    const path = '/backgama/ptigGama/';
    // const path = 'http://localhost:8080/backgama/ptigGama/';

    // RUTA PARA AMBIENTE PILOTO
    // const path = 'http://gd3.gamasoftcol.com:8081/backgama_dev/ptigGama_dev/';

    // RUTA PARA AMBIENTE DESARROLLO
    // const path = 'http://gd3.gamasoftcol.com:8081/backgama_piloto/ptigGama_piloto/';

    // RUTA PARA AMBIENTE PRODUCCION
    // const path = 'http://gd3.gamasoftcol.com:8081/backgama/ptigGama/';

    // RUTA PARA AMBIENTE PRODUCCION
    // const path = 'https://gd3.gamasoftcol.com:8443/backgama/ptigGama/';
    return path;
  }

  getPathDownload() {
    // RUTA PARA GENERAR PDF LOCAL
    const path = 'D:/pdf/';

    // RUTA PARA GENERAR PDF EN EL SERVIDOR PILOTO PDF SOLICITUD ELECTRONICA
    // const path = '/usr/local/tomcat9/webapps/pdf_pil/';

    // RUTA PARA GENERAR PDF EN EL SERVIDOR DESARROLLO PDF SOLICITUD ELECTRONICA
    // const path = '/usr/local/tomcat9/webapps/pdf_dev/';

    // RUTA PARA GENERAR PDF EN EL SERVIDOR PRODUCCION
    // const path = '/usr/local/tomcat9/webapps/pdf_pro/';
    return path;
  }
}
