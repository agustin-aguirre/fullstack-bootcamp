import { getCoverUrl, search } from "../repositories/openlibrary.js"

export { getBooksCoverData }


async function getBooksCoverData(searchTerm) {
    const books = (await search(searchTerm)).data;
    const covers = [];
    books.docs.filter(book => book.cover_edition_key || book.cover_i).forEach(book => {
        covers.push({
            shortUrl: book.key,
            title: book.title,
            authors: book.author_name,
            cover: getCoverUrl(
                book.cover_edition_key ? "olid" : "id",
                book.cover_edition_key ?? book.cover_i,
                "L"
            )
        })
    });
    return covers;
}