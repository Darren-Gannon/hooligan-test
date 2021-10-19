import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { VideoService } from './video.service';

@ApiBearerAuth()
@Controller('video')
export class VideoController {
    constructor(
      private readonly videoService: VideoService,
    ) {}
  
    @Post()
    createVideo(
      @Body() createVideoInput: CreateVideoInput,
      @Req() req: Request,
    ) {
      return this.videoService.create(createVideoInput, req.user);
    }
  
    @Get()
    findAll(
      @Req() req: Request,
    ) {
      return this.videoService.findAll(req.user);
    }
  
    @Get(':id')
    findOne(
      @Param('id') id: string,
      @Req() req: Request,
    ) {
      return this.videoService.findOne(id, req.user);
    }
  
    @Patch(':id')
    updateVideo(
      @Param('id') id: string,
      @Body() updateVideoInput: UpdateVideoInput,
      @Req() req: Request,
    ) {
      return this.videoService.update(id, updateVideoInput, req.user);
    }
  
    @Delete(':id')
    removeVideo(
      @Param('id') id: string,
      @Req() req: Request,
    ) {
      return this.videoService.remove(id, req.user);
    }
}
