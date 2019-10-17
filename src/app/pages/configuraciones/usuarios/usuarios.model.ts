export class Usuarios {
    constructor(
        public usuario: string,
        public pass: string,
        public rol: any = []
    ) {
    }
  }