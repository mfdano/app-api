import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { UserController } from './controllers/user.controller';
import { CountryController } from './controllers/country.controller';
import { CityController } from './controllers/city.controller';
import { StateController } from './controllers/state.controller';

import { UserService } from './services/user.service';
import { CountryService } from './services/country.service';
import { StateService } from './services/state.service';
import { CityService } from './services/city.service';

import { UserSchema } from './models/user.model';
import { CountrySchema, Country } from './models/country.model';
import { CitySchema } from './models/city.model';
import { StateSchema } from './models/state.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('NODE_ENV') === 'test'
          ? configService.get<string>('MONGO_TEST_URI')
          : configService.get<string>('MONGO_URI')
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      { name: 'Country', schema: CountrySchema },
      { name: 'City', schema: CitySchema },
      { name: 'State', schema: StateSchema },
      { name: 'User', schema: UserSchema },
    ])
  ],
  controllers: [UserController, CountryController, CityController, StateController, AppController],
  providers: [
    UserService,
    CountryService,
    StateService,
    CityService,
  ],
})

export class AppModule {}
