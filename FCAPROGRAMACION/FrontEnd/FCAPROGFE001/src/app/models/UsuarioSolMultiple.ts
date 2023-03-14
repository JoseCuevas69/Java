
import {TipoSolPorUsuario} from './TipoSolPorUsuario';
import {CampoPorUsuario} from './CampoPorUsuario';

export interface UsuarioSolMultipleActualizar {
    idUsuario: string;
    tiposSolicitud: TipoSolPorUsuario[];
    campos: CampoPorUsuario[];
}

export class UsuarioSolMultipleActualizar {
    idUsuario = '';
    tiposSolicitud: TipoSolPorUsuario[] = [];
    campos: CampoPorUsuario[] = [];
}
