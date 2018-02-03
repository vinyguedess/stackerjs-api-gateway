import { ORM } from 'stackerjs';
import { readFile, writeFile } from 'fs';


export abstract class BaseRepository extends ORM.BaseRepository
{

    public abstract entity:ORM.IEntity;

    protected loadFile():Promise<FileBaseCollection>
    {
        return new Promise((resolve:Function, reject:Function) => 
        {
            readFile(
                this.entity.metadata().table,
                { 'encoding': 'utf8' },
                (err:Error, content:string) => err ? reject(err) : resolve(JSON.parse(content))
            );
        });
    }

    protected persistFile(collection:FileBaseCollection):Promise<boolean>
    {
        return new Promise((resolve:Function, reject:Function) => 
        {
            writeFile(
                this.entity.metadata().table,
                JSON.stringify(collection),
                err => err ? reject(err) : resolve(true)
            );
        });
    }

    public find(filters:any = {}, limit:number=10, offset:number=0, order?:string)
    {
        return this.loadFile()
            .then(collection => 
                Promise.all(collection.data
                    .filter((r, index) => index >= offset)
                    .filter((r, index) => index <= limit)
                    .map(result => ORM.Util.makeEntity(this.entity, result))));
    }

    public insert(entity:ORM.IEntity):Promise<boolean>
    {
        let preparedObject = {};
        this.entity.metadata().fields.forEach(field => {
            if (field.type === 'pk')
                entity[field.name] = (new Date().getTime() * Math.random()).toString();
            
            if (field.type === 'created_at')
                entity[field.name] = new Date().getTime();

            preparedObject[field.name] = entity[field.name];
        });

        return this.loadFile()
            .then(collection => {
                collection.data.push(preparedObject);

                return this.persistFile(collection)
                    .then(() => true);
            });
    }

}


interface FileBaseCollection
{

    name:string;

    data:Array<any>;

}