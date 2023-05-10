import React from 'react';
import { Breadcrumb as BreadcrumbUI } from 'antd';

interface BreadcrumbItems {
    text: string;
    href?: string;
};

interface BreadcrumbI {
    separator?: string;
    items: BreadcrumbItems[];
}
const Breadcrumb = ({
    separator = '>',
    items
}: BreadcrumbI) => (
  <BreadcrumbUI separator={separator}>
    {items.length > 0 && items.map(({text, href}: BreadcrumbItems) => href ? (
        <BreadcrumbUI.Item key={text} href={href}>{text}</BreadcrumbUI.Item>
    ) : (
        <BreadcrumbUI.Item key={text}>{text}</BreadcrumbUI.Item>
    ))}
  </BreadcrumbUI>
);

export default Breadcrumb;