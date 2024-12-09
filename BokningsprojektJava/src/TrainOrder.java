public class TrainOrder implements IOrder {

  private int price;
  private int passengers;

  public TrainOrder(int price, int passengers) {
    this.price = price;
    this.passengers = passengers;
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
}
