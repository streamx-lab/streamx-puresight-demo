!function() {
    const RP_CONTAINER_ID = 'related-products-component';
    const RESULTS_CONTAINER_ID = 'product-list';
    const PER_PAGE = 5;
    const RELATED_PRODUCTS_LIMIT = 4;
    const SEARCH_URL = '/search/query/body';
    const DEFAULT_IMG = '../data/assets/342x457.webp';

    const mapToPagesResponse = (response) => {;
      const items = [];
      const respItems = response?.hits || [];

      for (let i = 0; i < respItems.length; i++) {
          const tmpItem = respItems[i]._source?.payload;
          const item = {
            id: tmpItem.id,
            imgSrc: tmpItem?.primaryImage?.url || DEFAULT_IMG,
            imgAlt: tmpItem?.primaryImage?.alt || '',
            name: tmpItem?.name || '',
            slug: tmpItem?.slug || '',
            description: tmpItem?.description || '',
            price: tmpItem?.price?.value || '', // not sure if value or discountedValue
            keywords: tmpItem?.ft_keyword || []
          }

          items.push(item);
        }
      return items;
    };

    const buildQuery = (category) => {

     const query = {
       id: 'products',
       params: {
         from: 0,
         size: PER_PAGE,
         ...(category ? { filter_category: { fields: [category] } } : {})
       }
     };

      return JSON.stringify(query);
    };

    const getItemTemplate = (item) => {
        return `
              <div class="flex flex-col h-full">
                <figure class="w-full aspect-[3/4] flex">
                  <picture class="w-full object-cover content-center">
                    <img class="w-full" src="${item.imgSrc}" loading="lazy" alt=""/>
                  </picture>
                </figure>
                <div class="mt-4 flex gap-y-2 flex-wrap flex-1">
                  <div class="flex flex-col flex-grow w-full p-4">
                    <div class="flex flex-row items-center flex-grow w-full">
                      <p class="text-base font-bold text-gray-700 truncate flex-grow">
                        ${ item.name }
                      </p>
                      <div class="flex items-center flex-shrink-0">
                        <i class="mdi mdi-star " aria-hidden="true"></i>
                        <i class="mdi mdi-star " aria-hidden="true"></i>
                        <i class="mdi mdi-star " aria-hidden="true"></i>
                        <i class="mdi mdi-star " aria-hidden="true"></i>
                        <i class="mdi mdi-star-outline " aria-hidden="true"></i>
                      </div>
                    </div>
                    <div class="flex flex-row items-center flex-grow w-full">
                      <p class="text-base font-bold price-text-color truncate flex-grow">
                        ${ item.price }&euro;
                      </p>
                      <a href="/products/${item.slug}.html" class="flex-shrink-0 px-2 py-1 w-fit bg-neutral-700 hover:bg-neutral-800 text-neutral-100 rounded-sm">
                        <span class="inline-block w-auto">
                          <i class="mdi mdi-24px mdi-cart-outline" aria-hidden="false"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
    };

    const handleResponse = (response) => {
      const id = document.getElementById(RP_CONTAINER_ID).getAttribute('data-id');
      const ul = document.getElementById(RESULTS_CONTAINER_ID);
      const products =  mapToPagesResponse(response.hits);

      let itemsToRenderCounter = 0
      products.forEach((product) => {
        if (product.id !== id && itemsToRenderCounter < RELATED_PRODUCTS_LIMIT) {
          const li = document.createElement('li');
          li.classList.add('border-neutral-200', 'border', 'items-center', 'rounded-md', 'truncate');
          li.innerHTML = getItemTemplate(product).trim();
          ul.appendChild(li);
          itemsToRenderCounter++;
        }
      });
    }

    const fetchProductData = () => {
      const category = document.getElementById(RP_CONTAINER_ID).getAttribute('data-category');

      fetch(SEARCH_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: buildQuery(category)
      })
      .then((response) => response.json())
      .then((response) => {
        handleResponse(response);
      });
    }

    const init = () => {
      fetchProductData();
    }

    init();
}();
