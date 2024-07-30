import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { VideoDto } from './video.dto'
import { VideoModel } from './video.model'

@Injectable()
export class VideoService {
	constructor(
		@InjectModel(VideoModel) private readonly VideoModel: ModelType<VideoModel>
	) {}

	async byId(_id: Types.ObjectId, isPublic = true) {
		//Check authUserId === video.userId
		const video = await this.VideoModel.findOne(
			isPublic ? { _id, isPublic: true } : { _id },
			'-__v'
		).populate('user', 'name location avatarPath isVerified subscribersCount')
		if (!video) throw new UnauthorizedException('Video not found')

		return video
	}

	async getMostPopularByViews() {
		return this.VideoModel.find({ views: { $gt: 0 } }, '-__v')
			.sort({ views: -1 })
			.populate('user', 'name avatarPath isVerified')
			.exec()
	}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm)
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i')
					}
				]
			}

		return this.VideoModel.find({ ...options, isPublic: true })
			.select('-__v')
			.sort({ createdAt: 'desc' })
			.populate('user', 'name avatarPath isVerified')
			.exec()
	}

	async byUserId(userId: Types.ObjectId, isPrivate = false) {
		const userIdCheck = { user: userId }
		const options = isPrivate ? userIdCheck : { ...userIdCheck, isPublic: true }

		return this.VideoModel.find(options, '-__v')
			.sort({ createdAt: 'desc' })
			.populate('user', 'name avatarPath isVerified')
			.exec()
	}

	async create(userId: Types.ObjectId) {
		const defaultValue: VideoDto = {
			name: '',
			user: String(userId),
			videoPath: '',
			description: '',
			thumbnailPath: ''
		}

		const video = await this.VideoModel.create(defaultValue)
		return video._id
	}

	async update(_id: string, dto: VideoDto) {
		const updateVideo = await this.VideoModel.findByIdAndUpdate(_id, dto, {
			new: true
		}).exec()

		if (!updateVideo) throw new NotFoundException('Video not found')

		return updateVideo
	}

	async delete(_id: string) {
		const deleteVideo = await this.VideoModel.findByIdAndDelete(_id).exec()
		if (!deleteVideo) throw new NotFoundException('Video not found')

		return deleteVideo
	}

	async updateCountViews(_id: string) {
		const updateVideo = await this.VideoModel.findByIdAndUpdate(
			_id,
			{
				$inc: { views: 1 }
			},
			{
				new: true
			}
		).exec()

		if (!updateVideo) throw new NotFoundException('Video not found')

		return updateVideo
	}

	async updateReaction(_id: string) {
		const updateVideo = await this.VideoModel.findByIdAndUpdate(
			_id,
			{
				// $inc: { likes: type === 'inc' ? 1 : -1 }
				$inc: { likes: 1 }
			},
			{
				new: true
			}
		).exec()

		if (!updateVideo) throw new NotFoundException('Video not found')

		return updateVideo
	}
}
