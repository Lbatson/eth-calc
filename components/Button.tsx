import MuiButton from '@mui/material/Button';

export interface ButtonProps {
    text: string,
    value: string,
    onClick: (value: string) => void
}

const Button = ({ text, value, onClick }: ButtonProps) => {
    return (
        <MuiButton variant="text" size="large" onClick={() => onClick(value)}>{text}</MuiButton>
    )
}

export default Button;