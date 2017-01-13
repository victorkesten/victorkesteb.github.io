<?php 
$user="vkesten_admin";
$password="VqxrC4a7";
$db = new PDO("mysql:host=mysql-vt2016.csc.kth.se;dbname=vkesten;charset=UTF8", $user, $password);

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Fetches all post values.
$adress = $_POST["adress"];
$lan = $_POST["lan"];
$typ1 = $_POST["villa"];
$typ2 = $_POST["bostadsratt"];
$min_area = $_POST["min_area"];
$max_area = $_POST["max_area"];
$min_rum = $_POST["min_rum"];
$max_rum = $_POST["max_rum"];
$min_pris = $_POST["min_pris"];
$max_pris = $_POST["max_pris"];
$min_avgift = $_POST["min_avgift"];
$max_avgift = $_POST["max_avgift"];
$order = $_POST["order_variable"];
if ($order == null)
  $order = "pris"; 

$cookie_name = "sessionStorage";
$cookie_value = "lan=" . $lan . "&" . "villa=" . $typ1 . "&" . 
"bostadsratt=" . $typ2 . "&" . "adress=" . $adress . "&" . 
"min_area=" . $min_area . "&" . "max_area=" . $max_area . "&" 
. "min_rum=" . $min_rum . "&" . "max_rum=" . $max_rum . "&" . "min_pris=" 
. $min_pris . "&" . "max_pris=" . $max_pris . "&" . "min_avgift=" . $min_avgift 
. "&" . "max_avgift=" . $max_avgift;

setcookie($cookie_name, $cookie_value, time() + (60*60*24*62), "/");


$query = "SELECT * FROM bostader WHERE
  (adress LIKE CONCAT('%',:adr,'%') OR :adr = '') AND
  lan = :lan AND
  (objekttyp = :typ1 OR objekttyp = :typ2) AND
  area >= :min_area AND (area <= :max_area OR :max_area = 0) AND
  rum >= :min_rum AND (rum <= :max_rum OR :max_rum = 0) AND
  pris >= :min_pris AND (pris <= :max_pris OR :max_pris = 0) AND
  avgift >= :min_avgift AND (avgift <= :max_avgift OR :max_avgift = 0)

  ORDER BY " . $order;

$stmt = $db->prepare($query);

$stmt->bindParam(':adr', $adress);
$stmt->bindParam(':lan', $lan);
$stmt->bindParam(':typ1', $typ1);
$stmt->bindParam(':typ2', $typ2);
$stmt->bindParam(':min_area', $min_area);
$stmt->bindParam(':max_area', $max_area);
$stmt->bindParam(':min_rum', $min_rum);
$stmt->bindParam(':max_rum', $max_rum);
$stmt->bindParam(':min_pris', $min_pris);
$stmt->bindParam(':max_pris', $max_pris);
$stmt->bindParam(':min_avgift', $min_avgift);
$stmt->bindParam(':max_avgift', $max_avgift);
$stmt->bindParam(':orders', $order);

$stmt->execute(); 

echo "<table id='bostader'>";
echo "<tr>
  <th class='sort' title = 'lan'>City</th>
  <th class='sort' title = 'objekttyp'>Type</th>
  <th class='sort' title = 'adress'>Address</th>
  <th class='sort' title = 'area'>Area</th>
  <th class='sort' title = 'rum'>Rooms</th>
  <th class='sort' title = 'pris'>Price </th>
  <th class='sort' title = 'avgift'>Fee</th>
      </tr>";

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $values = array(
    $row['lan'], 
    $row['objekttyp'], 
    $row['adress'],
    $row['area'],
    $row['rum'],
    $row['pris'],
    $row['avgift']);
  echo "<tr>";
  foreach($values as $val) {
    echo "<td>$val</td>";
  }
  echo "</tr>";
}
echo "</table>";
?>