<?php

include('data.php');

set_include_path(get_include_path() . PATH_SEPARATOR . 'libs/phpseclib');
include('Net/SSH2.php');

$ssh = new Net_SSH2($ssh_ip);
if (!$ssh->login($ssh_user, $ssh_pass)) {
    exit('Login Failed');
}

$test = $ssh->exec('cd Desktop; cat state.txt');

$ssh->setTimeout(0);
echo json_encode(array("stateResponse"=>$test));