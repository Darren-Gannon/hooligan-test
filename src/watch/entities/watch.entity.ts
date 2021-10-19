import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GQLDate } from 'src/graphql/scaler/GQLDate';
import { Video } from 'src/video/entities/video.entity';
import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Watch {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Video)
  @JoinColumn()
  @Field(() => Video)
  video: Video;

  @Field(() => ID)
  userId: string;

  @CreateDateColumn()
  createdDate: Date;
}
