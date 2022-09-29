// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipe/validate.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const swaggerOptions = new DocumentBuilder()
        .setTitle('碎片 - 后端文档')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api-doc', app, document);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
    console.log('碎片 server 运行');
}
bootstrap();
