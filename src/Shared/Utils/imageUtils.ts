/**
 * Tenta alternar entre as extensões mais comuns caso uma imagem falhe ao carregar.
 * @param currentUrl A URL atual que falhou
 * @returns A nova URL com a extensão alternada, ou null se não houver alternativa.
 */
export const getFallbackImageUrl = (currentUrl: string): string | null => {
    const url = currentUrl.toLowerCase();
    
    if (url.endsWith('.png')) {
        return currentUrl.replace(/\.png$/i, '.jpg');
    }
    
    if (url.endsWith('.jpg')) {
        return currentUrl.replace(/\.jpg$/i, '.png');
    }
    
    if (url.endsWith('.jpeg')) {
        return currentUrl.replace(/\.jpeg$/i, '.png');
    }
    
    return null;
};
