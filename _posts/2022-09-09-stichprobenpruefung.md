---
title: Prüfung der Parkraum-Datenqualität an einer Stichprobe in Berlin Friedrichshain-Kreuzberg
date: 2022-09-09 12:00:00 +0100
author: Alex Seidel @Supaplex030
layout: post
menu_title: Stichprobenprüfung Datenqualität
#canonical_url:
in_menu: true
show_toc: true
---

Kürzlich haben wir [mit einer theoretischen Herleitung gezeigt](/posts/2022-07-15-einflussfaktoren-datenqualitaet), welchen Einfluss die Genauigkeit der erfassten Parkstreifen und die Vollständigkeit der kartierten räumlichen Features auf die Gesamtqualität der berechneten Parkraumdaten hat. Das Fazit war, dass eine grobe Basisdatenerhebung die Berechnung von Parkraumdaten mit einer Genauigkeit von etwa 80 Prozent ermöglicht. Aufbauend auf dieser noch eher geringen Datenqualität ist eine differenziertere Erfassung der Parkstreifen sowie eine Kartierung der wichtigsten Features wie Einfahrten und Parkbuchten aber bereits ausreichend, um gute Daten mit einer Genauigkeit von 90 Prozent und mehr berechnen zu können.

Am Beispiel des Berliner Bezirks Friedrichshain-Kreuzberg haben wir nun noch einmal genauer geprüft, mit welcher Datenqualität im Laufe eines Kartierungsprozess zu rechnen ist und wo Ungenauigkeiten auftreten, um diese in zukünftigen Kartierungskampagnen gezielter verbessern zu können. Friedrichshain-Kreuzberg eignet sich als Beispiel ideal, da wir dort als Berliner OSM-Community bzw. OSM-Verkehrswendegruppe eine Kartierungskampagne gestartet haben ([mehr im Wiki](https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/Parkraum/Mapping_Kampagne_Xhain)), um in Zusammenarbeit mit dem örtlichen Bezirksamt Parkraumdaten zu ermitteln.


## Wie ist der derzeitige Stand der Parkraumdatenerfassung?

Bisher wurden dafür in einem ersten Schritt die „Basisdaten“ zum straßenbegleitenden Parken im gesamten Stadtbezirk zusammengetragen. Rund 200 Kilometer Straßen wurden mit Parkstreifeninformationen ausgestattet (z.B. Parallelparken auf der rechten Straßenseite, Parkverbot auf der linken Seite). Dafür wurden überwiegend Luftbilder (Geodaten Berlin) verwendet, aber auch Daten einer Straßenbefahrung aus dem Jahr 2014 sowie Mapillary-Straßenfotos (die in Friedrichshain-Kreuzberg vielerorts [aktuell und in 360-Grad-Perspektive frei verfügbar sind](https://www.mapillary.com/app/?lat=52.4986380827126&lng=13.44686049954214&z=13.732823249485481&panos=true&x=0.021891011351183987&y=0.5375317081977447)).

Zu Erinnerung: Der Berechnungsprozess der Parkraumkarte nimmt die Daten als Basis, die in OSM an der Straßenlinie zum straßenseitigen Parken erfasst sind ("parking:lane"-Schema). Diese Daten werden dann mit weiteren Informationen aus OSM kombiniert, um die Genauigkeit zu erhöhen. Wir "subtrahieren" beispielsweise den Bereich um eine Bushaltestelle oder Einfahrt, an der nicht geparkt werden darf.

Aufbauend auf der genannten Basisdatenerhebung müssen die Daten nun also Schritt für Schritt angereichert werden, um die Präzision weiter zu verbssern: Wo fehlen noch Park- und Halteverbote oder Parkstreifenwechsel? Wo gibt es Parkbuchten, die genauer erfasst werden können? Wo gibt es Einfahrten oder Infrastrukturen wie Fahrradständer und Parklets im Fahrbahnbereich, die das Parken verhindern? Diese Daten können auf Basis von Straßenfotos sowie Beobachtungen vor Ort in OSM erfasst werden.

Um zu erkunden, wie gut die Daten nach der Basiserhebung bereits sind, ob unsere theoretische Annahme einer "Basisdatenqualität" von 80 Prozent zutrifft und welche Features nun priorisiert erfasst werden sollten, haben wir diese Datenprüfung durchgeführt.


## Was und wie haben wir geprüft?

Wir haben in den beiden Ortsteilen des Bezirks, also Friedrichshain sowie Kreuzberg, jeweils 15 Zufallspunkte generiert und die jeweils nächstgelegene Straße unserer „Stichprobe“ zugeteilt. Die insgesamt 30 ausgewählten Straßen haben in Summe eine Länge von etwa 10 Kilometern und entsprechen somit etwa 5 Prozent des Gesamtstraßennetzes.

Entlang dieser Straßen haben wir (mit Hilfe der Straßenfotos) die verfügbaren Stellplätze gezählt und mit den berechneten Stellplätzen auf [unserer Karte](https://parkraum.osm-verkehrswende.org/project-vector-tiles/#14.09/52.50271/13.44284) abgeglichen. In Summe haben wir an den 30 ausgewählten Straßen 1.500 Stellplätze gezählt. Größeren Abweichungen zu den berechneten Werten sind wir auf den Grund gegangen um zu verstehen, wodurch sie entstehen. Anschließend haben wir die ausgewählten Straßen in OSM detailliert kartiert, um möglichst alle fürs Parken relevanten Daten zu erheben und somit das „bestmögliche“ Ergebnis zu ermitteln.


## Wie genau sind die Parkraumdaten bereits?

Unserer theoretischen Annahme nach müsste die erste grobe „Basisdatenerfassung“ Ergebnisse mit einer Genauigkeit von etwa 80 Prozent ergeben. Die berechneten Stellplatzzahlen müssten demnach etwa 20 Prozent über den tatsächlich vorhandenen, gezählten Zahlen liegen. (Die Abweichung ist üblicherweise eine _Überschätzung_, da genauere Daten dazu führen, dass mehr Stellen als nicht zum Parken geeignet identifiziert werden).

Diese Größenordnung scheint sich nun im Praxistest zu bestätigen: Die berechneten Ergebnisse lagen nach Abschluss der Basisdatenerhebung etwa **18 Prozent über den gezählten** (1.774 berechnete gegenüber 1.497 gezählten, siehe die untenstehende Tabelle). Im Einzelfall gibt es aber gravierende Unterschiede. So waren die Ergebnisse in Kreuzberg mit etwa 10 Prozent Abweichung (848 : 775) schon etwas genauer, was daran liegen könnte, dass der Süden Kreuzbergs bereits im Rahmen der Neuköllner Parkraumanalyse detailliert erfasst wurde. In Kreuzberg landeten zudem mehrere Hauptverkehrsstraßen ohne Parkstreifen in der Stichprobe, wo Abweichungen eher unwahrscheinlich sind.

In Friedrichshain dagegen betrug die Abweichung in Summe **30 Prozent** (926 : 722) und ist damit außergewöhnlich hoch. Das lag vor allem an einem hohen Anteil von Parkbuchten, teils mit Quer- und Schrägparken, die noch nicht genauer erfasst waren und wodurch sich an einzelnen Straßensegmenten enorme Überschätzungen ergeben haben.


## Wie genau können die Parkraumdaten im besten Fall werden?

Nach dem die parkraumrelevanten Daten entlang der ausgewählten Straßensegmente durch aufwendiges Micro-Mapping detailliert erfasst wurden (insbesondere Parkbuchtgeometrien, Einfahrten und evtl. deren (Über-)Breite, Parkstreifendetails wie kurze Verbotszonen oder -markierungen, Gehwegvorstreckungen…), wurde die Abweichung noch einmal ermittelt. Sie liegt nun bei **weniger als einem Prozent**, was bestätigt, dass im Idealfall äußerst präzise Ergebnisse erzielt werden können.

{% include image.html
src="images/posts/stichprobenpruefung/parkbuchten.png"
caption="Die Gürtelstraße in Friedrichshain nach dem Micromapping der Parkbuchten."
osm_url="https://www.openstreetmap.org/way/194070667"
mapillary_url="https://www.mapillary.com/app/?pKey=569177870852094&lat=52.5082929&lng=13.4723255&z=17&focus=photo&x=0.2777632981014353&y=0.6493681640785228&zoom=0"
%}

An einzelnen Straßen kann es weiterhin auch höhere Abweichungen geben, insbesondere, da einige parkraumrelevante Features noch nicht Teil unseres Berechnungsalgorithmus sind (z.B. Halteverbotsmarkierungen auf der Fahrbahn) oder der Algorithmus noch Fehler aufweist (insbesondere bei der Verarbeitung von Parkbuchten).

Dabei gilt weiterhin das Prinzip: **Je größer der Raum**, für den die Stellplatzzahlen ermittelt werden, **desto zuverlässiger das Ergebnis**. Die Summe der Zahlen für ein kleines Stadtquartier oder einen langen Straßenzug ist also zuverlässiger als die Stellplatzzahl eines einzelnen Straßensegments, da in Summe einzelne Fehler nivelliert werden.


## Was lernen wir daraus für zukünftige Kartierungsprozesse?

Für die in diesem Test ausgewählten Straßensegmente haben wir ein detailliertes Mico-Mapping durchgeführt, um möglichst „ideale“ Daten zu erzeugen. Das ist sehr aufwendig und für die meisten Anwendungen dürfte es – [wie in der letzten Analyse bereits gezeigt](/posts/2022-07-15-einflussfaktoren-datenqualitaet) – ausreichend sein, auf die wichtigsten Merkmale zu achten. Der Test hat noch einmal gezeigt, worauf es dabei besonders ankommt, bestätigt frühere Erkenntnisse und hilft bei deren Priorisierung.

**20 Prozent Überschätzung:** Die Kartierung der „Parkraum-Basisdaten“ z.B. auf Grundlage von Luftbildern ermöglicht einen ersten Überblick, ist aber noch sehr ungenau. Beachtet man die systematische Überschätzung des Ergebnisses in Abhängigkeit von der Datenqualität, können in Summe dennoch bereits gute Aussagen zur Größenordnung der verfügbaren Stellplatzzahlen vorgenommen werden. Als Faustformel kann man davon ausgehen, dass real wahrscheinlich etwa 20 Prozent weniger Stellplätze existieren als unter dieser Erfassungs-Genauigkeit berechnet.

**Parkbuchten:** Parkbuchten mit regelmäßigen „Unterbrechungen“ (z.B. Vorstreckungen für Straßenbäume, Laternen, Querungsstellen…) sollten unbedingt genauer erfasst werden, um das Ergebnis nicht zu verzerren. Dies stellt sich immer mehr als Hauptfehlerquelle heraus – zumindest in Gebieten, in denen es solche Parkbuchten häufiger gibt. Für eine genauere Erfassung bietet sich an, die Flächen separat zu mappen.

**Parkausrichtung:** Abschnitte mit Quer- und Schrägparken waren auch wieder signifikant mitverantwortlich für Gesamtabweichungen. Auf ihnen muss jedoch nicht das erste Augenmerk liegen, zumindest nicht in Räumen, in denen sie den Parkraum nicht dominieren. Denn in Summe schlagen sie nicht so sehr zu Buche wie Parkbuchten und nur wenig mehr als Abschnitte mit Parallelparken.

**(Breite) Einfahrten:** Im Berliner Altbaubestand gibt es – wie an vielen anderen Orten – viele Einfahrten. Diese zu Erfassen kann auf Grund ihrer großen Zahl sehr aufwendig sein. Vor allem sehr breite Einfahrten sollten aber nach Möglichkeit priorisiert systematisch erfasst werden.

**Park-Beschränkungen:** Insbesondere im Umfeld von Hauptverkehrsstraßen oder an Nebenstraßen mit stärkerem Verkehrsaufkommen gibt es häufiger Park- und Halteverbotszonen oder Stellplätze mit besonderen Beschränkungen (z.B. Ladezonen). Es loht sich, diese abseits des „ruhigeren“ Wohnstraßennetzes gezielt zu identifizieren und zu erfassen.

<div class="notice mb-12 bg-yellow-100">

## Unser Fazit

Wir konnten mit dieser Stichprobenanalyse mehrere Annahmen bestätigen und unsere nächsten Schritte präzisieren:

1. Die **Genauigkeit der Berechnung** auf Basis einer groben Datenerhebung von ca 80 Prozent konnten wir bestätigen. Als Faustformel kann man davon ausgehen, dass grob erfasste Gebiete in unseren Daten ca. 20 Prozent zu viele Parkstände aufweisen.

2. Die **Genauigkeit von hoch detailliert gemappten Gebieten** mit 1 Prozent Abweichung zur Kontrollzählung bestätigt unsere Erfahrung aus dem Proof-of-concept "Parkraumkarte Neukölln" und zeigt die Potentiale einer langfristigen Qualitätssteigerung.

3. Die **Priorisierung der nächsten Erfassungsschritte** hilft vor allem mit Blick auf Parkbuchten, die nächsten Aktivitäten effektiv auszurichten.

</div>


<div class="mb-3">
<h2 id="tabelle">Tabelle: Parkraumanalyse Berlin Friedrichshain-Kreuzberg: Prüfung der Datenqualität an einer Stichprobe</h2>
<iframe style='border: 2px solid silver' width='100%' height='500'
src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRNm9taEP47yjFqUaAN6uVU-vAAPe0PO5NQwi_bBgtwOEP5_0qIMbQkG5ZXU9y2PYxT9cvjd_WMdR8p/pubhtml?gid=774865729&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
<p class="text-right"><a href="https://docs.google.com/spreadsheets/d/1ViU2DqxvNhMvtXkQz7fgqPNEAoq2-_MW8khHcxIldDk/edit#gid=774865729">Tabelle öffnen</a></p>
</div>
