import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpenText, Globe, Building, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await axios.get(`https://livros-api-8pso.onrender.com/livros/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Erro ao buscar livro", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-[#ECECEC]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#EE7354] mb-4"></div>
        <p className="text-[#143B52] font-medium">Carregando livro...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <p className="text-[#143B52] font-medium">Livro não encontrado.</p>
    );
  };

  return (
    <div className="bg-[#ECECEC] p-6 w-full h-full rounded-br-md">
        <Link to="/" className="flex items-center gap-2 text-[#143B52] mb-4 font-medium">
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
          Voltar para os livros
        </Link>

        <div className="grid grid-cols-[auto_5fr_2fr] gap-6 mb-6 h-72">
            <img src={book.imagemCapa} alt={`Capa do livro ${book.titulo}`} className="object-cover w-auto h-72 p-4 bg-white rounded-md" />

            <div className="flex flex-col rounded-md p-4 bg-white items-center justify-center">
                <h1 className="text-2xl font-bold text-[#EE7354] mb-2">{book.titulo}</h1>

                <div className="flex gap-2 mb-12">
                  <p><span className="font-semibold text-black/80">{book.categoria}</span></p>
                  <span className="font-semibold text-[#D9D9D9]">|</span>
                  <p>por <span className="font-semibold text-black/80">{book.autor}</span> (Autor)</p>
                </div>

                <div className="flex items-center justify-center h-32 text-center px-4 border border-[#143B52] rounded-md">
                  {[
                    { titulo: "Número de páginas", valor: `${book.numeroPaginas} páginas`, icon: BookOpenText },
                    { titulo: "Idioma", valor: `${book.idioma}`, icon: Globe },
                    { titulo: "Editora", valor: `${book.editora}`, icon: Building },
                    { titulo: "Data da Publicação",
                      valor: `${new Date(book.dataPublicacao).toLocaleDateString("pt-BR", {
                        timeZone: "UTC",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }).replace(/ de /g, " ")}`,
                      icon: CalendarDays },
                  ].map((bookDetails, index) => {
                    const Icon = bookDetails.icon;
                    return (
                      <div key={index} className="flex flex-col items-center justify-center w-32 gap-2 text-center">
                        <h1 className="break-words text-sm text-black/80">{bookDetails.titulo}</h1>
                        <Icon color="#EE7354" className="w-6 h-6" />
                        <p className="break-words text-sm font-semibold text-black/80">{bookDetails.valor}</p>
                    </div>
                    );
                  })}
                </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-4 p-6 rounded-md bg-white">
                <div className="flex flex-col w-full items-center justify-center border border-[#EE7354] rounded-md p-2">
                  <p className="text-black/80 font-semibold">{book.tipoCapa}</p>
                  <p className="text-black/80">
                    {book.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-4 items-center">
                  <h2 className="text-black/80 font-semibold">Em estoque</h2>
                  <p>Quantidade: {book.quantidadeEstoque}</p>
                  {/* <select name="select">
                    <option value="1" selected hidden>Quantidade: 1</option>
                    <option value="2">2</option>
                  </select> */}
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <button type="button" className="bg-[#EE7354] p-2 px-4 rounded-md font-medium text-white text-sm cursor-pointer">Adicionar ao carinho</button>
                  <button type="button" className="bg-[#143B52] p-2 px-4 rounded-md font-medium text-white text-sm cursor-pointer">Comprar agora</button>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-2 bg-white p-4 rounded-md">
          <h1 className="text-xl font-bold text-[#143B52]">Sobre o livro</h1>
            {book.descricao.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
    </div>
  );
}
