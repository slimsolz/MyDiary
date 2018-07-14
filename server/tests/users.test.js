import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const User = {
  id: 9,
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
        expect(res.body.message).to.be.eql('user created successfully');
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
        expect(res.body.message).to.be.eql('user already exists');
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
        expect(res.body.message).to.be.eql('logged in successfully');
        expect(res.body.user).to.be.an('object');
        done();
      });
  });

  it('should return 401 for wrong password or email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'rubbish@gmail.com',
        password: 'rubbish'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.eql('username or password incorrect');
        done();
      });
  });
});
