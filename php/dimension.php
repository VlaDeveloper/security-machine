<?php

include('data.php');

set_include_path(get_include_path() . PATH_SEPARATOR . 'libs/phpseclib');
include('Net/SSH2.php');

$height = $_REQUEST['Высота'];
$width = $_REQUEST['Ширина'];

$ssh = new Net_SSH2($ssh_ip);
if (!$ssh->login($ssh_user, $ssh_pass)) {
    exit('Login Failed');
}

function dim_handler($str)
{
	global $pdo, $height, $width;
	$stmt = $pdo->prepare("INSERT INTO `watch` (`height`, `width`) VALUES (:height, :width)");
	$ok = $stmt->execute([':height' => $height, ':width' => $width]);
	if ($ok)
			echo 'Успешная запись в базу данных' . '<br>';
	else
		echo 'Ошибка записи' . '<br>';

		echo $str;
}

$ssh->exec("cd Desktop; echo 'height: $height, width: $width' > test2.txt");
echo $ssh->exec('cd Desktop; ls -la', 'dim_handler');
