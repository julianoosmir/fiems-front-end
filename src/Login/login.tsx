import * as Yup from 'yup';
import {Field, Form, Formik,} from "formik";
import {Logo} from "../component/logo/logo.tsx";
import {Titulo} from "../component/titulo/titulo.tsx";
import {Botao} from "../component/botao/botao.tsx";
import {useNavigate} from "react-router-dom";
import {LoginModel} from "../model/LoginModel.tsx";

import './login.css'

const LoginSchema = Yup.object().shape({
    cpf: Yup.string()
        .min(11,'cpf deve ter 11 numeros').max(11,'cpf deve ter 11 numeros'),
    senha: Yup.string().required('o campo senha deve ser preenchido'),
});


export function Login() {
    const navigate = useNavigate();
    return (<div>
            <Logo/>
            <Titulo texto="Fazer Login como Administrador"/>
            <Formik
                initialValues={{
                    cpf: '',
                    senha: '',

                }}
                validationSchema={LoginSchema}
                onSubmit={values => {

                    const cpf = values.cpf;
                    const senha = values.senha

                    const loginModel: LoginModel = {
                        cpf, senha
                    }

                    localStorage.setItem("acesso",JSON.stringify(loginModel));
                    navigate("/lista")
                }}
            >
                {({errors, touched}) => (
                    <Form>
                        <Field name="cpf"/>
                        {errors.cpf && touched.cpf ? (
                            <div>{errors.cpf}</div>
                        ) : null}

                        <Field name="senha"/>
                        {errors.senha && touched.senha ? (
                            <div>{errors.senha}</div>
                        ) : null}
                        <Botao texto="fazer login" />
                    </Form>
                )}
            </Formik>
        </div>
    )
}