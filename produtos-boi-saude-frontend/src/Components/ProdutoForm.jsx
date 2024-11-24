import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const ProdutoForm = ({ produto, onSave, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            if (produto?.id) {
                await axios.put(`https://localhost:7097/api/Produtos/${produto.id}`, {
                    ...values,
                    id: produto.id,
                });
                message.success('Produto atualizado com sucesso');
            } else {
                await axios.post('https://localhost:7097/api/Produtos', values);
                message.success('Produto criado com sucesso');
            }
            form.resetFields();
            onSave();
        } catch (error) {
            message.error('Erro ao salvar produto');
            console.error(error);
        }
    };

    React.useEffect(() => {
        if (!produto) {
            form.resetFields();
        } else {
            form.setFieldsValue(produto);
        }
    }, [produto, form]);

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="nome"
                label="Nome"
                rules={[{ required: true, message: 'Por favor, insira o nome' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="precoCusto"
                label="Preço de Custo"
                rules={[{ required: true, message: 'Por favor, insira o preço de custo' }]}
            >
                <Input type="number" step="0.01" min="0" />
            </Form.Item>

            <Form.Item
                name="precoVenda"
                label="Preço de Venda"
                rules={[{ required: true, message: 'Por favor, insira o preço de venda' }]}
            >
                <Input type="number" step="0.01" min="0" />
            </Form.Item>

            <Form.Item
                name="quantidade"
                label="Quantidade"
                rules={[{ required: true, message: 'Por favor, insira a quantidade' }]}
            >
                <Input type="number" min="0" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Salvar
                </Button>
                <Button onClick={onCancel} style={{ marginLeft: 8 }}>
                    Cancelar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProdutoForm;