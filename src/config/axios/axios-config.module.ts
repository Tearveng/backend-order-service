import { Module } from '@nestjs/common';
import { AXIOS_INSTANCE_TOKEN } from './axios-config.token';
import axios, { AxiosInstance } from 'axios';

// This is where we define the token and provide the Axios instance
@Module({
  providers: [
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: axios.create({
        baseURL: 'http://localhost:4000',
        timeout: 5000,
      }),
    },
  ],
  exports: [AXIOS_INSTANCE_TOKEN],
})
export class AxiosConfigModule {}
