/**
 * Candy
 *
 * There are N children standing in a line. Each child is assigned a rating value.
 *
 * You are giving candies to these children subjected to the following requirements:
 *
 * Each child must have at least one candy.
 * Children with a higher rating get more candies than their neighbors.
 * What is the minimum candies you must give?
 *
 * Example 1:
 *
 * Input: [1,0,2]
 * Output: 5
 * Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
 *
 * Example 2:
 *
 * Input: [1,2,2]
 * Output: 4
 * Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
 *              The third child gets 1 candy because it satisfies the above two conditions.
 */

export function exercise(ratings) {
  let candy = 0;

  ratings.forEach((rating, i, arr) => {
    const [prev, next] = getPrevAndNext(arr, i);

    candy = increaseCount({
      count: candy,
      value: rating,
      prev,
      next,
    });
  });

  return candy;
}

function getPrevAndNext(array, i) {
  return [array[i - 1], array[i + 1]];
}

function increaseCount({ minimum = 1, value, prev, next, count }) {
  if (prev < value || next < value) {
    return count + minimum + 1;
  }

  return count + minimum;
}
