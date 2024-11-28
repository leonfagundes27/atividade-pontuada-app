const request = require('supertest');
const dotenv = require('dotenv');

dotenv.config()

const baseURL = 'http://localhost:3000'

it('POST / - Cadastrar um  novo usuário', async () => {
    const response = await request(baseURL)
    .post('/user')
    .set('Content-Type', 'application/json')
    .send({
        "username": `${process.env.USERNAME_USUARIO}`,
        "email": `${process.env.EMAIL_USUARIO}`,
        "password": `${process.env.SENHA_USUARIO}`
    })
    .expect(201)
    .catch(err => {
        console.error('Erro no POST /user:', err.response.body);
        throw err;
    });

})

describe('API sem Token', () => {

    it('GET / - Lista todos os usuários sem o token', async () => {
        const response = await request(baseURL)
        .get('/user')
        .set('Content-Type', 'application/json')
        .expect(401) 
        .catch(err => {
            console.error('Erro no GET /user:', err.response.body);
            throw err;
        });
    });

})


describe('API com Token', () => {
    let token //Armazenaremos o access_token JWT

    it('POST / - Autenticar usuário para retornar token JWT', async () => {
        const response = await request(baseURL)
        .post('/auth')
        .set('Content-Type','application/json')
        .send({
            "email": `${process.env.EMAIL_USUARIO}`,
            "password": `${process.env.SENHA_USUARIO}`
        })
        .expect(200)
        .catch(err => {
            console.error('Erro no POST /auth:', err.response.body);
            throw err;
        });

        token = response.body.token
        expect(token).toBeDefined() // Recebemos o token?
    })

    it ('GET / - Lista todos os usuários com o token', async () => {
        const response = await request(baseURL)
        .get('/user')
        .set('Content-Type','application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .catch(err => {
            console.error('Erro no GET /user:', err.response.body);
            throw err;
        });
    })
})