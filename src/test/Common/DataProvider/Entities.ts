import { ORM } from 'stackerjs';


export class User implements ORM.IEntity
{

    public metadata()
    {
        return {
            'table': process.cwd() + '/storage/data/users.json',
            'fields': [
                { 'type': 'pk', 'name': 'id' },
                { 'type': 'string', 'name': 'name' },
                { 'type': 'string', 'name': 'login' },
                { 'type': 'string', 'name': 'password' },
                { 'type': 'boolean', 'name': 'active', 'default': 1 },
                { 'type': 'created_at', 'name': 'created_at' },
                { 'type': 'updated_at', 'name': 'updated_at' }
            ],
            'relations': []
        }
    }

}