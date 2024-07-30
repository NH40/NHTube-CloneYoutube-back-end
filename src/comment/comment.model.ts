import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from '../user/user.model'
import { VideoModel } from '../video/video.model'

export interface CommentModel extends Base {}

export class CommentModel extends TimeStamps {
	@prop({ ref: () => UserModel })
	user: Ref<UserModel>

	@prop({ ref: () => VideoModel })
	video: Ref<VideoModel>

	@prop()
	message: string
}
