/* eslint-disable no-undef */
import supertest from 'supertest';
import { User } from '../../src/models/User';
import { server } from '../../src/server';

const request = supertest(server);
const token: string = process.env.TOKEN_TEST as string;

describe('Test endpoint responses', () => {
  beforeAll(() => {
    spyOn(User.prototype, 'getUsers').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          firstName: 'eyong',
          lastName: 'kevin',
          password: 'thisisenow'
        }
      ])
    );
    spyOn(User.prototype, 'getUserById').and.returnValue(
      Promise.resolve({
        id: 1,
        firstName: 'eyong',
        lastName: 'kevin',
        password: 'thisisenow'
      })
    );
    spyOn(User.prototype, 'createUser').and.returnValue(
      Promise.resolve({
        auth: true,
        token:
          'eyJhbGciOiJIqzI1NiIsInRfcCI6IkpXVCJ9.330.J8BgsyqA3Y6F71NXbfuYyfRVuvRa_qb08RStxrCVhlQ'
      })
    );
    spyOn(User.prototype, 'deleteUser').and.returnValue(
      Promise.resolve({
        id: 1,
        firstName: 'eyong',
        lastName: 'kevin',
        password: 'thisisenow'
      })
    );
  });
  it('create user api endpoint', async (done) => {
    const res = await request
      .post('/users')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body.auth).toEqual(true);
    expect(res.body.token).toBeDefined();
    done();
  });
});
