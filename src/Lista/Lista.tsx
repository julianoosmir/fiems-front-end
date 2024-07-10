import {useEffect, useState} from "react";
import {Acesso} from "../services/Acesso.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import './Lista.css'
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export function Lista(){
    const config = Acesso();
    const [resgistros,setRegistro] = useState([])



    useEffect(() => {
        fetch('http://localhost:8080/registro',config)
            .then(r => r.json())
            .then(rc =>{
                setRegistro(rc);
            } );
    }, [])


   // const rows: GridRowsProp = [];

    const columns: GridColDef[] = [
        { field: "data", headerName:"DATA", width: 150 },
        { field: "nome", headerName: "Nome", width: 150 },
        { field: "casaNome", headerName: "Casa", width: 150 },
        { field: "EspecializacaoNome", headerName:"Especialização", width: 150 },
        { field: "email", headerName: "E-mail", width: 150 },
        { field: "telefone", headerName:"Telefone", width: 150 },

    ];
    const navigate = useNavigate();

    function cadastrar() {
        navigate('/cadastro')
    }

    return (
        <div>
            <div id="top">
                <label> Relatório de Inscrições </label>
                <Button onClick={cadastrar} variant="contained" color="primary" size="small">
                    adicionar uma inscrição
                </Button>
            </div>

            <div style={{height: 300, width: "100%"}}>
                <DataGrid rows={resgistros} columns={columns}/>
            </div>
        </div>

    );

}