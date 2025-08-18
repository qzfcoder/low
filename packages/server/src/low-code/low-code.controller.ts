import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LowCodeService } from './low-code.service';
import { PostReleaseRequest } from '@lowcode/share';
import { getUserMess, TCurrentUser } from 'src/utils/getUserMessTool';
import { AuthGuard } from '@nestjs/passport';

@Controller('low-code')
export class LowCodeController {
  constructor(private readonly lowCodeService: LowCodeService) {}

  /**
   *
   *  地带吗发布控制器
   */
  @Post('release')
  @UseGuards(AuthGuard('jwt'))
  release(
    @Body() body: PostReleaseRequest,
    @getUserMess() userMess: TCurrentUser,
  ) {
    console.log('userMess', userMess);
    return this.lowCodeService.release(body, userMess);
  }

  @Get('releaseWithUser')
  @UseGuards(AuthGuard('jwt'))
  releaseWithUser(@getUserMess() userMess: TCurrentUser) {
    return this.lowCodeService.getReleaseData(userMess);
  }
}
