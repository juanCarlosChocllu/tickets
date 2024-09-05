import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants/rol.constants';
import { rolEnum } from 'src/enums/rol.enum';

export const Roles = (roles: rolEnum[]) => SetMetadata(ROLES_KEY, roles);
