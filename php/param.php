<?php

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

function param_handler($str)
{
	global $pdo;
	$stmt = $pdo->prepare("INSERT INTO `param` (`width`, `height`, `learn_file`, `test_file`, `l_in`, `l_learn`, `l_link`, `l_out`, `instr_1`, `instr_2`) VALUES (:width, :height, :learn_file, :test_file, :l_in, :l_learn, :l_link, :l_out, :instr_1, :instr_2)");
	$ok = $stmt->execute([':width' => $_REQUEST['Ширина'], ':height' => $_REQUEST['Высота'], ':learn_file' => $_REQUEST['Обучающая_выборка'], ':test_file' => $_REQUEST['Тестовая_выборка'], ':l_in' => $_REQUEST['Входной_слой'], ':l_learn' => $_REQUEST['Обучаемый_слой'], ':l_link' => $_REQUEST['Связующий_слой'], ':l_out' => $_REQUEST['Выходной_слой'], ':instr_1' => $_REQUEST['Первая_инструкция'], ':instr_2' => $_REQUEST['Вторая_инструкция']]);
	if ($ok)
			echo 'Успешная запись в базу данных' . '<br>';
	else
		echo 'Ошибка записи' . '<br>';

		echo $str;
}

$ssh->exec("cd Desktop; echo 'info:\n$send_string' > test3.txt");
echo $ssh->exec('cd Desktop; ls -la', 'param_handler');

function dump($var) {
	echo '<pre>';
	echo var_dump($var);
	echo '</pre>';
}

// dump($_FILES);

$sftp->put('Desktop/learn.zip', $_FILES['Обучающая_выборка_файл']["tmp_name"], NET_SFTP_LOCAL_FILE);
$sftp->put('Desktop/test.zip', $_FILES['Тестовая_выборка_файл']["tmp_name"], NET_SFTP_LOCAL_FILE);