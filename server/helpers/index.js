import moment from 'moment';

const confirmUpdateDate = (createdDate, currentDate, compare) => {
  if (moment(createdDate).isSame(currentDate, compare)) {
    return true;
  }

  return false;
};

export default confirmUpdateDate;
