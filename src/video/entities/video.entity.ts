import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Video {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ApiProperty()
  @Column()
  @Field(() => String)
  name: string;

  @ApiProperty()
  @Column()
  @Field(() => Number)
  duration: number;

  @ApiProperty()
  @Column()
  @Field(() => String)
  authorId: string;
}
