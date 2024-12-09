public class CarOrder implements IOrder {

  private int price;
  private int kilometers;

  public CarOrder(int price, int kilometers) {
    this.price = price;
    this.kilometers = kilometers;
  }

  @Override
  public int getPrice() {
    return this.price;
  }

  @Override
  public void setPrice(int price) {
    this.price = price;
  }

  public int getKilometers() {
    return this.kilometers;
  }

  public void setKilometers(int kilometers) {
    this.kilometers = kilometers;
  }
}