import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { circularJSON } from '../circularJSON';
import { Stock } from '../../models/Product.interface';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(private readonly httpService: HttpService) {}

  // get products by ids
  async getProducts(ids: string): Promise<string> {
    try {
      this.logger.log(`Getting products for ${ids}`);
      const response = await firstValueFrom(
        this.httpService
          .get(
            `http://localhost:4000/products/multiple-products?ids=${encodeURIComponent(ids)}`,
          )
          .pipe(
            catchError((error) => {
              this.logger.log('error', error.response.data);
              // Custom error handling
              throw error;
            }),
          ),
      );

      const resConvert = `${circularJSON.stringify(response)}`;
      // Process the response data
      this.logger.log(`[Product service]: ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error(`Error making HTTP request: ${error}`);
      throw error;
    }
  }

  // get products by ids
  async stockSold(stocks: Stock[]): Promise<string> {
    console.log('order', stocks);
    try {
      this.logger.log(`Processing stock for sold ${stocks}`);
      const response = await firstValueFrom(
        this.httpService
          .post(`http://localhost:4000/stocks/stock-sold`, stocks)
          .pipe(
            catchError((error) => {
              this.logger.log('error', error.response.data);
              // Custom error handling
              throw error;
            }),
          ),
      );

      const resConvert = `${circularJSON.stringify(response)}`;
      // Process the response data
      this.logger.log(`[Stock service]: ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error(`Error making HTTP request: ${error}`);
      throw error;
    }
  }

  // get stocks by ids
  async getStocks(ids: string): Promise<string> {
    try {
      this.logger.log(`Getting stocks for ${ids}`);
      const response = await firstValueFrom(
        this.httpService
          .get(
            `http://localhost:4000/stocks/multiple-stocks?ids=${encodeURIComponent(ids)}`,
          )
          .pipe(
            catchError((error) => {
              this.logger.log('error', error.response.data);
              // Custom error handling
              throw error;
            }),
          ),
      );

      const resConvert = `${circularJSON.stringify(response)}`;
      // Process the response data
      this.logger.log(`[Stocks service]: ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error(`Error making HTTP request: ${error}`);
      throw error;
    }
  }

  // get products by id
  async getProductById(id: number): Promise<string> {
    try {
      this.logger.log(`Getting product for ${id}`);
      const response = await firstValueFrom(
        this.httpService
          .get(
            `http://localhost:4000/products/product/${encodeURIComponent(id)}`,
          )
          .pipe(
            catchError((error) => {
              this.logger.log('error', error.response.data);
              // Custom error handling
              throw error;
            }),
          ),
      );
      const resConvert = `${circularJSON.stringify(response.data)}`;
      // Process the response data
      this.logger.log(`[Product service]: ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error(`Error making HTTP request: ${error}`);
      throw error;
    }
  }

  // get products by id
  async getProductByCode(code: string): Promise<string> {
    try {
      this.logger.log(`Getting product for ${code}`);
      const response = await firstValueFrom(
        this.httpService
          .get(
            `http://localhost:4000/products/product/code/${encodeURIComponent(code)}`,
          )
          .pipe(
            catchError((error) => {
              this.logger.log('error', error.response.data);
              // Custom error handling
              throw error;
            }),
          ),
      );
      const resConvert = `${circularJSON.stringify(response.data)}`;
      // Process the response data
      this.logger.log(`[Product service]: ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error(`Error making HTTP request: ${error}`);
      throw error;
    }
  }

  // get stock by code
  async getStockByCode(code: string): Promise<string> {
    try {
      this.logger.log(`Getting stock for ${code}`);
      const response = await firstValueFrom(
        this.httpService
          .get(
            `http://localhost:4000/stocks/stock/code/${encodeURIComponent(code)}`,
          )
          .pipe(
            catchError((error) => {
              this.logger.log('error', error.response.data);
              // Custom error handling
              throw error;
            }),
          ),
      );
      const resConvert = `${circularJSON.stringify(response.data)}`;
      // Process the response data
      this.logger.log(`[Stock service]: ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error(`Error making HTTP request: ${error}`);
      throw error;
    }
  }

  // get stock by sku-code
  async getStockBySkuCode(skuCode: string): Promise<string> {
    try {
      this.logger.log(`Getting stock for ${skuCode}`);
      const response = await firstValueFrom(
        this.httpService
          .get(
            `http://localhost:4000/stocks/stock/sku-code/${encodeURIComponent(skuCode)}`,
          )
          .pipe(
            catchError((error) => {
              this.logger.log('error', error.response.data);
              // Custom error handling
              throw error;
            }),
          ),
      );
      const resConvert = `${circularJSON.stringify(response.data)}`;
      // Process the response data
      this.logger.log(`[Stock service]: ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error(`Error making HTTP request: ${error}`);
      throw error;
    }
  }

  // get profile by id
  async getProfileById(id: number | string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:4001/users/user/${id}`).pipe(
          catchError((error) => {
            this.logger.log('error', error.response.data);
            // Custom error handling
            throw error;
          }),
        ),
      );
      const resConvert = `${circularJSON.stringify(response.data)}`;
      // Process the response data
      this.logger.log(`[Profile service]: successfully ${resConvert}`);
      return resConvert;
    } catch (error) {
      this.logger.error('Error making HTTP request:', error);
      throw error;
    }
  }

  // get authorization
  getBearerToken(authHeader: string): string {
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return 'No bearer token found';
  }
}
