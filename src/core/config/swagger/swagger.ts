import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle('Assesment')
    .setDescription('26/12/2024 [Assesment]');
  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}
