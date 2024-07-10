import * as Yup from "yup";
import {Logo} from "../component/logo/logo.tsx";
import {Titulo} from "../component/titulo/titulo.tsx";
import {Field, Form, Formik} from "formik";
import {Botao} from "../component/botao/botao.tsx";
import {useEffect, useState} from "react";
import {Acesso} from "../services/Acesso.ts";
import {EspecializacaoModel} from "../model/Especializacao.ts";
import {CasaModel} from "../model/Casa.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ResgistroModel} from "../model/Registro.ts";
import {Box, Modal} from "@mui/material";

import './cadastro.css'

const CadastroSchema = Yup.object().shape({
    cpf: Yup.string()
        .min(11,'cpf deve ter 11 numeros').max(11,'cpf deve ter 11 numeros')
        .required('o campo cpf deve ser preenchido'),
    nome: Yup.string().required('o campo nome completo deve ser preenchido'),
    email: Yup.string().email('o campo email deve ser preenchido').required('o campo email deve ser preenchido'),
    celular: Yup.string().min(11,'celular deve ter 11 digitos')
        .max(11,'celular deve ter 11 digitos').required('o campo celular deve ser preenchido'),
    especializacao: Yup.number().min(1,'o campo especialização deve ser preenchido')
        .required('o campo especialização deve ser preenchido'),
    casa: Yup.number().min(1,'o campo casa deve ser preenchido').required('o campo casa deve ser preenchido')

});
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid',
    boxShadow: 24,
    radius: 10,
    p: 4,
};

export function Cadastro() {
    const navigate = useNavigate();
    const config = Acesso();
    const [casas,serCasas] = useState([])
    const [especializacoes,setEspecializacoes] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        navigate("/lista")
        setOpen(false);
    }

    const salvar = (registro : ResgistroModel) =>{
        const result = axios.post("http://localhost:8080" + '/registro', registro, config);
        result.then(() => {
            handleOpen()

        })
            .catch((cat) => console.log(cat))
    }


    useEffect(() => {
        fetch('http://localhost:8080/casa',config)
            .then(r => r.json())
            .then(rc =>{
                serCasas(rc);
            } );

    }, [])
    useEffect(() => {
        fetch('http://localhost:8080/especializacao',config)
            .then(r => r.json())
            .then(rc =>{
                setEspecializacoes(rc);
            } );

    }, []);

    return (
        <div>
            <Logo/>
            <Titulo texto="Formulário de Inscrição de Voluntário na Campanha MS Pela Vida"/>
            <Formik
                initialValues={{
                    cpf: '',
                    email: '',
                    celular: '',
                    nome: '',
                    especializacao: 0,
                    casa: 0,


                }}
                validationSchema={CadastroSchema}
                onSubmit={values => {
                    console.log(values)
                    const casaModel : CasaModel = {
                        id: values.casa,
                        nome: null
                    }
                    const esp: EspecializacaoModel= {
                        id: values.especializacao,
                        nome: null
                    }
                    const registro: ResgistroModel = {
                        id: null,
                        cpf: values.cpf,
                        email: values.email,
                        telefone: values.celular,
                        nome: values.nome,
                        data: null,
                        especializacao: esp,
                        casa: casaModel
                    }
                    salvar(registro);
                }}
            >
                {({errors, touched}) => (
                    <Form>
                        <Field name="cpf" placeholder="CPF"/>
                        {errors.cpf && touched.cpf ? (
                            <div>{errors.cpf}</div>
                        ) : null}


                        <Field type="nome" name="nome" placeholder="Nome completo" />
                        {errors.nome && touched.nome ? (
                            <div>{errors.nome}</div>
                        ) : null}

                        <Field type="email" name="email" placeholder="E-mail" />
                        {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                        ) : null}
                        <Field type="celular" name="celular" placeholder="celular" />
                        {errors.celular && touched.celular ? (
                            <div>{errors.celular}</div>
                        ) : null}

                        <Field name="especializacao" component="select">
                            <option value={0}></option>
                            {especializacoes.map((obj: EspecializacaoModel, index) => {
                                return (
                                    <option key={index} value={obj.id}> {obj.nome}</option>
                                );
                            })}
                        </Field>

                        {errors.especializacao && touched.especializacao ? (
                            <div>{errors.especializacao}</div>
                        ) : null}

                        <Field name="casa" component="select">
                            <option value={0}></option>
                            {casas.map((obj: CasaModel, index) => {
                                return (
                                    <option key={index} value={obj.id}> {obj.nome}</option>
                                );
                            })}
                        </Field>

                        {errors.casa && touched.casa ? (
                            <div>{errors.casa}</div>
                        ) : null}

                        <Botao texto="fazer login" />
                    </Form>
                )}
            </Formik>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Logo/>
                    <Titulo texto="Inscrição realizada com sucesso!"/>
                </Box>
            </Modal>

        </div>
    );
}