<?php
$cache = __DIR__ . '/checkins.json';
$modified = filemtime($cache);
$now = time();
$fetchFeed = $modified < ($now - (60 * 3));
$latest = json_decode(@file_get_contents($cache), true) ?: array();

if ($fetchFeed) {
    try {
        $feed = new DOMDocument();
        $success = $feed->load('https://untappd.com/rss/brewery/144210');
    } catch (Exception $e) {
        header('HTTP/1.0 503 Could not load remote feed');
        exit;
    }

    $items = $feed->getElementsByTagName('channel')->item(0)->getElementsByTagName('item');

    $checkins = [];
    foreach ($items as $item) {
       $title = $item->getElementsByTagName('title')->item(0)->firstChild->nodeValue;
       $descriptionNode = $item->getElementsByTagName('description')->item(0)->firstChild;
       $description = $descriptionNode ? $descriptionNode->nodeValue : '';
       $pubDate = $item->getElementsByTagName('pubDate')->item(0)->firstChild->nodeValue;
       $guid = $item->getElementsByTagName('guid')->item(0)->firstChild->nodeValue;
       $itemId = 'c' . preg_replace('#.*/(\d+)$#', '$1', $guid);

       preg_match('/(.*?) is drinking an? (.*?)(?: at|$)(.*)?/', $title, $parts);
       $rating = (float) preg_replace('/.*?([\\d.]+)\/[\\d.]+ Stars\\)$/', '$1', $description);
       $description = preg_replace('/(.*?) \\([\\d.]+\/[\\d.]+ Stars\\)$/m', '$1', $description);

       $checkins[$itemId] = array(
            'person'      => $parts[1],
            'beer'        => $parts[2],
            'location'    => $parts[3] ? trim($parts[3]) : null,
            'description' => $description ? trim($description) : null,
            'rating'      => $rating ?: null,
            'date'        => $pubDate,
            'guid'        => $guid,
        );
    }

    $merged   = array_merge($checkins, $latest);
    $latest   = array_slice($merged, 0, 1000);

    file_put_contents($cache, json_encode($latest));
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode(array_values($latest));
