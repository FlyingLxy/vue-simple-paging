# simple vue paging
Support Set the paging button number.
# props
- className: The class name of the container. type String. default: 'paging'
- totalPage: Total number of pages. type Number or String. required.
- page: Current page. type Number or String. required.
- pageCount: Needs to display the page button. type Number or String. default: 5.
# method
- pageChange: Page change callback(). params: selected page.
# example:
```
//...a component
//...script
import paging from 'vue-paging';

export default {
  data() {
    return {
	page: 1
    }
  },
  components: {
      paging
  },
  methods: {
    pageChange: function (page) {
      // The type of page is Number
      // ...code
      this.page = page;
    }
  }
}

//...html
<paging
  className="my-paging"
  totalPage="30"
  page="page",
  pageCount="10"
  @pageChange="pageChange"
>
</paging>
