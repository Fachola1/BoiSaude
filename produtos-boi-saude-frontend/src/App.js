import React, { useState } from 'react';
import { Layout, Button, Modal } from 'antd';
import ProdutosTabela from './Components/ProdutosTabela';
import ProdutoForm from './Components/ProdutoForm';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState(null);
    const tabelaRef = React.useRef();

    const handleEdit = (produto) => {
        setSelectedProduto(produto);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedProduto(null);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setIsModalOpen(false);
        setSelectedProduto(null);
        if (tabelaRef.current) {
            tabelaRef.current.recarregarProdutos();
        }
    };

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 style={{ color: 'white', margin: 0 }}>Gestão de Produtos - Boi Saúde</h1>
                <Button type="primary" onClick={handleAdd}>
                    Adicionar Produto
                </Button>
            </Header>
            <Content style={{ padding: '24px' }}>
                <ProdutosTabela ref={tabelaRef} onEdit={handleEdit} />
                <Modal
                    title={selectedProduto ? 'Editar Produto' : 'Novo Produto'}
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                >
                    <ProdutoForm
                        produto={selectedProduto}
                        onSave={handleSave}
                        onCancel={() => setIsModalOpen(false)}
                    />
                </Modal>
            </Content>
        </Layout>
    );
}

export default App;