<?php
// echo $_REQUEST['Высота'] . '<br>';
// echo $_REQUEST['Ширина'];
$height = $_REQUEST['Высота'];
$width = $_REQUEST['Ширина'];

include('data.php');

set_include_path(get_include_path() . PATH_SEPARATOR . 'libs/phpseclib');
include('Net/SSH2.php');

$ssh = new Net_SSH2($ssh_ip);
if (!$ssh->login($ssh_user, $ssh_pass)) {
    exit('Login Failed');
}

$ssh->exec("cd Desktop; echo 'height: $height, width: $width' > test2.txt");
echo $ssh->exec('cd Desktop; ls -la');
