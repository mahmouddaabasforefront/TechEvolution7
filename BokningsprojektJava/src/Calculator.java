public class Calculator {

  public int calculateCarPrice(int originalPrice, int kilometers) {
    return originalPrice * kilometers;
  }

  public int calculateTrainPrice(int originalPrice, int passengers) {
    return originalPrice * passengers;
  }

  public int calculateFlightPrice(int originalPrice, int passengers, int distance) {
    return originalPrice * passengers * distance;
  }

}
