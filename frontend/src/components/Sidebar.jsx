function Sidebar({ books, onCategoriaClick, categoriaSelecionada, onAutorClick, autorSelecionado, onEditoraClick, editoraSelecionada }) {
    // Extrai categorias únicas
    const categorias = [...new Set(books.map((book) => book.categoria))];
    
    // Extrai autores únicos
    const autores = [...new Set(books.map((book) => book.autor))];

    // Extrai editoras únicas
    const editoras = [...new Set(books.map((book) => book.editora))];
    
    return (
        <aside className="bg-[#D9D9D9] p-6 w-64 rounded-bl-md">
            <h1 className="pb-2 text-[#EE7354] font-bold">Categorias</h1>
            <ul className="space-y-1 mb-4">
                <li
                className={`text-black/80 rounded-md py-1 pl-6 font-semibold cursor-pointer
                    ${!categoriaSelecionada ? 'bg-[#143B52] text-white' : 'hover:bg-[#143B52]/10'}`} 
                onClick={() => onCategoriaClick(null)}>
                    Todos
                </li>
                {categorias.map((categoria, index) => (
                    <li key={index}
                    className={`text-black/80 rounded-md py-1 pl-6 font-semibold cursor-pointer
                    ${categoriaSelecionada === categoria ? 'bg-[#143B52] text-white' : 'hover:bg-[#143B52]/10'}`}
                    onClick={() => onCategoriaClick(categoria)}>
                        {categoria}
                    </li>
                ))}
            </ul>

            <h1 className="pb-2 text-[#EE7354] font-bold">Autor</h1>
            <ul className="space-y-1 mb-4">
                <li
                className={`text-black/80 rounded-md py-1 pl-6 font-semibold cursor-pointer
                    ${!autorSelecionado ? 'bg-[#143B52] text-white' : 'hover:bg-[#143B52]/10'}`} 
                onClick={() => onAutorClick(null)}>
                    Todos
                </li>
                {autores.map((autor, index) => (
                    <li key={index}
                    className={`text-black/80 rounded-md py-1 pl-6 font-semibold cursor-pointer
                    ${autorSelecionado === autor ? 'bg-[#143B52] text-white' : 'hover:bg-[#143B52]/10'}`}
                    onClick={() => onAutorClick(autor)}>
                        {autor}
                    </li>
                ))}
            </ul>

            <h1 className="pb-2 text-[#EE7354] font-bold">Editora</h1>
            <ul className="space-y-1 mb-4">
                <li
                className={`text-black/80 rounded-md py-1 pl-6 font-semibold cursor-pointer
                    ${!editoraSelecionada ? 'bg-[#143B52] text-white' : 'hover:bg-[#143B52]/10'}`} 
                onClick={() => onEditoraClick(null)}>
                    Todos
                </li>
                {editoras.map((editora, index) => (
                    <li key={index}
                    className={`text-black/80 rounded-md py-1 pl-6 font-semibold cursor-pointer
                    ${editoraSelecionada === editora ? 'bg-[#143B52] text-white' : 'hover:bg-[#143B52]/10'}`}
                    onClick={() => onEditoraClick(editora)}>
                        {editora}
                    </li>
                ))}
            </ul>
        </aside>
    )
};

export default Sidebar;