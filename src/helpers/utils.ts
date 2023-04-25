export const createSlug = (word: String) => {
    try{
        const slug = word
        .split(' ')
        .join('-')
        .toLowerCase()
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
        .normalize();

        return slug;
    }catch(ex){
        console.log(ex);
        return '';
    }
}