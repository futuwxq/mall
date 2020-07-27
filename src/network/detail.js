import { request } from './require';

export function getDetails(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newprice = itemInfo.price;
        this.oldprice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.discountcolor = itemInfo.discountBgColor;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}
export class Shop {
    constructor(shopinfo) {
        this.logo = shopinfo.shopLogo;
        this.name = shopinfo.name;
        this.fans = shopinfo.cFans;
        this.sells = shopinfo.cSells;
        this.score = shopinfo.score;
        this.goodsCount = shopinfo.cGoods;
    }
}