import { LoginDto } from './LoginDto';
import { Management } from '../entities/Management';

export interface AddManagementDto {
    identity: LoginDto;
    management: Management;
}
