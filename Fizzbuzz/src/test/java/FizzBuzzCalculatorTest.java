import static org.junit.jupiter.api.Assertions.*;

import com.forefront.mahmoud.FizzBuzzCalculator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

public class FizzBuzzCalculatorTest {

  FizzBuzzCalculator fizzBuzzCalculator;

  @BeforeEach
  public void setUp() {
    fizzBuzzCalculator = new FizzBuzzCalculator();
  }

  @ParameterizedTest
  @CsvSource({
      "1, 1",
      "2, 2",
      "3, Fizz",
      "5, Buzz",
      "6, Fizz",
      "9, Fizz",
      "10, Buzz",
      "12, Fizz",
      "15, FizzBuzz",
      "18, Fizz",
      "20, Buzz",
      "30, FizzBuzz"
  })
  public void GetFizzBuzzResult_ReturnsExpectedValues(int number, String expected) {
    //Arrange (done in the @CsvSource)

    // Act
    String result = fizzBuzzCalculator.getFizzBuzzResult(number);
    // Assert
    assertEquals(expected, result);
  }

  @Test
  public void GetFizzBuzzResult_ReturnsUnexpectedResult(){
    // Arrange
    String expected = "Fizz";

    // Act
    String result = fizzBuzzCalculator.getFizzBuzzResult(1);

    // Assert
    assertNotEquals(expected, result);
  }

  @Test
  public void GetFizzBuzzResult_ReturnsExpectedResultForZero() {
    //Arrange
    String expected = "FizzBuzz";

    //Act
    String result = fizzBuzzCalculator.getFizzBuzzResult(0);

    //Assert
    assertEquals(expected, result);
  }
}