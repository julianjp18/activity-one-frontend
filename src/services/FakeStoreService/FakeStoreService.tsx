import { get } from "../../api/fetch";
import { ProductI, ServiceI } from "./FakeStoreService.utils";

//const MAIN_URL = import.meta.env.VITE_BACKEND_URL;
const MAIN_URL = 'https://api.mercadolibre.com/';

const FakeStoreService = {
    getProducts: async (queryParam = ':query'): Promise<ServiceI> => {
      try {
        const params = new URLSearchParams({ q: queryParam });
        const { results } = await get(`${MAIN_URL}sites/MLA/search?${params}`);
        if (results.length > 0) {
          let categories: any = [];
          const itemsList: ProductI[] = [];
            results.forEach(({
                category_id,
                condition,
                id,
                installments: { currency_id, amount, rate },
                shipping: { free_shipping },
                thumbnail,
                title,
            }: any) => {
                categories.push(category_id);
                itemsList.push({
                    id,
                    condition,
                    title,
                    category_id,
                    picture: thumbnail,
                    price: {
                        currency: currency_id || 0,
                        amount,
                        decimals: rate,
                    },
                    free_shipping,
                })
            });
            if (categories.length > 0) categories = [...new Set(categories)];
            return {
              categories,
              data: itemsList,
              statusCode: 200,
            };
        }
        
        return {
            data: null,
            statusCode: 200,
        };
      } catch (err: any) {
        return {
            data: null,
            statusCode: 500,
            error: err,
        };
      }
    },
    getProductById: async (productId: string): Promise<ServiceI> => {
        try {
          const generalData = await get(`${MAIN_URL}items/${productId}`);
          const description = await get(`${MAIN_URL}items/${productId}/description`);
          const {
            category_id,
            condition,
            currency_id,
            id,
            pictures,
            price,
            shipping: { free_shipping },
            sold_quantity,
            title,
            thumbnail,
          } = generalData;
          const { plain_text } = description;
          if (generalData || description) {
            const itemFounded = {
              id,
              condition,
              free_shipping,
              category_id,
              picture: pictures[0].url ?? thumbnail,
              price: {
                  currency: currency_id,
                  amount: price,
              },
              title,
              sold_quantity,
            };
            return {
                data: new Array({
                  ...itemFounded,
                  description: plain_text,
              }),
                statusCode: 200,
            };
          }
          return {
            data: null,
            statusCode: 200,
          };
        } catch (err: any) {
          return {
              data: null,
              statusCode: 500,
              error: err,
          };
        }
      },
};

export default FakeStoreService;