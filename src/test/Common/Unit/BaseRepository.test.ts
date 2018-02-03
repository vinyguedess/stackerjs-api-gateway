import { UsersRepository } from './../DataProvider/Repositories';
import { User } from '../DataProvider/Entities';



describe('BaseRepositoryTest', ():void => 
{

    describe('Inserting entities', ():void => 
    {
        it('Should insert an entity without trouble', done => 
        {
            let user = new User();
            user['name'] = 'Vinicius Guedes';
            user['login'] = 'vinyguedess';
            user['pass'] = 'mypassword';

            new UsersRepository()
                .save(user)
                .then(response => {
                    console.log(response)
                    console.log(user);
                })
                .then(() => done());
        });
    });

    describe('Finding entities from repository', ():void => 
    {
        it('Should return a list of entities', done => 
        {
            new UsersRepository()
                .find()
                .then(results => {
                    console.log(results);
                })
                .then(() => done());
        });
    });

});