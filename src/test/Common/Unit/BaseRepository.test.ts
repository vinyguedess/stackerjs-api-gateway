import { expect } from 'chai';
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
                .then(response => expect(response).to.be.true)
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
                    expect(results).to.be.instanceOf(Array);
                })
                .then(() => done());
        });
    });

});