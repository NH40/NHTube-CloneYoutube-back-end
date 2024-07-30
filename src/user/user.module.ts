import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserController } from './user.controller'
import { UserModel } from './user.model'
import { UserService } from './user.service'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User'
				}
			}
		]),
		ConfigModule
	]
})
export class UserModule {}
