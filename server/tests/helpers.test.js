import chai from 'chai';
import confirmUpdateDate from '../helpers/index';

const { expect } = chai;

it('should return true if entry cannot be udated again', () => {
  const today = new Date();
  const result = confirmUpdateDate(today, today);

  expect(result).to.be.equal(true);
});

it('should return false if entry can be updated again', () => {
  const created = (d => new Date(d.setDate(d.getDate() - 1)));
  const today = new Date();
  const result = confirmUpdateDate(created, today);

  expect(result).to.be.equal(false);
});
