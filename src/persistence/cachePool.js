/**
 * 缓存池，爬虫模块与数据库之间。
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-01-14
 */
class CachePool {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.size = 0;
    }

    add(item) {
        if (Array.isArray(item)) {
            return _addArray.bind(this)(item);
        } else {
            return _addOne.bind(this)(item);
        }
    }

    out() {
        let size = this.size;
        if (size > 0) {
            --this.size;
            return pool.shift();
        } else {
            return null;
        }
    }
}
//私有
let pool = [];
function _addArray(items) {
    let size = this.size;
    if (size + items.length <= this.maxSize) {
        for (let i in items) {
            pool.push(items[i]);
            this.size++; 
        }
        return true;
    } else {
        return false;
    }
}
function _addOne(item) {
    let size = this.size;
    if (size + 1 <= this.maxSize) {
        pool.push(item);
        ++this.size;
        return true;
    } else {
        return false;
    }
}
module.exports = CachePool;