import Button from '@mui/material/Button';

interface BotaoComponent{
    texto: string;
}

export const Botao = ({texto}:BotaoComponent) => {
    return (
        <Button variant="contained" type="submit" color="primary" size="large">
            {texto}
        </Button>
    )

}