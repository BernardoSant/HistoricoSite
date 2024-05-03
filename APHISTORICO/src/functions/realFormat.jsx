export const realFormat = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}