import java.io.*;
import java.io.IOException;
public class WordGenerator{
  private String[] wordArrayMelani;
  private int[] wordCountMelani;

  private String[] wordArrayVictor;
  private int[] wordCountVictor;

  public static void main(String[] args){
    WordGenerator wg = new WordGenerator();
  }
  public WordGenerator(){

    try {
      parseWhatsapp();
    } catch(IOException e){

    }

  }

  private void parseWhatsapp() throws IOException{
    BufferedReader bf = new BufferedReader(new FileReader("w2.txt"));
    String line = bf.readLine();
    String workingString = "";
    while(line != null){
      System.out.println(line);
      if(line.matches("\\d{1,2}/\\d{1,2}/\\d{1,2}, \\d{2}:\\d{2} - M.*")){
        workingString = line.split("é:")[1];
        int n = workingString.split(" ").length;
        for(int i = 0; i < n; i++){

        }
      }
      break;

    }

    bf.close();

  }
}
