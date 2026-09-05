// Scraper main entry point
import { NestFactory } from '@nestjs/core';
import { ScraperModule } from './scraper.module';

async function bootstrap() {
  const app = await NestFactory.create(ScraperModule);
  await app.listen(3002);
}
bootstrap();