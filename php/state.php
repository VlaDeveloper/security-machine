<?php

include('data.php');

set_include_path(get_include_path() . PATH_SEPARATOR . 'libs/phpseclib');
include('Net/SSH2.php');

$ssh = new Net_SSH2($ssh_ip);
if (!$ssh->login($ssh_user, $ssh_pass)) {
    exit('Login Failed');
}

function state_handler($str)
{
	global $pdo;
	$stmt = $pdo->prepare("INSERT INTO `state` (`state`) VALUES (:state)");
	$ok = $stmt->execute([':state' => $str]);
	echo json_encode(array("stateResponse"=>$str));
}

$today = date('Y-m-d');

$stmt = $pdo->prepare("SELECT `state` FROM `state` where date LIKE ?");
$stmt->execute(["%$today%"]);

$ok = $stmt->fetch();

if ($ok) {
	echo json_encode(array("stateResponse"=>$ok['state']));
} else {
	$test = $ssh->exec('cd Desktop; cat state.txt', 'state_handler');
}