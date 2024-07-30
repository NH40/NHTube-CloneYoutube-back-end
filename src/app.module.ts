import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'
import { getMongoConfig } from './config/mongo.config'
import { UserModule } from './user/user.module'
import { VideoModule } from './video/video.module'
import { MediaModule } from './media/media.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		UserModule,
		VideoModule,
		CommentModule,
		AuthModule,
		MediaModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
