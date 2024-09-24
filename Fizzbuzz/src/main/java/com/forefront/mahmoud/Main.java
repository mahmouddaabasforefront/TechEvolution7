package com.forefront.mahmoud;

import java.util.List;

public class Main {
  public static void main(String[] args) {
    FizzBuzzCalculator fizzBuzzCalculator = new FizzBuzzCalculator();
    List<String> result = fizzBuzzCalculator.doFizzBuzz(1, 100);

    for (String item : result) {
      System.out.println(item);
    }
  }
}