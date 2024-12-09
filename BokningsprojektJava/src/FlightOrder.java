public class FlightOrder implements IOrder {

  private int price;
  private int passengers;
  private int distance;

  public FlightOrder(int price, int passengers, int distance) {
    this.price = price;
    this.passengers = passengers;
    this.distance = distance;
  }

  @Override
  public int getPrice() {
    return this.price;
  }

  @Override
  public void setPrice(int price) {
    this.price = price;
  }

  public int getPassengers() {
    return passengers;
  }

  public void setPassengers(int passengers) {
    this.passengers = passengers;
  }

  public int getDistance() {
    return distance;
  }

  public void setDistance(int distance) {
    this.distance = distance;
  }
}
