import {EspecializacaoModel} from "./Especializacao.ts";
import {CasaModel} from "./Casa.ts";

export interface ResgistroModel{
    id: number | null;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    data: Date | null;
    especializacao: EspecializacaoModel;
    casa : CasaModel
}