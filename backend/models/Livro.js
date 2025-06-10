const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    categoria: {
        type: String,
        enum: ['Finanças', 'Tecnologia', 'Autoajuda', 'Ficção Científica', 'História'],
        required: true
    },
    autor: { type: String, required: true },
    numeroPaginas: { type: Number, required: true, default: 0, min: 1 },
    idioma: { type: String, default: "Português" },
    editora: { type: String, required: true },
    dataPublicacao: { type: Date, required: true },
    tipoCapa: { type: String, default: "Capa comum" },
    quantidadeEstoque: { type: Number, default: 0, min: 1 },
    preco: { type: Number, required: true, default: 0, min: 0 }, 
    descricao: { type: String, required: true },
    imagemCapa: { type: String, required: true }
});

module.exports = mongoose.model('Livro', livroSchema);