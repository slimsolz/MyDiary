import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const User = {
  email: 'usertest@ymail.com',
  password: 'quicktest'
};

describe('POST /auth/signup', () => {
  it('should return 201 and a create a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(User)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.eql('success');
        expect(res.body.message).to.be.eql('User created and logged in');
        expect(res.body.user).to.be.an('object');
        done();
      });
  });

  it('should return 409 and user exists error message', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(User)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.eql('Account exists');
        done();
      });
  });
});

describe('POST /auth/signin', () => {
  it('should return 201 and a create a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'usertest@ymail.com',
        password: 'quicktest'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.eql('success');
        expect(res.body.message).to.be.eql('logged in');
        expect(res.body.user).to.be.an('object');
        done();
      });
  });

  it('should return 401 for wrong email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'rubbish@gmail.com',
        password: 'rubbish'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.eql('Incorrect Email or password');
        done();
      });
  });
  it('should return 401 for wrong password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'superuser@gmail.com',
        password: 'rubbish'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.eql('Incorrect Email or password');
        done();
      });
  });
});

