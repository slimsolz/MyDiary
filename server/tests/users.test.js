import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const User = {
  email: 'usertest@ymail.com',
  password: 'quicktest'
};

const SuperUser = {
  email: 'superuser@gmail.com',
  password: 'superpassword',
};

let superUserToken;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(SuperUser)
    .end((err, res) => {
      superUserToken = res.body.token;
      done();
    });
});

describe('POST /auth/signup', () => {
  it('should return 201 and a create a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(User)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.eql('success');
        expect(res.body.message).to.be.eql('Your account has been created successfully and logged in....redirecting');
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
        expect(res.body.message).to.be.eql('Account already exists');
        done();
      });
  });
});

describe('POST /auth/signin', () => {
  it('should return 200 and signin user', (done) => {
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
        email: 'usertest@ymail.com',
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

describe('GET /account', () => {
  it('should return 200 and show a user\'s profile', (done) => {
    chai.request(app)
      .get('/api/v1/account')
      .set('Authorization', `Bearer ${superUserToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.message).to.eql('User profile reterived');
        expect(res.body.profile).to.be.an('object');
        done();
      });
  });
});

describe('PUT /account', () => {
  it('should return 200 and a update a user\'s profile', (done) => {
    chai.request(app)
      .put('/api/v1/account')
      .set('Authorization', `Bearer ${superUserToken}`)
      .send({
        firstname: 'John',
        lastname: 'Doe',
        sex: true,
        bio: 'my bio',
        notification: false
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.message).to.eql('Profile updated successfully');
        expect(res.body.user).to.be.an('object');
        done();
      });
  });
});

