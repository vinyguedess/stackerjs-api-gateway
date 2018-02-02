import { ORM } from 'stackerjs';
import { readFile } from 'fs';


export abstract class BaseRepository extends ORM.BaseRepository implements FileBaseRepository
{

    public abstract entity;

    public abstract collectionPath:string;

    protected loadFile():Promise<FileBaseCollection>
    {
        return new Promise((resolve:Function, reject:Function) => 
        {
            readFile(
                this.collectionPath,
                { 'encoding': 'utf8' },
                (err:Error, content:string) => err ? reject(err) : resolve(JSON.parse(content))
            );
        });
    }

}


interface FileBaseRepository
{

    collectionPath:string;

}


interface FileBaseCollection
{

    name:string;

    data:Array<any>;

}