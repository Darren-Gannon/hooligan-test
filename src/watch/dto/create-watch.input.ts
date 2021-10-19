import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateWatchInput {
  @Field(() => ID)
  videoId: string;
}
