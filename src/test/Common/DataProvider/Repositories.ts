import { ORM } from 'stackerjs';
import { BaseRepository } from '../../../app/Common/Repositories/BaseRepository';
import { User } from './Entities';


export class UsersRepository extends BaseRepository
{

    public entity = new User();

}