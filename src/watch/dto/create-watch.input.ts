import { InputType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateWatchInput {
  @ApiProperty()
  @Field(() => ID)
  videoId: string;
}
