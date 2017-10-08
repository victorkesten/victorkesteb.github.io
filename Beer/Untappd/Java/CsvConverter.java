import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
public class CsvConverter {

  public static void main(String args[]){
    CsvConverter csv = new CsvConverter();
    csv.execute();
  }

  public CsvConverter(){

  }

  public void execute(){
    String csvFile = "../untappd.csv";
       BufferedReader br = null;
       String line = "";
       String cvsSplitBy = ",";

       HashMap<String,Integer> hm1 = new HashMap<>();
       HashMap<String,Float> hm2 = new HashMap<>();
       String [] beer_types = new String[150];
       String output_string = "";
       try {

           br = new BufferedReader(new FileReader(csvFile));
           int i = 0;
           boolean first = true;
          //  String t = br.readLine();
           while ((line = br.readLine()) != null) {

               // use comma as separator
               String[] beer = line.split(cvsSplitBy);
               if(first){
                 output_string = beer[2] + "," + beer[12] + "\n";
                 first = false;
                 continue;
               }

              //  System.out.println("Beer [type= " + beer[2] + " , score=" + beer[12] + "]");
               if(hm1.get(beer[2]) == null){
                 beer_types[i] = beer[2];
                 hm1.put(beer[2], 1);
                 if(beer[12] != null && !beer[12].matches("") && !beer[12].isEmpty()){
                   try {
                     hm2.put(beer[2], Float.parseFloat(beer[12]));
                   } catch(Exception e){
                     System.out.println(beer[12] + "|" + i + "|" + !beer[12].isEmpty());
                     e.printStackTrace();
                     System.exit(1);

                   }
                 } else {
                   hm2.put(beer[2], 0.0f);
                 }
                 i++;
               } else {
                 int count = hm1.get(beer[2]);
                 hm1.put(beer[2], count+1);
                 if( !beer[12].isEmpty()){
                   float rating = hm2.get(beer[2]);
                   float t =  (rating + Float.parseFloat(beer[12]))/2;
                   hm2.put(beer[2],t);
                 }
               }
           }
           for(int j = 0; j < 110; j++){
            //  System.out.println("Beer [style="+ beer_types[j] + " , avg_score="+hm2.get(beer_types[j])+" , count="+hm1.get(beer_types[j])+"]");
            if(hm1.get(beer_types[j]) > 2){
              try{
                output_string += beer_types[j] +"," + hm1.get(beer_types[j]) + "\n";
              } catch (Exception el){
                System.out.println(beer_types[j] + " " + hm1.get(beer_types[j]));
                el.printStackTrace();
              }
            }
           }

       } catch (FileNotFoundException e) {
           e.printStackTrace();
       } catch (IOException e) {
           e.printStackTrace();
       } finally {
           if (br != null) {
               try {
                   br.close();
               } catch (IOException e) {
                   e.printStackTrace();
               }
           }
       }
       try{
            PrintWriter writer = new PrintWriter("untappd_donut_reduced.csv", "UTF-8");
            writer.println(output_string);
            writer.close();
        } catch (IOException e) {
           // do something
        }
  }
}
