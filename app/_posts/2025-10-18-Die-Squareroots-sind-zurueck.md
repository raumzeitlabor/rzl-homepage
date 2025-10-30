---
layout: post
title: Die Squareroots sind zurück
facts:
  Was?: Teilnahme FaustCTF
  Wann?: 27.09.2025
  Wo?: RZL
author:
  login: default
  email: public@lists.squareroots.de
  display_name: "Squareroots"
---

Das CTF-Hacking-Team **Squareroots**, das sich 2006 an der Universität Mannheim gegründet hat, hat sich mithilfe des RaumZeitLabors und des [Chaos Computer Clubs Mannheim](https://mannheim.ccc.de) neu aufgestellt und mit neuen CTF-Spielern eine weitere Generation begeisterter Hacker gewonnen. Nach einer längeren Pause ohne aktives Team haben sich alte und neue Squareroots für ihr erstes gemeinsames Attack/Defense-Capture-the-Flag, das [**FaustCTF 2025**](https://2025.faustctf.net/), angemeldet.

Bei diesem Wettbewerbsformat erhält jedes Team identische **virtuelle Maschinen** mit verschiedenen Diensten (z. B. Web-, Telnet- oder Mail-Servern). Ziel ist es, sicherheitsrelevante Schwachstellen zu finden, diese im **eigenen System zu beheben** und bei **anderen Teams auszunutzen**, um die eigenen Flaggen zu verteidigen bzw. die Flaggen der Gegner zu erobern.

Obwohl die neue Generation überwiegend zum ersten Mal an einem CTF teilgenommen hat, konnte sie mit **acht Spielern** einen starken **Platz 65 von 423 angemeldeten Teams**, wovon **140 Teams** aktiv mitspielten, erreichen.

Das Team fokussierte sich bei ihrem ersten CTF auf die Verteidigung und den Aufbau der Infrastruktur zur Bereitstellung unterstützender Werkzeuge. Zu letzteren gehörte z.B. ein Tool, das den ein- und ausgehenden Datenverkehr auf Angriffe und verlorene Flaggen untersuchte, aber auch ein Dienst zum automatischen Ausführen von geschriebenen Exploits bei gegnerischen Teams. Zudem bedankt sich das Team bei dem Überraschungsgast, welcher aktiv das CTF-Team als 8. Teilnehmer unterstützt hat!

Innerhalb des FaustCTF 2025 gab es fünf verwundbare Dienste, welche wie folgt aufgeteilt waren:
- Cake-Configurator: In Cobol geschriebener Telnet Dienst, welcher ein fehlerhaftes State Handling sowie Bruteforce-bare UIDs hatte.
- Birthdaygram: In Python/Flask geschriebener Webserver mit fehlerhaftem Permissions-handling / known Secrets.
- Evoting: Applikation, welche Elliptic Curve Cryptography (ECC) nutzte, bei der allerdings eine zu schwache Kurve zur Verschlüsselung verwendet wurde.
- Birthday-Melody: Wurde von keinem der teilnehmenden Teams exploitet.
- Nom: Wurde von keinem der teilnehmenden Teams exploitet.


Schon jetzt freuen sich die Squareroots auf das nächste Attack/Defense-CTF, das [**SaarCTF 2025**](https://ctf.saarland/), an dem sie mitspielen werden.
Wenn du Lust hast, bei einem CTF mit uns gemeinsam teilzunehmen, melde dich gern über **Matrix:** [#rzl-ctf:hax404.de](https://matrix.to/#/#rzl-ctf:hax404.de).
