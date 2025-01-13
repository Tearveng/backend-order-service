import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AxiosExceptionFilter } from './exception/AxiosExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply the custom exception filter globally
  app.useGlobalFilters(new AxiosExceptionFilter());
  await app.listen(4002);
}
bootstrap();
