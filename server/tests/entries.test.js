import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const SuperUser = {
  email: 'adminuser@gmail.com',
  password: 'adminpassword',
};

let adminToken;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(SuperUser)
    .end((err, res) => {
      adminToken = res.body.token;
      done();
    });
});

const Entry = {
  title: 'test title',
  category: 'test category',
  image: 'test image',
  story: 'test story'
};

describe('POST /entries', () => {
  it('should return 201 and a create an entry', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', `Bearer ${adminToken}`)
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
      .set('Authorization', `Bearer ${adminToken}`)
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
      .set('Authorization', `Bearer ${adminToken}`)
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
      .set('Authorization', `Bearer ${adminToken}`)
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

describe('GET /entries', () => {
  it('should return 200 and get all entries', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.eql('success');
        expect(res.body.message).to.be.eql('All entries');
        expect(res.body.entries).to.be.an('array');
        done();
      });
  });
});

describe('GET /entries/:id', () => {
  it('should return 200 and get a single entry', (done) => {
    chai.request(app)
      .get('/api/v1/entries/1')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.eql('success');
        expect(res.body.message).to.be.eql('Entry reterived');
        expect(res.body.entry).to.be.an('object');
        done();
      });
  });

  it('should return 400 and error message', (done) => {
    chai.request(app)
      .get('/api/v1/entries/99')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.eql('Entry does not exist');
        done();
      });
  });
});

describe('DELETE /entries/:id', () => {
  it('should return 200 and delete an entry', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/1')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.eql('success');
        expect(res.body.message).to.be.eql('1 entry deleted');
        done();
      });
  });

  it('should return 404 and error message', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/99')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.eql('Entry not found');
        done();
      });
  });
});

describe('GET /entries', () => {
  it('should return 400 and error message', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql('error');
        expect(res.body.message).to.be.eql('No entry available');
        done();
      });
  });
});
