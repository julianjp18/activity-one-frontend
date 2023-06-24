import { get, post } from "../../api/fetch";
import { ProductI, ServiceI } from "./FakeStoreService.utils";

const MAIN_URL = 'http://localhost:8762/';

const FakeStoreService = {
    getProducts: async (queryParam = ''): Promise<ServiceI> => {
      try {
        const params = new URLSearchParams({ description: queryParam, title: queryParam });
        const results = await get(`${MAIN_URL}ms-search/products${queryParam ? `?${params}` : ''}`);
        if (results.length > 0) {
          let categories: any = [];
          const itemsList: ProductI[] = [];
          results.forEach(({
            categoryId,
            id,
            thumbnail,
            title,
            price,
          }: any) => {
              categories.push(categoryId);
              itemsList.push({
                id,
                title,
                category_id: categoryId,
                picture: thumbnail,
                price,
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
    getProductById: async (productId: string): Promise<any> => {
        try {
          const generalData = await get(`${MAIN_URL}ms-search/products?id=${productId}`);
          // const description = await get(`${MAIN_URL}products/${productId}/description`);
          const {
            category_id,
            id,
            price,
            title,
            thumbnail,
            description,
          } = generalData[0];

          if (generalData || description) {
            const itemFounded = {
              id,
              category_id,
              picture: thumbnail,
              price: price,
              title,
            };
            return {
                data: new Array({
                  ...itemFounded,
                  description,
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
    buyProductById: async (id: string, payload: any): Promise<any> => {
      try {
        const {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          price,
          comments,
        } = payload;
        const data = await post(`${MAIN_URL}ms-actions/purchases`, {
          productId: id,
          quantity: 1,
          totalAmount: price,
          customerName: firstName,
          customerLastName: lastName,
          customerEmail: email,
          customerPhone: phone,
          customerAddress: address,
          customerCity: city,
          comments,
        });
        return {
          data,
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