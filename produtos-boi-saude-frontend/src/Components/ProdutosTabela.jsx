import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Table, Button, Space, message, Card } from 'antd';
import axios from 'axios';

const ProdutosTabela = forwardRef(({ onEdit }, ref) => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);

    const carregarProdutos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7097/api/Produtos');
            setProdutos(response.data);
        } catch (error) {
            message.error('Erro ao carregar produtos');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        recarregarProdutos: carregarProdutos
    }));

    useEffect(() => {
        carregarProdutos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7097/api/Produtos/${id}`);
            message.success('Produto excluído com sucesso');
            carregarProdutos();
        } catch (error) {
            message.error('Erro ao excluir produto');
            console.error(error);
        }
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Preço de Custo',
            dataIndex: 'precoCusto',
            key: 'precoCusto',
            render: (value) => `R$ ${value.toFixed(2)}`,
        },
        {
            title: 'Preço de Venda',
            dataIndex: 'precoVenda',
            key: 'precoVenda',
            render: (value) => `R$ ${value.toFixed(2)}`,
        },
        {
            title: 'Quantidade',
            dataIndex: 'quantidade',
            key: 'quantidade',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => onEdit(record)}>
                        Editar
                    </Button>
                            <Button type="primary" danger onClick={() => handleDelete(record.id)}>
                                Excluir
                            </Button>
                </Space>
            ),
        },
    ];

    return (
        <Card title="Lista de Produtos" bordered={false}>
            <Table columns={columns} dataSource={produtos} loading={loading} rowKey="id" />
        </Card>
    );
});

export default ProdutosTabela;
