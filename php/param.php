<?php
// echo $_REQUEST['Высота'] . '<br>';
// echo $_REQUEST['Ширина'];
$height = $_REQUEST['Высота'];
$width = $_REQUEST['Ширина'];

include('data.php');

set_include_path(get_include_path() . PATH_SEPARATOR . 'libs/phpseclib');
include('Net/SSH2.php');
include('Net/SFTP.php');

$ssh = new Net_SSH2($ssh_ip);
if (!$ssh->login($ssh_user, $ssh_pass)) {
    exit('Login Failed');
}

$sftp = new Net_SFTP($ssh_ip);
if (!$sftp->login($ssh_user, $ssh_pass)) {
    exit('Login Failed');
}

$send_string = '';
foreach($_REQUEST as $key => $value) {
	if ($value) {
		$send_string .= $key . ': ' . $value . "\n";
	}
}

$ssh->exec("cd Desktop; echo 'info:\n$send_string' > test3.txt");
echo $ssh->exec('cd Desktop; ls -la');

function dump($var) {
	echo '<pre>';
	echo var_dump($var);
	echo '</pre>';
}

// dump($_FILES);

$sftp->put('Desktop/learn.zip', $_FILES['Обучающая_выборка_файл']["tmp_name"], NET_SFTP_LOCAL_FILE);
$sftp->put('Desktop/test.zip', $_FILES['Тестовая_выборка_файл']["tmp_name"], NET_SFTP_LOCAL_FILE);