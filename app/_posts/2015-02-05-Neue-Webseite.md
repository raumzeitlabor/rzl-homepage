---
layout: post
title: Neue Webseite
date: 2015-02-05 13:30:00.000000000 +01:00
categories: []
tags: []
status: publish
type: post
published: true
author:
 login: tabascoeye
 email: tabascoeye@gmx.de
 display_name: TabascoEye
 first_name: ''
 last_name: ''
---
<p> Seit einiger Zeit haben wir auf <a href="https://www.github.com">GitHub</a> gemeinsam an einer neuen Webseite gebastelt und diese jetzt "deployed" wie man in der Welt der Web-Hipster sagt.</p>
<p> In erster Linie wollten wir die bisherige, auf Wordpress basierende Seite wegen all ihrer Probleme (PHP, security, updates, account management etc.) durch statisch generierte Seiten ersetzen.
Bei einem solchen Neuanfang kann man sich auch gleich an aktuelle Gepflogenheiten der Web- und Softwareentwicklung halten.</p>
<p>Alles beginnt im <a href="https://github.com/raumzeitlabor">GitHub Repository des RaumzeitLabors</a> mit <a href="https://github.com/raumzeitlabor/rzl-homepage">rzl-homepage</a>, wo der gesamte Code und Inhalt der Seite liegt.</p>
<p>Abgesehen von den Blogbeiträgen bauen wir mit JavaScript und der Tumblr API eine "endlos" scrollende <a href="https://raumzeitlabor.de/bilder/">Seite mit Bildern</a> aus unserem Log und eine kleine <a href="https://raumzeitlabor.de/videos/">Übersicht über unsere Vortragsvideos</a>. Für die Anreise zum RaumZeitLabor haben wir eine <a href="https://raumzeitlabor.de/kontakt/anfahrt/">interaktive Beschreibung</a> mit <a href="http://www.openstreetmap.org">OpenStreetMap</a> Karten gebaut.<br />
Unser Eventkalender, der eines der größten Sorgenkinder der Wordpress Installation war, liegt jetzt auf einem CalDAV Server</p>
<p>Wenn jemand jetzt im GitHub einen commit oder einen Pull-request erstellt, kümmert sich <a href="https://travis-ci.org/">Travis</a> darum, die Seite zu bauen.
Das ganze ähnelt dem Kompilieren von Software, weil aus allen rohen Blogtexten, Bildern, Events und Links ein statisches Konstrukt aus HTML, CSS und JavaScript erstellt werden muss. Im Gegensatz zu Wordpress werden also sämtliche Seiten nicht dynamisch beim Aufruf auf dem Server generiert und ausgeliefert (PHP) sondern sie liegen immer schon "fertig" auf dem Server.</p>
<p>Für den eigentlichen Bauvorgang nutzen wir <a href="http://gruntjs.com/">Grunt</a>, eine Art "Makefile fürs Web". Grunt führt diverse Arbeiten durch, um den JavaScript code und das CSS zu prüfen und zu verkleinern, kopiert alle Inhalte an passende Stellen und führt <a href="http://jekyllrb.com/">Jekyll</a> aus.
Jekyll überführt die einzelnen Texte der Blogposts zusammen mit Layout, Templates und CSS zu einer statischen Webseite mit Blogcharakter zusammen.<br />Zum Schluß werden noch alle HTML Seiten minimiert, damit die Webseite schnell lädt.</p>
<p>Travis protokolliert alle Builds, so dass ihr genau nachsehen könnt, <a href="https://travis-ci.org/raumzeitlabor/rzl-homepage/builds/49570538">wie der Prozess abläuft</a>.
Danach wird dieser Zustand auf unseren Server kopiert und ist ab dann "live".</p>
<p>Um dem "mobile first" Gedanken zu genügen, nutzen wir das <a href="http://getbootstrap.com/">Bootstrap Framework</a>, das sich um die passende Skalierung der Seite für allen Geräten kümmert. So schrumpft z.B. die Menüleiste auf den kleinen Smartphonebildschirmen automatisch zu einem Menübutton zusammen.</p>
<p>Ein <a href="https://github.com/join">GitHub Account</a> ist jetzt also die einzige Hürde, um einen Blogpost zu schreiben.<br />Mehr über die neue Seite gibt es auch <a href="https://wiki.raumzeitlabor.de/wiki/Webseite">im Wiki</a>. Wer mitentwickeln will findet bei GitHub auch einen <a href="https://www.docker.com/">Docker</a> Container zum sofort loslegen.</p>
<p>Send Pull-Requests!</p>
