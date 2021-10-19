import { CreateVideoInput } from './create-video.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVideoInput extends PartialType(CreateVideoInput) {
}
