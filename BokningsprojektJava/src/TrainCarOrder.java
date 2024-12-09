public class TrainCarOrder implements IOrder {

  private int price;
  private int passengers;

  public TrainCarOrder(int price, int passengers) {
    this.price = price;
    this.passengers = passengers;
  }

  @Override
  public int getPrice() {
    return this.price;
  }

  @Override
  public void setPrice(int price) {
    //Kalkylera pris baserat på antal passagerare
  }

  public int getPassengers() {
    return passengers;
  }

  public void setPassengers(int passengers) {
    this.passengers = passengers;
  }
}
