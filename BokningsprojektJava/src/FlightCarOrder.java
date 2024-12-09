public class FlightCarOrder implements IOrder {

  private int price;
  private int passengers;
  private int distance;

  public FlightCarOrder(int price, int passengers, int distance) {
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
    //Kalkylera pris baserat på antal passagerare och distans
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
