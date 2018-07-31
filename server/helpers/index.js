import moment from 'moment';

const confirmUpdateDate = (createdDate, currentDate, compare) => {
  if (!moment(createdDate).isSame(currentDate, compare)) {
    return false;
  }

  return true;
};

export default confirmUpdateDate;
