const confirmUpdateDate = (createdDate, currentDate) => {
  if (createdDate === currentDate) {
    return true;
  }

  return false;
};

export default confirmUpdateDate;
