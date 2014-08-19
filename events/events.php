<?php
set_include_path(get_include_path() . PATH_SEPARATOR . '/usr/share/awl/inc');

use Sabre\VObject;
require('vendor/autoload.php');
require('caldav-client-v2.php');

$i = parse_ini_file('settings.ini');

// actually I have no idea how one is supposed to do
// error handling with this client lib
$c = new CalDAVClient($i['ical_url'], null, null);
//$c->SetDebug(true);

header('Content-type: application/json');
http_response_code(500);
$status = "ERR";
$d = array();

$month = date('m');
$year  = date('Y');

// check if the supplied date is valid
if (isset($_GET['m']) && isset($_GET['y'])) {
    if (checkdate($_GET['m'], 1, $_GET['y'])) {
        $month = $_GET['m'];
        $year  = $_GET['y'];
    }
}

$first_dom = DateTime::createFromFormat('dmY', '01'.$month.$year);
$last_dom  = $first_dom->format('Ymt');
$first_dom = $first_dom->format('Ym01');

if ($c->DoRequest() !== false) {
    //$details = $c->GetCalendarDetails();
    $events = $c->GetEvents($first_dom.'T000000Z', $last_dom.'T235959Z');

    foreach ($events as $ev) {
        $vc = VObject\Reader::read($ev['data']);
        $vc->expand(new DateTime($first_dom), new DateTime($last_dom));

        if (! is_object($vc->VEVENT)) {
            continue;
        }

        foreach ($vc->VEVENT as $v) {
            $d[] = array(
                'name' => (string)$v->SUMMARY,
                'timeBegin' => (string)$v->DTSTART->getDateTime()
                    ->format(\DateTime::ISO8601),
                'timeEnd'   => (string)$v->DTEND->getDateTime()
                    ->format(\DateTime::ISO8601),
                'description' => (string)$v->DESCRIPTION,
                'recurring' => ($v->{'RECURRENCE-ID'}) ? true : false
            );
        }
    }

    function cmp($a, $b) {
        return strcmp($a['timeBegin'], $b['timeBegin']);
    }

    usort($d, 'cmp');
    $status = "OK"; // rough guess :P
    http_response_code(200);
}

print json_encode(array(
    'status' => $status,
    'month' => (new DateTime())->format('m/Y'),
    'data' => $d,
), JSON_PRETTY_PRINT);
