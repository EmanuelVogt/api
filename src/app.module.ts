import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infraestructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, ApplicationModule, PresentationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
