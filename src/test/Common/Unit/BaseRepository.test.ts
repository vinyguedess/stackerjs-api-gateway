import { expect } from 'chai';
import { UsersRepository } from './../DataProvider/Repositories';
import { User } from '../DataProvider/Entities';


describe('BaseRepositoryTest', ():void => 
{

    let USER_ID:number;

    describe('Inserting entities', ():void => 
    {
        it('Should insert an entity without trouble', done => 
        {
            let user = new User();
            user['name'] = 'Vinicius Guedes';
            user['login'] = 'vinyguedess';
            user['password'] = 'mypassword';

            new UsersRepository()
                .save(user)
                .then(response => expect(response).to.be.true)
                .then(() => USER_ID = user['id'])
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

    describe('Finding and updating', ():void => 
    {
        it('Should find by ID an item and update it', async () => 
        {
            let usersRepository = new UsersRepository();

            let user = await usersRepository.findById(USER_ID);
            user['password'] = 'myn3wp4ss';

            let response = await usersRepository.save(user);
            expect(response).to.be.true;
        });

        it('Should find by ID and verify it\'s updates', done => 
        {
            new UsersRepository()
                .findById(USER_ID)
                .then(user => {
                    expect(user).to.be.instanceOf(User);
                    expect(user['password']).to.be.equal('myn3wp4ss');
                })
                .then(() => done());
        });
    });

    describe('Deleting entities', ():void => 
    {
        it('Should delete an entity without trouble', done => 
        {
            let usersRepository = new UsersRepository();

            usersRepository.findById(USER_ID)
                .then(async user => {
                    let response = await usersRepository.delete(user);
                    expect(response).to.be.true;
                })
                .then(() => done());
        });

        it('Verify if deleted', done => 
        {
            new UsersRepository()
                .findById(USER_ID)
                .then(user => {
                    expect(user).to.be.null;
                })
                .then(() => done());
        });
    }); 

});
