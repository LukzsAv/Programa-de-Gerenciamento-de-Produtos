const express = require('express');
const produtos = require('./controladores/produtos');


const router = express();

router.get('/produtos', produtos.listarProdutos );
router.get('/produtos/:id', produtos.obterProduto );
router.get('/produtos/:id/frete/:cep', produtos.calcularfrete );





module.exports = router;