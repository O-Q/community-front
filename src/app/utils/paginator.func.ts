export function makeQuery(flair: string, page = 1, itemsPerPage = 10) {
    if (flair) {
        return {
            page,
            itemsPerPage,
            flair
        };
    } else {
        return {
            page,
            itemsPerPage,
        };
    }
}