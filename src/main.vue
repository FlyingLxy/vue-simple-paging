<script>
/**
 * @file 分页组件
 * @param { totalPage } String/Number - 总页码数
 * @param { page } String/Number - 当前页码
 * @param { pageCount } String/Number - 显示页码按钮数
 * @param { change } CallBack - 页码变化回调. 参数：String. 选中的页数
 * @author XiaoYu.Lang Email: webdeveloperfox@gmail.com
 */
var util = {
    toNum: val => parseInt(val)
}
export default {
    name: 'paging',
    created() {
        this.pageCounter();
    },
    data() {
        return {
            pages: []
        }
    },
    props: {
        value: {
            type: [Number, String],
            validator: util.toNum.bind(this)
        },
        totalPage: {
            type: [Number, String],
            required: true,
            validator: util.toNum.bind(this)
        },
        page: {
            type: [Number, String],
            validator: util.toNum.bind(this)
        },
        pageCount: {
            type: [Number, String],
            default: 5,
            validator: val => {
                if (!(parseInt(val) >= 5)) {
                    console.warn('reasonable pageCount required >= 5 !!!')
                    return false;
                }
                return parseInt(val);
            }
        }
    },
    computed: {
        firstAndLast: function () {
            return [1, parseInt(this.totalPage)];
        },
        _page: function () {
            return parseInt(this.value) || parseInt(this.page);
        }
    },
    watch: {
        _page: function () {
            this.pageCounter();
        },
        totalPage: function () {
            this.pageCounter();
        },
        pageCount: function () {
            this.pageCounter();
        }
    },
    methods: {
        pageCounter: function () {
            var _pageCount = parseInt(this.pageCount);
            var _totalPage = parseInt(this.totalPage);
            this.pages.length = 0;
            var _page = this._page;
            var first = this.firstAndLast[0];
            var last = this.firstAndLast[1];
            var symbol = -1;
            var middle = _pageCount - 3;
            if (_pageCount >= _totalPage) {
                for (var i = 1; i < _totalPage + 1; i++) {
                    this.pages.push(i);
                }
                return;
            }
            if (_page <= Math.ceil(_pageCount/2)) {
                var arr = Array(_pageCount - 2).fill().map((v,i) => i + 2);
                this.pages = [].concat(first, arr, symbol, last);
                return;
            }
            if ((_totalPage - _page) <= parseInt(_pageCount/2)) {
                var arr = Array(_pageCount - 2).fill().map((v,i) => {
                    return _totalPage - (i + 1);
                }).reverse();
                return this.pages = [].concat(first, symbol, arr, last);
            }
            var left = Array(Math.ceil(middle/2)).fill().map((v,i) => {
                var n = i + 1;
                return _page - n;
            }).reverse();
            var right = Array(parseInt(middle/2)).fill().map((v,i) => {
                var n = i + 1;
                return _page + n;
            });
            if ((_totalPage - _page) > parseInt(_pageCount/2)) {
                this.pages = [].concat(first, left, _page, right, symbol, last);
            }else {
                this.pages = [].concat(first, symbol, left, _page, right, last);
            }
        },
        pre: function () {
            this.$emit('input', this._page - 1);
            this.$emit('change', this._page - 1);
        },
        next: function () {
            var page = this.value || this.page;
            this.$emit('input', this._page + 1);
            this.$emit('change', this._page + 1);
        },
        selectional: function (page) {
            this.$emit('input', page);
            this.$emit('change', page);
        }
    }
}
</script>

<template>
    <div class="paging">
        <div class="btn-up" @click="_page > 1 && pre()">
            <p>上一页</p>
        </div>
        <ul class="page-count">
            <li
                v-for="p in pages"
                v-text="p === -1 ? '...' : p"
                :class="{'active-page': p === _page}"
                :key="p"
                :style="p === -1 && {border: 0}"
                @click="p !== -1 && selectional(parseInt(p))"
                >
            </li>
        </ul>
        <div class="btn-down" @click="_page < totalPage && next()">
            <p>下一页</p>
        </div>
    </div>
</template>

<style>
.paging .page-count,
.paging .btn-up,
.paging .btn-down {
    font-family: sans-serif;
    font-size: 0;
    display: inline-block;
    list-style: none;
}
.paging .btn-up p,
.paging .btn-down p {
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}
.paging .page-count li {
    display: inline-block;
    margin: 4px;
    width: 40px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
}
.paging .page-count .active-page {
    background-color: #666;
    color: #fff;
}
</style>
