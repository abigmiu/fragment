// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipe/validate.pipe';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['warn', 'error', 'debug', 'verbose'],
    });
    app.setGlobalPrefix('api');

    const swaggerOptions = new DocumentBuilder()
        .setTitle('碎片 - 后端文档')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api-doc', app, document);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3009);

    console.log('碎片 server 运行', 'http://localhost:3009');
    console.log('swagger', 'http://localhost:3009/api-doc');
    if (module.hot) {
        console.log('hot update');
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
