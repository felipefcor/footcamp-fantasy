require('dotenv').config()

const {expect} = require('chai')
const logic = require('../../../logic')
const { database, models: { User } } = require('footcamp-data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic-authentication user', ()=>{

    before(() =>  database.connect(DB_URL_TEST))

    describe('authentication user', ()=> {
        let name, surname, email, password, id

        beforeEach(()=> {
            
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `name-${Math.random()}`
            
            return (async () => {
                await User.deleteMany()
                const users = await User.create({ name, surname, email, password : await bcrypt.hash(password,10) })

                id = users.id
            })()
        })
        
        it ('should authenticate on correct data', async () => {
            const result = await logic.authenticateUser(email, password)
                expect(result).to.exist
                expect(result).to.be.a('string')
                expect(result).to.equal(id)
        })

        it('should fail on incorrect data', async ()=>{
            let password = "fake-mail"

            try {
                await logic.authenticateUser(email, password)
            } catch(error) {
                expect(error).to.exist
            }
        })

        it('should fail on empty email', () => {
            expect(() =>
                logic.authenticateUser('', password)
            ).to.throw(Error, 'email is empty or blank')
        })

        it('should fail on emtpy password', () => {
            expect(()=> 
                logic.authenticateUser(email, '')
            ).to.throw(Error, 'password is empty or blank')
        })

        it('should fail on non-valid email', () => {
            expect(()=> 
                logic.authenticateUser('asdf#adsf.com', password)
            ).to.throw(Error, 'email with value asdf#adsf.com is not a valid e-mail')
        })

        it('should fail on non-string email', () => {
            expect(()=> 
                logic.authenticateUser(undefined, password)
            ).to.throw(Error, 'email with value undefined is not a string')
        })

        it('should fail on non-string password', () => {
            expect(()=> 
                logic.authenticateUser(email, undefined)
            ).to.throw(Error, 'password with value undefined is not a string')
        })

    })

    after(()=>database.disconnect())
})