import TextField from '@mui/material/TextField';

interface InputComponent{
    name: string;
}

export const InputText = ({name}:InputComponent) => {
    return <TextField label={name} name={name}  variant="outlined" size="medium"/>;
}