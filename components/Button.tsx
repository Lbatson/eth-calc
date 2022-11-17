import Button from '@mui/material/Button';

export interface ButtonProps {
    text: string,
    value: string,
    onClick: (value: string) => void
}

export default function({ text, value, onClick }: ButtonProps) {
    return (
        <Button variant="text" size="large" onClick={() => onClick(value)}>{text}</Button>
    )
}