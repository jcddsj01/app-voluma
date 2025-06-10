const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');
const { upload } = require('../config/cloudinary');

// Rota GET todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar livros.' });
  }
});

// Rota GET livro por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const livro = await Livro.findById(id);
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    res.json(livro);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar livro.' });
  }
});

// Rota PUT para atualizar um livro por ID
router.put('/:id', upload.single('imagemCapa'), async (req, res) => {
  try {
    const { id } = req.params;

    const livro = await Livro.findById(id);
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    // Atualiza os campos, se enviados no body
    if (req.body.titulo) livro.titulo = req.body.titulo;
    if (req.body.categoria) livro.categoria = req.body.categoria;
    if (req.body.autor) livro.autor = req.body.autor;
    if (req.body.numeroPaginas) livro.numeroPaginas = parseInt(req.body.numeroPaginas);
    if (req.body.idioma) livro.idioma = req.body.idioma;
    if (req.body.editora) livro.editora = req.body.editora;
    if (req.body.dataPublicacao) livro.dataPublicacao = new Date(req.body.dataPublicacao);
    if (req.body.tipoCapa) livro.tipoCapa = req.body.tipoCapa;
    if (req.body.quantidadeEstoque) livro.quantidadeEstoque = parseInt(req.body.quantidadeEstoque);
    if (req.body.preco) livro.preco = parseFloat(req.body.preco);
    if (req.body.descricao) livro.descricao = req.body.descricao;

    // Atualiza a URL da imagem, se uma nova imagem foi enviada
    if (req.file && req.file.path) {
      livro.imagemCapa = req.file.path;
    }

    const livroAtualizado = await livro.save();
    res.status(200).json(livroAtualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar livro.' });
  }
});

// Rota POST para criar um livro com upload de capa no Cloudinary
router.post('/', upload.single('imagemCapa'), async (req, res) => {
  try {
    const { titulo, categoria, autor, numeroPaginas, idioma, editora, dataPublicacao, tipoCapa, quantidadeEstoque, preco, descricao} = req.body;

    // URL da imagem da capa retornada pelo Cloudinary após upload
    const imagemCapaUrl = req.file.path;

    const novoLivro = new Livro({
      titulo,
      categoria,
      autor,
      numeroPaginas: numeroPaginas ? parseInt(numeroPaginas) : 0,
      idioma,
      editora,
      dataPublicacao: new Date(dataPublicacao),
      tipoCapa,
      quantidadeEstoque: quantidadeEstoque ? parseInt(quantidadeEstoque) : 0,
      preco: preco ? parseFloat(preco) : 0,
      descricao,
      imagemCapa: imagemCapaUrl,
    });

    await novoLivro.save();

    res.status(201).json(novoLivro);
  } catch (err) {
    console.error('Erro ao criar livro:', err);
    res.status(500).json({ erro: 'Erro ao criar livro.', detalhes: err.message });
  }
});

module.exports = router;
