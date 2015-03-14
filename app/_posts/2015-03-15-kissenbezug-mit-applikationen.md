---
layout: post
title: Applikationen sticken
facts:
  Was?: Applikationen sticken
  Wann?: Wann immer du willst
  Wo?: RaumZeitLabor
  Kosten: 32€ Stoff + 14€ Stiche
  Stiche?: 80k
  Zeit?: 8h
  Ergebnis?: Kissenbezug
author:
  login: abrock
  email: alexander@lunar-orbit.de
  display_name: Alexander
---

#### Ziel

Wir wollen ein Motiv auf Baumwollköper sticken und daraus einen Kopfkissenbezug nähen.

Voraussetzung für das beschriebene Verfahren ist eine SVG-Datei, in der alle
Konturen in Flächen umgewandelt und alle Überlappungen mit Hilfe der
Mengenoperationen entfernt wurden.
Wir nehmen das folgende Motiv:

![Dornröschen](/assets/kissenbezug-mit-applikationen/motiv.png)

Wir wollen selbstverständlich den größten verfügbaren Rahmen voll ausreizen,
das Motiv wird also 492mm breit und 330mm hoch.
Dabei kommt uns entgegen, dass das Motiv zufälligerweise&#8482;
ziemlich genau in den Rahmen passt, u.a. weil es Rundungen anstelle von Ecken hat.

Wir könnten nun die Konturen mit Satinstichen und die großen Füllflächen
mit Füllstichen füllen, aber alleine die Füllflächen haben bei moderaten
5 Stichen pro Millimeter ohne Unternähen bereits 113k Stiche,
insgesamt sind es ohne weitere Optimierung 210k Stiche.

Große Flächen kann man mit Applikationsstoffen realisieren anstatt sie auszusticken.
In diesem Motiv sind es die weiße Füllung der Wolken und die hellblaue Füllung des Körpers.

#### Vorbereitung des Motivs in Inkscape

Um die Applikationen mit der Stickmaschine zu realisieren sind einige einfache
Vorbereitungen notwendig.

Wir duplizieren zunächst die Ebene, auf der die Füllfläche der Wolken liegen, diese werden später mit weißem Baumwollstoff dargestellt.
Die Ebene schieben wir ganz nach oben, wählen alle Objekte der Ebene, entfernen die Flächenfüllung und fügen eine knallrote Konturlinie hinzu.

![Wolken-Kontur](/assets/kissenbezug-mit-applikationen/wolken-kontur.png)

Wir vereinfachen die auszustickende Konturlinie, indem wir z.B. Knoten löschen oder kleine Inseln zu größeren Objekten verbinden (<Ctrl>+).
Dabei müssen wir lediglich darauf achten, dass keine Teilobjekte in dem Bereich anderer Füllflächen landen, in diesem Fall Körper oder Gesicht.

![Wolken-Kontur vereinfacht](/assets/kissenbezug-mit-applikationen/wolken-kontur-vereinfacht.png)

Der nächste Schritt ist dann, die Ebene mit den Körper- und Gesichts-Füllflächen zu duplizieren, das Duplikat ganz nach oben zu bringen
und wieder die Flächenfüllung durch eine Konturlinie zu ersetzen, z.B. knallgelb zur Unterscheidung von der bereits vorhandenen Kontur der Wolken.

![Körper- / Gesichts-Kontur](/assets/kissenbezug-mit-applikationen/koerper-kontur.png)

Auch bei diesen Flächen vereinfachen wir, insbesondere löschen wir die Spitzen der Mähne und fügen angrenzende Flächen zu größeren Flächen zusammen.

![Körper- / Gesichts-Kontur vereinfacht](/assets/kissenbezug-mit-applikationen/koerper-kontur-vereinfacht.png)

Je nach Wahl der Applikations- und Trägerstoffe kann es passieren,
dass sich der Träger verzieht oder die Applikationen ausfransen
so dass die Ränder der Applikationen sichtbar werden.

Um das zu vermeiden sorgen wir für mehr Überlappungen, indem wir die Konturlinien
auswählen und mit Hilfe von "Path -> Dynamic Offset" um etwa 2mm vergrößern.
Dabei muss man darauf achten, dass Ränder trotzdem von den angrenzenden Satinstichen
verdeckt werden.

![Körper- / Gesichts-Kontur hinreichend vergrößert](/assets/kissenbezug-mit-applikationen/final2.png)

Damit kommen wir auch schon zu dem letzten Schritt, der in Inkscape durchgeführt wird:
Die Ebenen mit den Füllflächen, die nicht gestickt sondern als Applikation aufgebracht werden sollen,
ausblenden und die Datei als WMF-Datei speichern.
Wenn WMF-Export nicht funktioniert liegt das wahrscheinlich an einer veralteten Inkscape-Installation,
die aktuelle Version bekommt man auf der [Inkscape-Download-Seite](https://inkscape.org/en/download/)

Alle weiteren Schritte werden in PE-Design durchgeführt.
Die WMF-Datei wird über "Muster Importieren -> von Vektorbild" in PE-Design importiert.
Das führt erstmal zu 97k Stichen, die wir aber noch erheblich reduzieren können,
indem wir alle Flächen nicht mit Füll- sondern mit Satin-Stichen realisieren.
Dadurch wird die Stichzahl auf 61k reduziert, ein niedriger Wert für so ein großes Motiv.
Mit weiteren kleinen Optimierungen kommen wir auf 59k Stiche, die Umstellung von 5 auf 7
Stiche pro Millimeter bringt aber 21k Stiche, damit sind es 80k.

Um zu vermeiden, dass man am Ende die Naht sieht, die den Applikationsstoff befestigt
und um Überlappungen zu vermeiden erhöhen wir die Zugkompensation von dem Standardwert
(0,2mm) auf 0,6mm.
Dadurch werden alle Linien 0,8mm dicker, das merkt aber niemand.

Dann schalten wir von der soliden Ansicht auf die Stichansicht (F9)
und überprüfen alle Teile auf Stellen, an denen viel zu viele Stiche
auf eine Stelle konzentriert werden, z.B. so:

![Schlechter Satin-Stich, zu viele Stiche auf einer Stelle](/assets/kissenbezug-mit-applikationen/satin-schlecht.png)

Mit dem Knoten-Editor (Wählen -> Punkt wählen) spielen wir so lange an den Punkten herum,
bis die Stiche halbwegs gleichmäßig verteilt sind:

![Besserer Satin-Stich, Stiche gleichmäßig verteilt](/assets/kissenbezug-mit-applikationen/satin-gut.png)

Wenn eine Fläche keine signifikante Krümmung aufweist kann man auch die Stichrichtung
auf konstant setzen, z.B. bei der blauen Fläche in der Mitte:

![Variable (oben) vs. konstante (unten) Stich-Richtung](/assets/kissenbezug-mit-applikationen/satin-variabel-vs-konstant.png)

Bei ausgeprägten Spitzen hilft es in der Regel, die Spitze nicht ganz so dünn auslaufen zu lassen:

![Dünne Spitze (links) vs. dicke Spitze (rechts)](/assets/kissenbezug-mit-applikationen/satin-spitze-reparieren.png)

Wenn das Ende eines Satin-Stiches (orange) später unter einem anderen Stich (blau) verschwindet
kann man hemmungslos korrigieren und dabei die Form ändern, sieht man später ja sowieso nicht.

![Schlechter Satinstich (links) vs. guter Satinstich (rechts), der am Ende unter nachfolgenden Stichen versteckt wird](/assets/kissenbezug-mit-applikationen/satin-reparieren-verstecken.png)

Jetzt kann man natürlich noch jede Menge weitere Optimierungen vornehmen, aber das ist eine
andere Geschichte und soll ein andermal erzählt werden.

Wir exportieren das Motiv als .dst-Datei, speichern es auf einem USB-Stick
und kopieren es damit auf die Maschine.

#### Handarbeit

Erstmal wird der ganze Stoff gewaschen, um zu vermeiden dass er später beim Waschen nochmal schrumpft.
Dann muss gebügelt werden, dabei muss man (zumindest im RZL) darauf achten, dass man nicht erfriert.

![Trägerstoff wird gebügelt](/assets/kissenbezug-mit-applikationen/buegeln-1.jpg)

Da wir einen Bezug für ein 80x80cm²-Kissen herstellen wollen zeichnen wir auf die linke Seite des Stoffes
mit Schneiderkreide ein 80x160cm²-Rechteck an und schneiden es mit etwa 5cm Nahtzugabe aus.

![Ausgeschnittener Trägerstoff](/assets/kissenbezug-mit-applikationen/schnitt.jpg)

Möglicherweise verzieht sich der Stoff während dem Besticken.
Um zu vermeiden, dass man am Ende die Stiche sieht mit denen die Applikationsstoffe festgenäht werden
wählen wir zum befestigen das selbe Garn wie für den Satinstich, der am Ende die Schnittkante verdecken soll.

Wir stellen die Maschine auf automatischen Farbwechsel ohne automatisches Weitersticken
(Handbuch, PDF-Seite 25),
so können wir nach dem Befestigen der Applikationsstoffe jeweils in aller Ruhe die überstehenden Ränder
abschneiden und den nächsten Applikationsstoff auflegen.

Um das Motiv aussticken zu können schrauben wir die Rahmenhalterungen an die äußersten Positionen,
bügeln den Grundstoff und die Applikationsstoffe und bügeln ein Stickvlies (1860B) auf die Rückseite
des Grundstoffes auf.

![Stickvlies wird aufgebügelt](/assets/kissenbezug-mit-applikationen/buegeln-2.jpg)

Der Grundstoff wird zusammen mit einem weiteren nicht-klebenden Vlies in den großen Rahmen eingespannt
und der Rahmen in die Rahmenhalterung eingespannt.
Auf den Grundstoff wird der erste Applikationsstoff aufgelegt, die erste Kontur gestickt
und der überstehende Rest mit einer kleinen Stoffschere abgeschnitten.
Dabei sollte man vermeiden, viel Kraft auf den Stoff auszuüben,
ansonsten kann sich der Grundstoff verziehen oder wellen.

![Wolken-Kontur wird ausgeschnitten](/assets/kissenbezug-mit-applikationen/wolke-ausschneiden.jpg)

Ich habe beim ersten Versuch nur die äußere Kontur der Wolke ausgeschnitten
und zwei Lagen weißen Stoff für die Wolke benutzt.
Dadurch hat der Bezug am Ende teilweise vier Lagen Stoff und ist ziemlich unflexibel,
weicher wird es wenn man nur eine Lage nimmt und tatsächlich entlang aller Konturen schneidet.

Wenn die erste Kontur ausgeschnitten ist wird ein großzügiges Stück blauer Stoff ausgeschnitten,
gebügelt und auf den Trägerstoff aufgelegt.

![Stoff für Körper-Kontur auf Trägerstoff aufgelegt](/assets/kissenbezug-mit-applikationen/blau-aufgelegt.jpg)

Auch hier wird wieder die Kontur gestickt und die Reste ausgeschnitten.

![Körper-Kontur gestickt und ausgeschnitten](/assets/kissenbezug-mit-applikationen/blau-ausgeschnitten.jpg)

Jetzt können wir die Stickmaschine wieder auf vollautomatisch stellen und den Rest des Motivs aussticken.
In der Zwischenzeit üben wir mit der Husqvarna das nähen perfekt gerader Nähte an Stoffresten.

![Nähübungen](/assets/kissenbezug-mit-applikationen/naehen-ueben.jpg)

Klappt schonmal super.

Nachdem das Motiv ausgestickt ist müssen wir es auf dem Rahmen entfernen, 
die Rahmenabdrücke glattbügeln, das Stickvlies abziehen
und das ganze zu einem Kopfkissenbezug zusammennähen.
Für den letzten Schritt siehe [diese Anleitung](http://www.youtube.com/watch?v=7bxVcbXa6NQ).

Das fertig gestickte Motiv sieht dann ungefähr so aus:

![Fertig gesticktes Motiv](/assets/kissenbezug-mit-applikationen/fertig-gestickt.jpg)

Alle verwendeten Garne sind nachleuchtend und es wurden alle verfügbaren nachleuchtenden Garne verwendet,
leider leuchten alle diese Garne sehr grünlich, die unterschiedlichen Farben sind eher ein Artefakt
des automatischen Weißabgleichs:

![Fertig gesticktes Motiv im Dunkeln](/assets/kissenbezug-mit-applikationen/nachleuchtend.jpg)

Alle relevanten Dateien findet ihr [in dieser ZIP-Datei](https://wiki.raumzeitlabor.de/images/a/a0/Stickdateien.zip).

Es bleibt die Frage, wie man möglichst ohne Handarbeit von einer beliebigen
SVG-Datei zu einer geeigneten kommt, aber das ist eine andere Geschichte
und soll ein andermal erzählt werden.


