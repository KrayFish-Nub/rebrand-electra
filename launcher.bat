Echo off
title Electra DevOps
color 4
cls
Echo ElectraV2 DevOps - Panel
Echo ============================Electra Panel============================
Echo 1 Install Modules           Installs Required modules to load app!  (AFTER INSTALL RELAUNCH APP)          
Echo 2 Download NODEJS           Downloads NODEJS (Windows/Default Browser)
Echo 3 Start Node App            Launches Gen on [PORT Specified] - DC API
Echo 4 Nodemon Setup             Required downloads of Nodemon (Server)
Echo 5 Exit Launcher/Close       Closes this menu
Echo =====================================================================
Choice /C 1234 /M "Select a choice below "

If Errorlevel 5 Goto 5
If Errorlevel 4 Goto 4
If Errorlevel 3 Goto 3
If Errorlevel 2 Goto 2
If Errorlevel 1 Goto 1

Goto End


:5
:End

:4
npm i nodemon
pause
:End

:3
node .
pause
:End

:2
start   https://nodejs.org/dist/v16.9.0/node-v16.9.0-x64.msi
pause
:End

:1
npm install
pause
:End
