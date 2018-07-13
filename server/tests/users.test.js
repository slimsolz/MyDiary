import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const User = {
  id: 9,
  email: 'userexample@gmail.com',
  password: 'examplepass'
};

describe('GET /', () => {
  it('should return 201 and a create a user', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(User)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.eql('success');
        expect(res.body.message).to.be.equal('user created successfully');
        expect(res.body.user).to.be.an('object');
        done();
      });
  });

  it('should return 409 and user exists error message', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(User)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.equal('user already exists');
        done();
      });
  });
});
