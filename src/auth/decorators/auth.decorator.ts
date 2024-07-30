import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport/dist/auth.guard'

export const Auth = () => UseGuards(AuthGuard('jwt'))
