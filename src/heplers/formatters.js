export function formattedPrice(price) {
  return price
    .toLocaleString("en-US", {
      style: "currency",
      currency: "EUR",
    })
    .replace(",", "");
}

export function shortDescription(text, maxLength = 70) {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    return truncated + "...";
  }

  return truncated.slice(0, lastSpaceIndex) + " ...";
}

export function numberOfReviews() {
  return Math.floor(Math.random() * 10) + 1;
}

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
