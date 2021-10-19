import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {

  const bootstrapLogger: Logger = new Logger('boostrap');
  const morganLogger: Logger = new Logger('Morgan');

  const app = await NestFactory.create(AppModule);

  app.use(morgan('tiny', {
    stream: {
        write: (message) => morganLogger.log(message.replace('\n', '')),
    },
  }));

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Hooligan test')
    .setDescription('The video streaming API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT: number = 3000;

  await app.listen(PORT);
  bootstrapLogger.log(`Api is live on: 'http://localhost:${3000}'`)
  bootstrapLogger.log(`Swagger is avaliable on: 'http://localhost:${3000}/api'`)
  bootstrapLogger.log(`Graphical Playground is avaliable on: 'http://localhost:${3000}/graphql'`)
}
bootstrap();
