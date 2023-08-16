import { cardapio } from './cardapio.js';

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        let total = 0;
        const itensPedidos = itens.map(item => item.split(',')[0]);

        if (itens.length === 0) return 'Não há itens no carrinho de compra!';

        for (let i = 0; i < itens.length; i++) {

            const [codigo, quantidade] = itens[i].split(',');

            const itemCardapio = cardapio.find(item => item.codigo === codigo);

            if (!itemCardapio) return 'Item inválido!';

            if (itemCardapio.itemPrincipal && !itensPedidos.includes(itemCardapio.itemPrincipal[0]))
                return 'Item extra não pode ser pedido sem o principal';

            total += itemCardapio.valor * parseInt(quantidade, 10);

            if (quantidade == 0) return 'Quantidade inválida!';

        }

        switch (metodoDePagamento) {
            case 'dinheiro':
                total *= 0.95;
                break;
            case 'debito':
                break;
            case 'credito':
                total *= 1.03;
                break;
            default:
                return "Forma de pagamento inválida!";
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

}

const valorFinal = new CaixaDaLanchonete()
    .calcularValorDaCompra('credito', ['combo1,1', 'cafe,2']);

console.log(valorFinal);

export { CaixaDaLanchonete };
