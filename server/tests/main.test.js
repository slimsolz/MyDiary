import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

// homepage
describe('GET /', () => {
  it('should return 200 and a welcome message', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('Welcome to My Diary App');
        done();
      });
  });
});

describe('POST /', () => {
  it('should returon 404 and an error message', (done) => {
    chai.request(app)
      .post('/api/v1/xyz')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal('404 Page not found');
        done();
      });
  });
});

describe('PUT /', () => {
  it('should returon 404 and an error message', (done) => {
    chai.request(app)
      .put('/api/v1/xyz')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal('404 Page not found');
        done();
      });
  });
});

describe('DELETE /', () => {
  it('should returon 404 and an error message', (done) => {
    chai.request(app)
      .delete('/api/v1/xyz')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal('404 Page not found');
        done();
      });
  });
});

describe('GET /', () => {
  it('should returon 404 and an error message', (done) => {
    chai.request(app)
      .get('/api/v1/xyz')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal('404 Page not found');
        done();
      });
  });
});
