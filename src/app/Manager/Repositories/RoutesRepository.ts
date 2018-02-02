import { ORM } from 'stackerjs';
import { BaseRepository } from '../../Common/Repositories/BaseRepository';


export class RoutesRepository extends BaseRepository
{

    public entity;
    public collectionPath = process.cwd() + '/storage/data/routes.json';

    public find(filters:any, limit:number, offset:number, order:string):Promise<Array<IEntity>>
    {
        return this.loadFile()
            .then(database => {
                
                return Promise.resolve([]);
            });
    }

}