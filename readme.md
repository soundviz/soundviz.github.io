SoundViz Read Me
===

### Live Demo

<iframe src="http://soundviz.github.io/latest/index.html" width=100% height=500px class='overview' >
There is an `iframe` here. It is not visible when viewed on github.com. To view, please go to soundviz.github.io.
</iframe>
_SoundViz (latest revision)_

#### Welcome [MusICA Seminar]( http://www.musica.ed.ac.uk/archive/2014/michele-ducceschi/ ) Attendees!

Fullscreen demo: [SoundViz (latest revision)]( http://soundviz.github.io/latest/index.html )  
Web page: [Read Me]( http://soundviz.github.io/ "view the files as apps." ) <input value="<< You are now probably here." size=28 style="font:bold 12pt monospace;border-width:0;" >   
Source code: [Source Code]( https://github.com/soundviz/ "View the files as source code." ) <scan style=display:none ><< You are now probably here.</scan>  


## Concept


### Mission 
<!-- a statement of a rationale, applicable now as well as in the future -->

* Translate numeric sound data in ASCII format to 3D animations viewable in your browser
* Data from Dr Michele Ducceschi's research on wave turbulence in elastic plates
	* <https://hal-ensta.archives-ouvertes.fr/hal-01135260/file/WT_hal.pdf>
	* <http://ume.ensta-paristech.fr/dfa-theses-et-livres_lang_EN_menu_1>
	* <http://www.msc.univ-paris-diderot.fr/~berhanu/Ducceschi.pdf>
	* <http://www.ness-music.eu/wp-content/uploads/2013/06/ducceschi_michele.pdf>


### Vision 
<!--  a descriptive picture of a desired future state -->

* Enable these tools to access display a wide variety of data and data types from multiple sources
* Add capabilities to display 'meta' or calculated inferences - such as current acceleration at particular points - to particular areas of interesting or singularities while the data is replaying.


## Features

* Reads ASCII CSV files or int8 binary files up to perhaps 120 MB or 100 million numbers
* Three online sample files are provided for easy familiarization
* Files may be loaded from local disk or network
* Creates 3D height maps from the data
* Replays the data as 3D animations
* Provides full pan, rotate and zoom control
* Lights may be toggled, most settings updated and re-positioned
* A variety of materials may be assigned to the surface and their parameters edited individually
* Control panel provides run/pause/next/previous/first/last frame control
* Preferences dialog allows setting background, vertical scale and wireframe skin
* Adjusts for segments per side and maximum and minimum height
* Menu, tabs and dialogs are iconizable and movable
* Displays FPS stats and provides a reset view button

## Road Map

* Add more data files
* Add ability to adjust color and intensity for all lights

* Load partial files so can start playing faster
* Add frame-by-frame vertex coloring capability so, for example, vertices change color with height
* Add auto-rotate after some number of seconds
* Add permalinks
* Add custom textures
* Add Michele's abstract to readme


## Issues /Bugs

* More speed
* Wireframe ghosting appears at certain scales


## Project Links

All of the scripts here are [FOSS]( https://en.wikipedia.org/wiki/Free_and_open-source_software ).
Scripts are hosted on GitHub and are viewable as web pages, as described in the 'Read Me' files and as source code.

The three ways of looking at or using the scripts:

1. [Live Demo]( http://soundviz.github.io/latest/index.html )  
2. [Read Me]( http://soundviz.github.io/ "view the files as apps." ) <input value="<< You are now probably here." size=28 style="font:bold 12pt monospace;border-width:0;" >   
3. [Source Code]( https://github.com/soundviz/ "View the files as source code." ) <scan style=display:none ><< You are now probably here.</scan>  

### System Requirements

In order to view the files on this site you will need a device and browser that provides good support for [WebGL](http://get.webgl.org/).
WebGL is the JavaScript API for rendering interactive 3D graphics and 2D graphics within any compatible web browser without the use of plug-ins. 

Generally this means a computer with an Intel Core i3 processor or better with an external GPU such as one made by Nvidia. 
Successful use of the apps on a phone or tablet is highly unlikely. 
A mouse or other pointing device with a scroll wheel is also highly recommended so that you can zoom, pant and rotate in 3D.
 
The apps here are currently being built and tested with the Google Chrome browser. 
Bugs on browsers other than Chrome need not be reported until such time as the work settles down and an effort to support more browsers is initiated.



### Copyright and License

[SoundViz copyright notice and license]( https://github.com/soundviz/soundviz.github.io/blob/master/soundviz-copyright-and-mit-license.md )

This repository contains files that are at an early and volatile stage. Not all licensing requirements may have been fully met let alone identified. It is the intension of the authors to play fair and all such requirements will either be met or the feature in question will turned off.

### Change Log

2015-01-21 ~ Theo

* Add R18
* Include new materials system - simpler and lighter than before - also has more materials
* Fix and update lights a bit
* Add menu header which does not scroll
* Update and fix copyright notice

>> * Better selection of materials << in progress

2015-01-13 ~ Theo

* Add 'First, load a sample file...' message
* Fixed reset view
* Update copyright year
* Fix display of wireframe and set default as off
* Fix display of marker, possibly
* Add scroll bar when needed
* Set default material to red plastic
* Move stts to top and adjust menu stuff 

2015-01-12 ~ Theo

* Add R17
* Add normals need update > for much better rendering

R16 had some fixes, but not sure

2014-06-13 ~ Theo

* R15 is up
* Improves behavior of file open dialog
* Add more downloadable data files
* Add more online sample files
* Add very preliminary  marker capability

2014-06-13 ~ Theo

* R14 is up
* Lights tab has many more adjustable settings
* Wireframe helper set as default
* Base size changed from 200x200 to 100x100 to follow more usual practice

2014-06-11 ~ Theo

* R13 is up
* Many materials fixes

2014-06-10 ~ Theo

* R12 is up
* Adds Preferences tab
	* Set wireframe helper and adjust vertical scaling
	* Set type of background: random gradient, random color, select color
* Issues with opening and closing menu, tabs and dialogs much cleaned up
* More tool-tips and custom cursors
* Better camera and target positioning
* Generally more objectified and simplified
* Updates to read me
* Technical background page added
* MIT License added

Road map issues dealt with

* Add select materials tab
* Add more and better lighting control
* Add select frame slider bar 
* Add select frame rate control
* Add logarithmic vertical scale with slider control

2014-06-09 ~ Theo

* Add reset screen after window resize
* Add retain current material when loading new data
* Add edit color of Ambient light
* Change light at camera position from point light to directional light
* Add more materials, simplify reflections

2014-06-09 ~ Theo

[SoundViz R11 - full screen]( http://soundviz.github.io/r11/soundviz-r11.html ) 

* Adds tab accordion capability

* Adds select material with 14 materials
* Adds Material edit

2014-06-05 ~ Theo

* Name change to SoundViz

[SoundViz R10 - full screen]( http://soundviz.github.io/r10/soundviz-r10.html ) 

* Reads int8 binary data
* Adds Run/Pause/Forward/Backward/Start/End buttons
* Messaging simplified
* Adding back shadows / light helper

Fixes / Road Map Items cleared
* Adjust speed of replay
* First/Next/Prev/Last frame buttons
* Provide frame by frame movement
* Specular light is too bright

[SoundViz R9 - full screen]( http://soundviz.github.io/r9/soundviz-r9.html ) 

* Adds access to online sample files
* Adds three online samples
* Name change to SoundViz
 

[Sonichele R8 - full screen]( http://soundviz.github.io/r8/sonichele-r8.html ) 

* Add R8
* Adds lights and shadows along with a settings dialog
	* Toggle display of lights
	* Toggle display of light helper
	* Adjust position of directional light
* Adds random gradient background
* Adds random color, ambient and specular effects
* Tries to adjust for height and number of segments automatically


[Sonichele R7 - full screen]( http://soundviz.github.io/r7/sonichele-r7.html ) 

* Back to reading CSV files
* Uses HTML 5 File Reader - so you can open ONE file at a time
* Enables you to open and replay any suitable local file
* File size limit appears to be about 200 MB


[Sonichele PNG R2 ~ Lights - full screen]( http://theo-armour.github.io/cookbook/sonichele/png-r2/sonichele-png-r2-lights.html )  
[Sonichele PNG R2 ~ Normals - full screen]( http://theo-armour.github.io/cookbook/sonichele/png-r2/sonichele-png-r2-normals.html )  
[Sonichele PNG R2 ~ Simple - full screen]( http://theo-armour.github.io/cookbook/sonichele/png-r2/sonichele-png-r2-simple.html )  
[Sonichele PNG R2 ~ Vectors - full screen]( http://theo-armour.github.io/cookbook/sonichele/png-r2/sonichele-png-r2-vectors.html ) 

* Experimenting with lights and different materials
* Normals and Vectors have very heavy CPU demands. Use these locally.


[Sonichele PNG - full screen (R1)]( http://theo-armour.github.io/cookbook/sonichele/png-r1/sonichele-png-r1.html ) 

* Reads and animates PNG heightmaps
* No lights or shadows


[Sonichele ~ frameset - full screen (R6)]( http://theo-armour.github.io/cookbook/sonichele/r5/sonichele-r5.html ) 

* Reads data from a 1,468 files with five lines of CSV each
* Files average around 800K each
* Animation has lights and shadows


[Sonichele - full screen (R5)]( http://theo-armour.github.io/cookbook/sonichele/r5/sonichele-r5.html ) 

* Reads data from a 100MB sample of the full 990MB CSV file
* Animation has lights and shadows


[Sonichele - full screen (R4)]( http://theo-armour.github.io/cookbook/sonichele/r4/sonichele-r4.html ) 

* Less satisfactory rendering but uses less of computer resources


[Sonichele - full screen (R3)]( http://theo-armour.github.io/cookbook/sonichele/r3/sonichele-r3.html )  

* Nice rendering but uses a lot of computing power
* Nice use of MeshNormalMaterial for rendering


[Sonichele - full screen (R2)]( http://theo-armour.github.io/cookbook/sonichele/r2/display-plate-coordinates-r2.html )  

* Reads data from a CSV file with the data of a 13x13 matrix
* Displays a wireframe animation


[Sonichele - full screen (R1)]( http://theo-armour.github.io/cookbook/sonichele/r1/display-plate-coordinates-r1.html )  

* Displays a single frame.
* Reads data from a 100MB sample of the full 990MB CSV file
* Takes perhaps a minute to load
* Nice use of MeshNormalMaterial for rendering




2014-05-31 ~ Theo

* Many new demos
* Access full-size data sets
* Make the data available in compressed binary files
* Colors not updating properly
* Only plays limited portion of the data / data split into 10 separate files in order to get data up to github
* Tries to adjust for number of segments per side automatically
* Tries to adjust vertical scale automatically

2014-05-08 ~ Theo

* uses 13x13 data  set

2014-05-07 ~ Theo

* First commit



