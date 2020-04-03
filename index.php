<?php 
//text
$name = $_POST['name'];
echo $name."<br />";

//multiple choice
if (isset($_POST['achecked'])){
	$achecked = $_POST['achecked'];
}
if (isset($_POST['bchecked'])){
	$bchecked = $_POST['bchecked'];
}
if (isset($_POST['cchecked'])){
	$cchecked = $_POST['cchecked'];
}

if (isset($achecked) and $achecked == 1){
	echo " Work alone ";
}

if (isset($bchecked) and $bchecked == 2){
	echo " Work with friends(2~3)";
}

if (isset($cchecked) and $cchecked == 3){
	echo " Work in a team ";
}

echo "<br>";

//single choice
$aradio = $_POST['aradio'];
if ($aradio == 'a1'){
	echo "Hard!";
}else if ($aradio == 'a2'){
	echo "Average!";
}else{
	echo "Simple!";
}

echo "<br>";
//list
$aselect = $_POST['aselect'];
if ($aselect == 'domestic'){
	echo "Domestic";
}
else if ($aselect == 'foreign'){
	echo "Foreign";
}else {
	echo "Outerspace";
}

?>
