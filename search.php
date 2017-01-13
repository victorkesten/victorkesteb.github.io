<html>

<head>
<link rel="stylesheet" type="text/css" href="stylesheet.css">
<script src="jquery-1.12.0.min.js"></script>
<script src="bostad.js"></script>
</head>

<body>
<div id="formDiv">
<?php

$user="root";
$password="ilovemelani";
$db = new PDO('mysql:host=213.89.168.65:3306;dbname=house;charset=utf8', $user, $password);

$cookie_value = "";

//Sets the old values in result table if such exists.
//If it is set and not null
if(isset($_COOKIE["sessionStorage"])) {
    $cookie_value = $_COOKIE["sessionStorage"];
    echo "<script>
  $(document).ready(function() {
    $('#searchparams').text('" . $cookie_value . "');
    $.ajax(
      {
      type: 'POST',
      url: 'result.php',
      data: '" . $cookie_value . "',
      success: function(result) {
        $('#result').html(result);
      },
      error: function(a, b, c) {
        console.log(b);
      }
    });
    $('#result').show();
  });
  </script>";
} 

// set the PDO error mode to exception
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


//Adds dropdown list for available Lan.
echo "<select name='lan' form='myForm'>";
$stmt = $db->query("SELECT DISTINCT lan FROM bostader");
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<option value='".$row['lan']."'>".$row['lan']."</option>";
}
echo "</select>";
 ?>
<form id="myForm" accept-charset="utf-8">

<div id="objekttyp">
  <label for="villa" class="villa">Villa</label>
  <input type="checkbox" class="villa" name="villa" value="Villa"><br>
  <label for="bostadsratt" class="bostadsratt">Bostadsrätt</label>
  <input type="checkbox" class="bostadsratt" name="bostadsratt" value="Bostadsrätt">

</div>
<label>Address:</label>
<input type="text" name="adress"><br>
<label>Min Area:</label>
<input type="number" name="min_area"><br>
<label>Max Area:</label>
<input type="number" name="max_area"><br>
<label>Min Room:</label>
<input type="number" name="min_rum"><br>
<label>Max Room:</label>
<input type="number" name="max_rum"><br>
<label>Min Price:</label>
<input type="number" name="min_pris"><br>
<label>Max Price:</label>
<input type="number" name="max_pris"><br>
<label>Min Fee:</label>
<input type="number" name="min_avgift"><br>
<label>Max Fee:</label>
<input type="number" name="max_avgift"><br>

<input type="submit" value="Search">
</form>
</div>
<div id='result'></div>
<p id='searchparams'></p>
</body>
</html>

