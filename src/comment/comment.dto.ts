import { IsString } from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'

export class CommentDto {
	@IsString()
	message: string

	@IsObjectId()
	videoId: string
}
