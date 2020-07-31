import { request } from './require';

export function getDetails(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommends() {
    return request({
        url: '/recommend'
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
        // 需要添加到购物车的价格
        this.realPrice = itemInfo.lowNowPrice;
    }
}

export class GoodsParam {
    constructor(info, rule) {
        // images 可能没有数据
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;

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