import { request } from "./request"

export function getDetail(id) {
    return request({
        url: '/detail',
        params: {
            iid: id,
        }
    })
}

export function getRecommend() {
    return request({
        url: "/recommend",
    })
}

export class Goods {
    constructor(itemInfo, columns, shopInfo, service, ) {
        this.title = itemInfo.title;
        this.name = shopInfo.name;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.realprice = itemInfo.lowNowPrice;
        this.discount = itemInfo.discountDesc;
        this.bgc = itemInfo.discountBgColor;
        this.columns = columns;
        this.service = service;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

export class GoodsParam {
    constructor(info, rule) {
        // iamges可能没有值(某些商品有值，某些没有值)
        this.iamge = info.image ? info.image[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}