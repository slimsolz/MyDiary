import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const Entry = {
  id: 9,
  title: 'test title',
  category: 'test category',
  image: 'test image',
  story: 'test story'
};

describe('POST /entries', () => {
  it('should return 201 and a create an entry', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send(Entry)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.eql('success');
        expect(res.body.message).to.be.eql('Entry saved successfully');
        expect(res.body.entry).to.be.an('object');
        done();
      });
  });

  it('should return 409 and Entry exists error message', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send(Entry)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.eql('Entry already exists');
        done();
      });
  });
});
