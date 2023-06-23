import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, notification } from 'antd';
import TextArea from "antd/es/input/TextArea";
import App from "../../components/Templates/App";
import Button from "../../components/Atoms/Button/Button";

import useForm from "../../hooks/useForm";
import './BuyCartForm.scss';
import { ProductI } from "../../services/FakeStoreService/FakeStoreService.utils";
import FakeStoreService from "../../services/FakeStoreService/FakeStoreService";

const INITIAL_EMPTY_FORM_VALUES = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    comments: '',
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const BuyCartForm = () => {
  let { id } = useParams();
  const [productToShow, setProductToShow] = useState<ProductI>();
  const { form, onChange } = useForm(
    INITIAL_EMPTY_FORM_VALUES
  );
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  useEffect(() => {
      getProductById();
  }, []);

    const getProductById = async () => {
      if (id) {
        const response = await FakeStoreService.getProductById(id);
        if (response?.statusCode === 200 && response.data) {
          setProductToShow(response.data[0]);
        } else {
            navigate('/');
        }
      } else {
          navigate('/');
      }
  };
  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Se envió tu información con éxito',
      description:
        '¡Estas a punto de recibir un gran producto!',
    });
  };


  const buyProductOnClick = async (values: any) => {
    if (values) {
      const response = await FakeStoreService.buyProductById(`${id}`, {
        ...values,
        price: productToShow?.price ?? 0,
      });
      if (response?.statusCode === 200 && response.data) {
        openNotificationWithIcon('success');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    }
  };

  const onChangeField = (name: string, e: any) => {
      onChange(name, e.target.value);
  };

  return (
    <App>
      {contextHolder}
      <div className="buy-cart-main">
        <h1>Finaliza tu compra</h1>
        {productToShow && (
          <div className="show-product-container">
            <div className="show-product-image-container">
                <img src={productToShow.picture} alt={productToShow.title} />
            </div>
            <div className="show-product-description-container">
                <span className="main-category">{productToShow.category_id}</span>
                <h1 className="main-title">{productToShow.title}</h1>
                <h2 className="main-price">$ {productToShow.price} USD</h2>
            </div>
          </div>
        )}
        <Form
          className="buy-cart-form"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={buyProductOnClick}
        >
          <Form.Item
            label="Nombres"
            name="firstName"
            rules={[{
              required: true,
              message: 'Por favor ingresa tus nombres!',
            }]}
          >
            <Input onChange={(e) => onChangeField('firstName', e)} />
          </Form.Item>
          <Form.Item
            label="Apellidos"
            name="lastName"
            rules={[{
              required: true,
              message: 'Por favor ingresa tus apellidos!',
            }]}
          >
            <Input onChange={(e) => onChangeField('lastName', e)} />
          </Form.Item>
          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[{
              required: true,
              message: 'Por favor ingresa tu correo electrónico!',
            }]}
          >
            <Input onChange={(e) => onChangeField('email', e)} />
          </Form.Item>
          <Form.Item
            label="Celular"
            name="phone"
            rules={[{
              required: true,
              message: 'Por favor ingresa tu celular!',
            }]}
          >
            <Input onChange={(e) => onChangeField('phone', e)} />
          </Form.Item>
          <Form.Item
            label="Dirección"
            name="address"
            rules={[{
              required: true,
              message: 'Por favor ingresa tu dirección!',
            }]}
          >
            <Input onChange={(e) => onChangeField('address', e)} />
          </Form.Item>
          <Form.Item
            label="Ciudad"
            name="city"
            rules={[{
              required: true,
              message: 'Por favor ingresa tu ciudad!',
            }]}
          >
            <Input onChange={(e) => onChangeField('city', e)} />
          </Form.Item>
          <Form.Item
            label="Comentarios"
            name="comments"
            rules={[{
              required: false,
              message: 'Por favor ingresa tus comentarios extra!',
            }]}
          >
            <TextArea rows={4} onChange={(e) => onChangeField('comments', e)} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button text="Enviar" submit />
          </Form.Item>
        </Form>
      </div>
    </App>
  );
};

export default BuyCartForm;