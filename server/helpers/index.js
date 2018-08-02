const confirmUpdateDate = (createdDate, currentDate) => {
  if (createdDate.toDateString() === currentDate.toDateString()) {
    return true;
  }

  return false;
};

export default confirmUpdateDate;
