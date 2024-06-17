const calculatePoints = (receipt) => {
  let points = 0;

  // One point for every alphanumeric character in the retailer name, should generate an array and find the length of  that array
  points += (receipt.retailer.match(/[a-z0-9]/gi) || []).length;

  // 50 points if the total is a round dollar amount with no cents
  if (receipt.total % 1 === 0) {
    points += 50;
  }

  // 25 points if the total is a multiple of 0.25
  if (parseFloat(receipt.total) % 0.25 === 0) {
    points += 25;
  }

  // 5 points for every two items on the receipt
  points += Math.floor(receipt.items.length / 2) * 5;

  // Points for item descriptions, rounded up to nearest integer
  receipt.items.forEach((item) => {
    if (item.shortDescription.trim().length % 3 === 0) {
      points += Math.ceil(parseFloat(item.price) * 0.2);
    }
  });

  // 6 points if the day in the purchase date is odd
  const purchaseDay = parseInt(receipt.purchaseDate.split("-")[2]);
  if (purchaseDay % 2 !== 0) {
    points += 6;
  }

  // 10 points if the time of purchase is after 2:00pm and before 4:00pm
  const purchaseHour = parseInt(receipt.purchaseTime.split(":")[0]);
  const purchaseMinute = parseInt(receipt.purchaseTime.split(":")[1]);
  if (purchaseHour === 14 || (purchaseHour === 15 && purchaseMinute === 0)) {
    points += 10;
  }

  return points;
};

module.exports = calculatePoints;
