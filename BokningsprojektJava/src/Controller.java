import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Controller {

  private Calculator calculator;

  public Controller() {
    this.calculator = new Calculator();
  }

  public void startProgram() throws IOException {
    printInstructions();
    readInput();
  }

  public void readInput() throws IOException {
    BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
    String input = reader.readLine();
    decideOutcome(input);
  }

  public void printInstructions() {
    System.out.println("Välkommen till bokningssystemet!");
    System.out.println("""
        Lista av alternativ: \
        
        1. Bil\
        
        2. Tåg\
        
        3. Flyg""");
  }

    public void decideOutcome(String input) {
    switch (input) {
      case "1":
        //Kalla på metod för att hantera bilar
        CarOrder carOrder = new CarOrder(100, 1000);
        int totalPrice = this.calculator.calculateCarPrice(carOrder.getPrice(), carOrder.getKilometers());
        carOrder.setPrice(totalPrice);
        System.out.format("Priset för bilen är: %d kr%n", carOrder.getPrice());
        break;
      case "2":
        //Kalla på metod för att hantera tåg
        break;
      case "3":
        //Kalla på metod för att hantera flyg.
        break;
      default:
        System.out.println("Felaktig inmatning. Försök igen.");
    }  }

}