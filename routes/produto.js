const express = require('express');
const connection = require('../connection');
const router = express.Router();

require('dotenv').config();

router.get('/produtos', (req, res) => {
    var query = "SELECT * FROM produtos";
    connection.query(query, (err, results) => {
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.post('/produto', (req, res) => {
    let produto = req.body;
    query = "SELECT codProduto, nomeProduto, descProduto, preco FROM produtos WHERE codProduto=?"
    connection.query(query,[produto.codProduto], (err, results) => {
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})


router.post('/inserirProduto', (req, res) => {
    let produto = req.body;
    query = "SELECT codProduto, nomeProduto, descProduto, preco FROM produtos WHERE codProduto=?"
    connection.query(query, [produto.codProduto], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "INSERT INTO produtos(codProduto, nomeProduto, descProduto, preco) values(?,?,?,?)";
                connection.query(query, [produto.codProduto, produto.nomeProduto, produto.descProduto, produto.preco], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Produto incluído com sucesso" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Já existe um produto com esse código" })
            }
        }
        else {
            return res.status(500).json(err);
        }
    })

})

router.patch('/update', (req, res) => {
    let produto =req.body;
    var query = "UPDATE produtos SET nomeProduto=?, descProduto=?, preco=? WHERE codProduto=?";

    connection.query(query, [produto.nomeProduto, produto.descProduto, produto.preco, produto.codProduto], (err, results) => {
        if(!err){
            if(results.affectedRows == 0) {
                return res.status(404).json({message: "Código de produto não existe!"});
            }
            return res.status(200).json({message: "Produto atualizado com sucesso!"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.post('/deletarProduto', (req, res) => {
    let produto = req.body;
    query = "DELETE FROM produtos WHERE codProduto = ?"
    connection.query(query, [produto.codProduto], (err, results) => {
        if (err) {
            return res.status(500).json(err);
          }
        
          if (results.affectedRows > 0) {
            return res.status(200).json({message: "Produto excluído com sucesso!"});
          } else {
            return res.status(404).json({message: "Produto não encontrado com o código fornecido!"});
        }
    })

})

module.exports = router;