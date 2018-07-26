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

