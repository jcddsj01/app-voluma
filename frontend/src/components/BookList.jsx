import { Link } from "react-router-dom";
import { applyFilters } from "../utils/filterBooks";

export default function BookList({ books, categoria, autor, editora }) {
    const filteredBooks = applyFilters(books, { categoria, autor, editora });

    return (
        <main className="bg-[#ECECEC] p-6 w-full min-h-screen rounded-br-md">
            <ul className="grid grid-cols-5 gap-4">
                {filteredBooks.map(({ _id, titulo, autor, preco, tipoCapa, imagemCapa }) => (
                    <li key={_id} className="flex flex-col rounded-md items-center p-4 bg-white">
                        <Link to={`/${_id}`}>
                            <img src={imagemCapa} alt={`Capa do livro ${titulo}`} className="object-cover w-40 h-56" />
                            <div className="flex flex-col gap-2 mt-2 items-center text-center">
                                <h2 className="font-bold text-[#EE7354]">{titulo}</h2>
                                <p className="text-black/80 font-medium">{autor}</p>
                                <div className="flex gap-2 items-center">
                                    <p className="text-black/80 font-semibold border-r-2 border-[#D9D9D9] pr-2">{tipoCapa}</p>
                                    <p className="text-black/80">{preco ? preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00'}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}