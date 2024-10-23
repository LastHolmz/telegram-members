type Locale = "en" | "ar";

const monthsEN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthsAR = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const daysEN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const daysAR = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

function parseHumanDate(
  dateString: string,
  locale: Locale = "en"
): string | Date {
  let parsedDate: Date;

  // Attempt to parse the date string
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    parsedDate = date; // Valid Date object
  } else {
    throw new Error("Invalid date string");
  }

  // Format the date based on the locale
  const dayIndex = parsedDate.getDay();
  const monthIndex = parsedDate.getMonth();
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  if (locale === "ar") {
    return `${daysAR[dayIndex]}, ${day} ${monthsAR[monthIndex]} ${year}`;
  } else {
    return `${daysEN[dayIndex]}, ${day} ${monthsEN[monthIndex]} ${year}`;
  }
}
export default parseHumanDate;
// // Example usage:
// try {
//     console.log(parseHumanDate("2024-10-23", "en")); // Wednesday, 23 October 2024
//     console.log(parseHumanDate("2024-10-23", "ar")); // الأربعاء, 23 أكتوبر 2024
// } catch (error) {
//     console.error(error.message);
// }
export const getDaysSinceCreation = (date: Date) => {
  //current date
  const currentDate = new Date();
  // Get creation date from subscription
  const creationDate = new Date(date);

  // Calculate the difference in time between the current date and the creation date
  const timeDifference = currentDate.getTime() - creationDate.getTime();

  // Convert the time difference from milliseconds to days
  const daysPassed = Math.round(timeDifference / (1000 * 3600 * 24));

  return daysPassed;
};
/*
 */
