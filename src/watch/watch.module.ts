import { Module } from '@nestjs/common';
import { WatchService } from './watch.service';
import { WatchResolver } from './watch.resolver';
import { WatchController } from './watch.controller';
import { VideoModule } from 'src/video/video.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/video/entities/video.entity';
import { Watch } from './entities/watch.entity';
import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { WATCH_MODULE_CONFIG } from './constants';
import { WatchModuleConfig } from './watch-module-config';

@Module({
  providers: [WatchResolver, WatchService],
  controllers: [WatchController],
  imports: [
    TypeOrmModule.forFeature([
      Video,
      Watch,
    ]),
    VideoModule,
  ]
})
export class WatchModule extends createConfigurableDynamicRootModule<WatchModule, WatchModuleConfig>(WATCH_MODULE_CONFIG){ }
