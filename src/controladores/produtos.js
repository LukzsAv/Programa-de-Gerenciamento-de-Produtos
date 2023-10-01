let produtos = require('../bancodedados/produtos');
const { getStateFromZipcode } = require(`utils-playground`);

const listarProdutos = (req, res) => {
    try {
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const obterProduto = (req, res) => {
    try {
    const id = req.params.id;

    const idAsNumber = Number(id);

    if (isNaN(idAsNumber)) {
        return res.status(400).json({ mensagem: "O valor do parâmetro ID da URL não é um número válido." });
    }

    const produto = produtos.find((produto) => produto.id === idAsNumber);

    if (produto) {
        return res.status(200).json({ mensagem: "Produto encontrado", produto });
    } else {
        return res.status(404).json({ mensagem: "Não existe produto para o ID informado." });
    }
    } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const calcularfrete = async (req, res) => {
    try {
    const id = req.params.id;

    const idAsNumber = Number(id);

    if (isNaN(idAsNumber)) {
        return res.status(400).json({ mensagem: "O valor do parâmetro ID da URL não é um número válido." });
    }

    const produto = produtos.find((produto) => produto.id === idAsNumber);
    const estado = await getStateFromZipcode(req.params.cep);
    let frete = 0
    switch (estado){
        case `BA`: frete = produto.valor * 0.1;
        break;
        case `SE`: frete = produto.valor * 0.1;
        break;
        case `AL`: frete = produto.valor * 0.1;
        break;
        case `PE`: frete = produto.valor * 0.1;
        break;
        case `PB`: frete = produto.valor * 0.1;
        break;
        case `SP`: frete = produto.valor * 0.15;
        break;
        case `RJ`: frete = produto.valor * 0.15;
        break;
        default: frete = produto.valor * 0.12;
    }

    return res.status(200).json({produto,estado,frete})
    } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}




module.exports = {
    listarProdutos,
    obterProduto,
    calcularfrete
}