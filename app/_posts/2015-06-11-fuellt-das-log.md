---
layout: post
title: Füllt das Log!
author:
  login: abrock
  email: alexander@lunar-orbit.de
  display_name: Alexander
---

![Bild für das Log](/assets/2015-fuellt-das-log/header.jpg)

Wie ihr vielleicht mitbekommen habt haben wir seit 2012 ein
[Tumblr mit Bildern aus dem RZL](http://log.raumzeitlabor.org/),
genannt "Log", in dem wir Fotos von allem sammeln was im RZL passiert:

* Fräsergebnisse
* Vorträge
* Hacks
* 3D-gedrucktes
* gelasertes
* Plottereien
* Stickereien

Leider posten nur wenige Laboranten Bilder von ihren Projekten,
daher hier eine Schritt- für Schritt-Anleitung, wie das geht.

<!--more-->

#### Projekt fotografieren

Zuerst braucht man ein oder mehrere Fotos des Projektes.
Wenn ihr keine eigene Kamera habt könnt ihr dafür die
E-Ecken-Kamera benutzen, diese liegt in der E-Ecke im Regal
neben dem Labeldrucker, ziemlich nahe am Serverschrank.

Falls der Akku leer ist: Das Ladegerät ist im Rolschrank
diagonal gegenüber dem Serverschrank.

Falls ihr keinen SD-Cardreader am Notebook habt könnt ihr
den USB-Cardreader benutzen, der bei der Kamera liegt.

#### Bild zuschneiden

Wenn das Objekt sehr klein ist kann es passieren,
dass man mit der E-Ecken-Kamera nicht nah genug heran kommt.
Dann muss man das Bild aus etwas größerer Entfernung machen
und später zuschneiden, das ist aber kein Problem.

Als erstes wird das Bild in [GIMP](http://www.gimp.org/) geöffnet.

Das Werkzeug zum Zuschneiden findet ihr unter "Tools > Transform Tools > Crop",
oder ihr wählt es direkt mit der Tastenkombination "Shift+C".

![Zuschneidewerkzeug in GIMP](/assets/2015-fuellt-das-log/gimp-2.jpg)

Als nächstes klickt ihr in die linke obere Ecke des Bereichs, den ihr am Ende
im Log haben wollt, haltet die Maustaste gedrückt und zieht die Maus in
die rechte untere Ecke und lasst die Taste wieder los.
Das muss nicht auf Anhieb genau stimmen, GIMP zeigt zunächst
nur eine Vorschau des Zuschnitts.
Ihr könnt dann auf die Rahmen klicken und den Bereich so
lange anpassen, bis ihr zufrieden seit.

![Zuschneiden in GIMP](/assets/2015-fuellt-das-log/gimp-3.jpg)

#### Bild skalieren

Das Bild ist dann wahrscheinlich noch deutlich zu hoch aufgelöst,
deshalb muss man es unter Umständen noch skalieren.
Das Werkzeug zum Skalieren findet ihr unter "Image > Scale Image"


1000x1000 Pixel sollten in der Regel völlig reichen,
Ausnahmen bestätigen letzere.
In diesem Dialog stellt man einfach entweder die gewünschte Breite oder
die gewünschte Höhe ein, so lange man nicht auf die Kette rechts
neben den Zahlen-Eingabefeldern klickt sorgt GIMP dafür,
dass das Seitenverhältnis nicht verändert wird.
Die Auflösungsangaben interessieren an dieser Stelle nicht
und dürfen getrost ignoriert werden, die würden evtl.
eine Rolle spielen, wenn das Bild gedruckt werden sollte.
Als Interpolationsmethode sollte "Cubic" gewählt werden,
das ist zwar die langsamste Methode aber auch die beste.
Auch hier bestätigen Ausnahmen die Regel.

![Skalieren in GIMP](/assets/2015-fuellt-das-log/gimp-4.jpg)

#### Bild exportieren

GIMP speichert Bilder am liebsten im eigenen Format ["XCF"](https://de.wikipedia.org/wiki/XCF).
Das ist sinnvoll wenn man eine Version braucht, in der
Ebenen, Pfade, Text etc. verlustfrei gespeichert sind.
Wir brauchen aber das (verlustbehaftete) ISO 10918-1
Format, besser bekannt als [JPEG](https://de.wikipedia.org/wiki/JPEG).

Dazu rufen wir das Export-Menü auf, entweder über "File > Export As…"
oder über die Tastenkombination "Shift+Ctrl+E" bzw. "Ctrl+Shift+E".

In dem Export-Menü wählen wir den Namen und das Verzeichnis aus,
in dem das Bild abgelegt werden soll. Wichtig ist dabei,
dass als [Dateinamenserweiterung](https://de.wikipedia.org/wiki/Dateinamenserweiterung)
".jpg" oder ".jpeg" gewählt wird, daran erkennt GIMP,
dass das Bild als JPEG exportiert werden soll.

![Exportieren in GIMP](/assets/2015-fuellt-das-log/gimp-5.jpg)

Nachdem man das Verzeichnis und den Dateinamen gewählt hat 
klickt man auf "Export" und kann dann noch an diversen Rädern drehen,
die die Qualität beeinflussen.
Am wichtigsten ist hier die Einstellung "Quality",
da sie den größten Einfluss sowohl auf die Dateigröße als auch
auf die Qualität hat.
Für das Log braucht man eine Dateigröße von unter 10MB,
wobei so große Dateien von Tumblr dann nochmal herunterskaliert werden.
1-2MB ist wahrscheinlich besser als Dateigröße,
jedenfalls hat Tumblr mein 880KB-Bild unverändert abgespeichert.
Wenn man die Option "Show preview in image window" auswählt
zeigt GIMP das Bild so an, wie es exportiert aussehen würde
und gleichzeitig die Dateigröße.
Wenn man die Qualität sehr niedrig einstellen muss,
um eine akzeptable Dateigröße zu bekommen
werden u.U. Block-Artefakte sichtbar.
Dann muss man das Bild ggf. kleiner zuschneiden / skalieren.

Mehr Details über die Qualitätseinstellungen findet ihr z.B.
im [GIMP Wikibook](https://en.wikibooks.org/wiki/GIMP/Saving_as_JPEG),
mehr Details über die Anforderungen an Tumblr-Bilder
[bei Tumblr](https://www.Tumblr.com/docs/en/photo_troubleshooting).

#### Bild an Tumblr schicken

Wenn das Bild fertig exportiert ist muss es nur noch an
eine spezielle E-Mail-Adresse geschickt werden und taucht
dann automatisch [im Log](http://log.raumzeitlabor.org/) auf.
Auf der [RZL-Website unter Bilder](https://raumzeitlabor.de/bilder/)
wird das Log ebenfalls dargestellt, allerdings in einer gefilterten
Version ohne Texte und ohne Ponies.

![E-Mail an Tumblr schicken](/assets/2015-fuellt-das-log/e-mail.png)

Das Bild schickt man als Anhang an die E-Mail-Adresse des Logs,
den gewünschten Untertitel schreibt man in den Betreff,
sorgt dafür dass die E-Mail weder signiert noch verschlüsselt wird
und schickt sie ab.
Die Adresse erfahrt ihr von einem Laboranten, der sie bereits kennt.

#### Füllt das Log!

Jetzt wo ihr wisst wie es funktioniert erwarte ich viele
neue Bilder von den tollen Projekten im RZL.
