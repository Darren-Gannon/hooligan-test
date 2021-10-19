import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateVideoInput {
  @ApiProperty()
  @Field(() => String)
  name: string;

  @ApiProperty()
  @Field(() => Number)
  duration: number;
}
