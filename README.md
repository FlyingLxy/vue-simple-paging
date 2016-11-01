## Simple vue paging
Support Set the paging button number.

## Props
- **className**: The class name of the container. type String. Default: 'paging'
- **totalPage**: Total number of pages. type Number or String. Dequired.
- **page**: Current page. type Number or String. required.
- **pageCount**: Needs to display the page button. type Number or String. Default: 5.

## Method
- pageChange: Page change callback(). params: selected page.

## Example:
```
//...a component
//...script
import paging from 'vue-simple-paging';

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
