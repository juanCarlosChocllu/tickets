import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!isMongoId(value)) {
      throw new BadRequestException(`Id invalido: ${value}`);
    }
    return value;
  }
}
