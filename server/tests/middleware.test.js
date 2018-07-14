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
