import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoResolver } from './video.resolver';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';

@Module({
  providers: [
    VideoResolver, 
    VideoService,
  ],
  controllers: [
    VideoController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Video,
    ])
  ],
  exports: [
    VideoService,
  ]
})
export class VideoModule {}
