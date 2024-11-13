import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LocationsModule } from './locations/locations.module';
import { BuildingModule } from './building/building.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/${process.env.NODE_ENV || 'dev'}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line prettier/prettier
      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get<string>('TYPEORM_DATABASE_TYPE'),
          host: configService.get<string>('TYPEORM_DATABASE_HOST'),
          port: Number(configService.get<string>('TYPEORM_DATABASE_PORT')),
          username: configService.get<string>('TYPEORM_DATABASE_USERNAME'),
          password: configService.get<string>('TYPEORM_DATABASE_PASSWORD'),
          database: configService.get<string>('TYPEORM_DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          namingStrategy: new SnakeNamingStrategy(),
        } as TypeOrmModuleOptions),
    }),
    LocationsModule,
    BuildingModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
