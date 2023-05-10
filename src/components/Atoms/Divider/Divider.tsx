import React from "react";
import { Divider as DividerUI } from 'antd';

interface DividerI {
    children?: React.ReactNode;
    orientation?: 'left' | 'right' | 'center';
}

const Divider = ({
    children,
    orientation = 'center',
}: DividerI) => {
    return <DividerUI orientation={orientation}>{children}</DividerUI>;
};

export default Divider;