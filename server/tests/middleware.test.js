import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('validate Users', () => {
  it('should return 400 if email not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 10,
        email: '',
        password: 'winiefknorn'
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
        id: 10,
        email: 'slim@gmail.com',
        password: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
});

describe('validate Entry', () => {
  it('should return 400 if title not provided', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
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
});

describe('validate params', () => {
  it('should return 400 if params is invalid', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/xyz')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
});

/* describe('validate User profile', () => {
  it('should return 400 if password is invalid', (done) => {
    chai.request(app)
      .put('/api/v1/user/account/1')
      .send({
        password: ' ',
        firstname: 'john',
        lastname: 'Doe',
        sex: 'm',
        bio: 'my bio',
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if firstname is invalid', (done) => {
    chai.request(app)
      .put('/api/v1/user/account/1')
      .send({
        firstname: 1234,
        lastname: 'Doe',
        sex: 'M',
        bio: 'my bio',
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if lastname is invalid', (done) => {
    chai.request(app)
      .put('/api/v1/user/account/1')
      .send({
        firstname: 'john',
        lastname: 123,
        sex: 'M',
        bio: 'my bio',
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if sex is invalid', (done) => {
    chai.request(app)
      .put('/api/v1/user/account/1')
      .send({
        firstname: 1234,
        lastname: 'Doe',
        sex: 1234,
        bio: 'my bio',
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if bio is invalid', (done) => {
    chai.request(app)
      .put('/api/v1/user/account/1')
      .send({
        firstname: 1234,
        lastname: 'Doe',
        sex: 'M',
        bio: 1234,
        notification: 'daily'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
  it('should return 400 if notification is invalid', (done) => {
    chai.request(app)
      .put('/api/v1/user/account/1')
      .send({
        firstname: 1234,
        lastname: 'Doe',
        sex: 'M',
        bio: 'my bio',
        notification: 123
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        done();
      });
  });
});
*/
