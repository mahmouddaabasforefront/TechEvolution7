package com.forefront.mahmoud;

import java.util.ArrayList;
import java.util.List;

public class FizzBuzzCalculator {
  public String getFizzBuzzResult(int number) {
    if (number % 3 == 0 && number % 5 == 0) {
      return "FizzBuzz";
    } else if (number % 3 == 0) {
      return "Fizz";
    } else if (number % 5 == 0) {
      return "Buzz";
    } else {
      return Integer.toString(number);
    }
  }

  public List<String> doFizzBuzz(int start, int end) {
    List<String> result = new ArrayList<>();
    for (int i = start; i <= end; i++) {
      result.add(getFizzBuzzResult(i));
    }
    return result;
  }
}