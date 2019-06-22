'use strict';

function printReceipt(inputs) {
    const goodsInfo = loadAllItems();
    const goods = getGoods(inputs, goodsInfo);
    const summary = getSummary(goods);
    print(goods, summary);
}

function getGoods(inputs, goodsInfo) {
    const goods = [];
    const countedGoods = inputs.reduce((goods, good) => {
        if (good in goods) {
            goods[good]++;
        } else {
            goods[good] = 1;
        }
        return goods;
    }, {});
    Object.keys(countedGoods).forEach(prop => {
        const findGood = goodsInfo.find(good => good.barcode === prop);
        const number = countedGoods[prop];
        const subtotal = findGood.price * number;
        goods.push(
            {
                ...findGood,
                number,
                subtotal,
            }
        );
    });
    return goods;
}

function getSummary(goods) {
    return goods.reduce((acc, good) => acc + good.subtotal, 0).toFixed(2);
}

function print(goods, summary) {
    const head = '***<没钱赚商店>收据***\n';
    const goodInfoStr = goods.map(good => {
        return `名称：${good.name}，数量：${good.number}${good.unit}，单价：${good.price.toFixed(2)}(元)，小计：${good.subtotal.toFixed(2)}(元)\n`;
    });
    const splitLine = '----------------------\n';
    const summaryStr = `总计：${summary}(元)\n`;
    const end = '**********************';

    const printStr = head + goodInfoStr.join('') + splitLine + summaryStr + end;
    console.log(printStr);
}
