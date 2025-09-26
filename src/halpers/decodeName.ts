export const decodeName = (name: string) => {
    return name.replace(/&amp;/g, '&');
}