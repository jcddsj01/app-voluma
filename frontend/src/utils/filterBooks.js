export function applyFilters(books, { categoria, autor, editora }) {
    return books
        .filter((book) => !categoria || book.categoria === categoria)
        .filter((book) => !autor || book.autor === autor)
        .filter((book) => !editora || book.editora === editora);
};