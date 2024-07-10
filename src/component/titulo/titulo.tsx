import './titulo.css'

interface TituloComponent{
    texto: string;
}

export const Titulo = ({texto}:TituloComponent) =>{
    return (
        <>
        <label>{texto}</label>
        </>
    )
}