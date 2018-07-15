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

describe('PUT /entries/:id', () => {
  it('should return 200 and update an entry', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        title: 'test update',
        category: 'test update',
        image: 'test update',
        story: 'test update'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.eql('success');
        expect(res.body.message).to.be.eql('Entry updated successfully');
        expect(res.body.updated_entry).to.be.an('object');
        done();
      });
  });

  it('should return 404 and error message', (done) => {
    chai.request(app)
      .put('/api/v1/entries/99')
      .send({
        title: 'test update',
        category: 'test update',
        image: 'test update',
        story: 'test update'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.eql('Entry not found');
        done();
      });
  });
});

describe('DELETE /entries/:id', () => {
  it('should return 200 and delete an entry', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.eql('success');
        expect(res.body.message).to.be.eql('Entry deleted successfully');
        done();
      });
  });

  it('should return 404 and error message', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/99')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.eql('Entry not found');
        done();
      });
  });
});
