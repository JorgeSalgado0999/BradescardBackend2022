"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlug = void 0;
const createSlug = (word) => {
    try {
        const slug = word
            .split(' ')
            .join('-')
            .toLowerCase()
            .normalize('NFD')
            .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
            .normalize();
        return slug;
    }
    catch (ex) {
        console.log(ex);
        return '';
    }
};
exports.createSlug = createSlug;
//# sourceMappingURL=utils.js.map