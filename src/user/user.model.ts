import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	email: string

	@prop()
	password: string

	@prop()
	name: string

	@prop({ default: false })
	isVerified: boolean

	@prop({ default: 0 })
	subscribersCount?: number

	@prop()
	description: string

	@prop()
	location: string

	@prop()
	avatarPath: string
}
