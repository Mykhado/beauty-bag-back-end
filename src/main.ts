import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ajout restriction par format
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  // ajout terme 'api' après http://localhost:8080/api/
  app.setGlobalPrefix('api');
  //ajout CORS
  app.enableCors();

  await app.listen(8080);
}
bootstrap();
