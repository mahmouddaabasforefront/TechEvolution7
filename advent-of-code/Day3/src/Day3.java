import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;

public class Day3 {

  // Use a HashSet because it does not allow duplicates.
  HashSet<String> visitedHouses = new HashSet<>();

  public String loadInput() throws IOException {
    return new String(Files.readAllBytes(Paths.get("src/input.txt")));
  }

  public void addVisitedHouse(int x, int y) {
    visitedHouses.add(x + "," + y);
  }

  public void clearVisitedHouses() {
    visitedHouses.clear();
  }

  public void handleDirectionsPart1() throws IOException {
    int santaX = 0;
    int santaY = 0;
    addVisitedHouse(santaX, santaY);
    for (int i = 0; i < loadInput().length(); i++) {
      char directions = loadInput().charAt(i);
      switch (directions) {
        case '^':
          santaY++;
          break;
        case 'v':
          santaY--;
          break;
        case '>':
          santaX++;
          break;
        case '<':
          santaX--;
          break;
      }
      addVisitedHouse(santaX, santaY);
    }
    System.out.println("(Part 1) Number of houses that receive at least one present: " + visitedHouses.size());
  }

  public void handleDirectionsPart2() throws IOException {
    int santax = 0;
    int santay = 0;
    int robosantax = 0;
    int robosantay = 0;
    addVisitedHouse(santax, santay);
    addVisitedHouse(robosantax, robosantay);
    for (int i = 0; i < loadInput().length(); i++) {
      char directions = loadInput().charAt(i);
      if(i % 2 == 0) {
        switch (directions) {
          case '^':
            santay++;
            break;
          case 'v':
            santay--;
            break;
          case '>':
            santax++;
            break;
          case '<':
            santax--;
            break;
        }
        addVisitedHouse(santax, santay);
      } else {
        switch (directions) {
          case '^':
            robosantay++;
            break;
          case 'v':
            robosantay--;
            break;
          case '>':
            robosantax++;
            break;
          case '<':
            robosantax--;
            break;
        }
        addVisitedHouse(robosantax, robosantay);
      }
    }
    System.out.println("(Part 2) Number of houses that receive at least one present: " + visitedHouses.size());
  }

}
