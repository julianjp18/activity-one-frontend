import { Button as ButtonUI } from 'antd';

interface ButtonI {
    text: string;
    onClick?: () => void;
    type?: 'primary' | 'default' | 'dashed' | 'link';
    block?: boolean;
    submit?: boolean;
}

const Button = ({
    text,
    onClick,
    type = 'primary',
    block = false,
    submit = false,
}: ButtonI) => {
    return (
        <ButtonUI type={type} block={block} onClick={onClick} htmlType={submit ? 'submit' : 'button'}>
            {text}
        </ButtonUI>
    )
};

export default Button;