import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Video } from 'src/video/entities/video.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Watch {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Video, { eager: true, cascade: true })
  @JoinColumn()
  @Field(() => Video)
  video: Video;

  @Field(() => ID)
  @Column()
  userId: string;

  @CreateDateColumn()
  createdDate: Date;
}
