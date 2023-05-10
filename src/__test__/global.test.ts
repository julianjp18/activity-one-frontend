import FakeStoreService from '../services/FakeStoreService/FakeStoreService'; 

describe("Testing API", () => {
    it('test getProducts List', async () => {
        const response = await FakeStoreService.getProducts();
        if (response) {
            expect(response.statusCode).toEqual(200);
            expect(response?.data?.length).toBeGreaterThan(0);
        }
    });
});