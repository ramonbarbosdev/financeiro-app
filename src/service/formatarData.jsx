export function formatarData(data) {
    if (Array.isArray(data) && data.length === 3) {
        return `${data[0]}-${String(data[1]).padStart(2, '0')}-${String(data[2]).padStart(2, '0')}`;
    }
    return data; 
}