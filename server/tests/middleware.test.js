import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const anoda = {
  email: 'adminuser@gmail.com',
  password: 'adminpassword',
};

let anodaToken;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send(anoda)
    .end((err, res) => {
      anodaToken = res.body.token;
      done();
    });
});

describe('validate Users', () => {
  it('should return 400 if email not a string', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: true,
        password: 'winiefknorn'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if email not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        password: 'winiefknorn'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });

  it('should return 400 if password not a string', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'slim@gmail.com',
        password: true
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if password not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'slim@gmail.com',
        password: ' '
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });

  it('should return 400 if password contains space', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'slim@gmail.com',
        password: '  '
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });

  it('should return 400 if password is less than 5 characters provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'slim@gmail.com',
        password: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });

  it('should return 401, User not logged in', (done) => {
    chai.request(app)
      .get('/api/v1/account/profile')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3MTM3NjQ2LCJleHAiOjE1MjcyMjQwNDZ9.0J2YZ8LAUpEnauDvl21U2OjHIQjRBzR70PlLVvNPD9o')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.eql('User not logged in');
        done();
      });
  });
});

describe('validate Entry', () => {
  it('should return 400 if title not provided', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        id: 10,
        title: '',
        category: 'category',
        image: 'image',
        story: 'story'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if category not provided', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        id: 10,
        title: 'title',
        category: '',
        image: 'image',
        story: 'story'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if image not provided', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        id: 10,
        title: 'title',
        category: 'category',
        image: '',
        story: 'story'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if story not provided', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        id: 10,
        title: 'title',
        category: 'category',
        image: 'image',
        story: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if entry values are not strings', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        title: 1234,
        category: 234,
        image: 'image',
        story: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
});

describe('validate params', () => {
  it('should return 400 if params is invalid', (done) => {
    chai.request(app)
      .put('/api/v1/entries/xyz')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
});

describe('validate users profile', () => {
  it('should return 400 if password contains space', (done) => {
    chai.request(app)
      .put('/api/v1/account/profile')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        password: '1 2 3',
        firstname: 'john',
        lastname: 'doe',
        sex: 'm',
        bio: 'short bio',
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });

  it('should return 400 if password is less than 5 characters provided', (done) => {
    chai.request(app)
      .put('/api/v1/account/profile')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        password: '123',
        firstname: 'john',
        lastname: 'doe',
        sex: 'm',
        bio: 'short bio',
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if firstname not provided', (done) => {
    chai.request(app)
      .put('/api/v1/account/profile')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        firstname: ' ',
        lastname: 'doe',
        sex: 'm',
        bio: 'short bio',
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if lastname not provided', (done) => {
    chai.request(app)
      .put('/api/v1/account/profile')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        firstname: 'doe',
        lastname: ' ',
        sex: 'm',
        bio: 'short bio',
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if sex not provided', (done) => {
    chai.request(app)
      .put('/api/v1/account/profile')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        firstname: 'doe',
        lastname: 'john',
        sex: ' ',
        bio: 'short bio',
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if bio not provided', (done) => {
    chai.request(app)
      .put('/api/v1/account/profile')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        firstname: 'doe',
        lastname: 'john',
        sex: 'm',
        bio: ' ',
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if notification not provided', (done) => {
    chai.request(app)
      .put('/api/v1/account/profile')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        firstname: 'doe',
        lastname: 'john',
        sex: 'm',
        bio: 'short bio',
        notification: ' '
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if values are not strings', (done) => {
    chai.request(app)
      .put('/api/v1/account/profile')
      .set('Authorization', `Bearer ${anodaToken}`)
      .send({
        firstname: 1234,
        lastname: 'john',
        sex: 'm',
        bio: 'short bio',
        notification: 55
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
});
